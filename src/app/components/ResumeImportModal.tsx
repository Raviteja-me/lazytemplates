import { useState, useEffect, useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { parseResumeFromPdf } from "lib/parse-resume-from-pdf";
import { deepClone } from "lib/deep-clone";
import { initialSettings } from "lib/redux/settingsSlice";
import { saveStateToLocalStorage, getHasUsedAppBefore } from "lib/redux/local-storage";
import { type ShowForm } from "lib/redux/settingsSlice";
import { useAppDispatch } from "lib/redux/hooks";
import { setResume } from "lib/redux/resumeSlice";
import { setSettings } from "lib/redux/settingsSlice";
import { ResumeDropzone } from "./ResumeDropzone";

interface ResumeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: () => void;
  initialPdfUrl?: string;
}

export const ResumeImportModal = ({ 
  isOpen, 
  onClose,
  onImportSuccess,
  initialPdfUrl
}: ResumeImportModalProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUrlChange = useCallback(async (fileUrl: string) => {
    if (fileUrl) {
      setIsProcessing(true);
      setError(null);
      try {
        const resume = await parseResumeFromPdf(fileUrl);
        const settings = deepClone(initialSettings);

        if (getHasUsedAppBefore()) {
          const sections = Object.keys(settings.formToShow) as ShowForm[];
          const sectionToFormToShow: Record<ShowForm, boolean> = {
            workExperiences: resume.workExperiences.length > 0,
            educations: resume.educations.length > 0,
            projects: resume.projects.length > 0,
            skills: resume.skills.descriptions.length > 0,
            custom: resume.custom.descriptions.length > 0,
          };
          for (const section of sections) {
            settings.formToShow[section] = sectionToFormToShow[section];
          }
        }

        saveStateToLocalStorage({ resume, settings });
        dispatch(setResume(resume));
        dispatch(setSettings(settings));
        
        if (onImportSuccess) {
          onImportSuccess();
        } else {
          router.push("/resume-builder");
        }
        onClose();
      } catch (error) {
        console.error("Error parsing resume:", error);
        setError("Failed to parse resume. Please try another file.");
      } finally {
        setIsProcessing(false);
      }
    }
  }, [dispatch, onClose, onImportSuccess, router]);

  useEffect(() => {
    if (isOpen && initialPdfUrl && !initialized) {
      setIsProcessing(true);
      handleFileUrlChange(initialPdfUrl);
      setInitialized(true);
    }
  }, [isOpen, initialPdfUrl, initialized, handleFileUrlChange]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="mb-4 text-xl font-bold">Import Resume</h2>
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
            <div className="text-sm text-gray-600">
              Processing your resume...
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}
            <ResumeDropzone 
              onFileUrlChange={handleFileUrlChange}
              playgroundView={false}
            />
          </>
        )}
      </div>
    </div>
  );
};
