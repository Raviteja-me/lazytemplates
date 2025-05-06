import React, { useState, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "lib/redux/hooks";
import { selectFormsOrder, selectFormToHeading } from "lib/redux/settingsSlice";
import { ResumeImportModal } from "../ResumeImportModal";
import { usePDF } from "@react-pdf/renderer";
import { ResumePDF } from "components/Resume/ResumePDF";
import { selectResume } from "lib/redux/resumeSlice";
import { selectSettings } from "lib/redux/settingsSlice";
import dynamic from 'next/dynamic';

interface FormNavigationProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const navIcons = {
  profile: "👤",
  workExperiences: "💼",
  educations: "🎓", 
  projects: "🎯",
  skills: "🛠️",
  custom: "✨",
  theme: "🎨"
};

// Map section names to display text with consistent capitalization
const sectionLabels = {
  profile: "Profile",
  workExperiences: "Work",
  educations: "Education",
  projects: "Projects",
  skills: "Skills",
  custom: "Custom",
  theme: "Theme"
};

export const FormNavigation: React.FC<FormNavigationProps> = ({
  activeSection,
  onSectionClick,
}) => {
  const formsOrder = useAppSelector(selectFormsOrder);
  const formToHeading = useAppSelector(selectFormToHeading);
  const [isImportModalOpen, setIsImportModalOpen] = React.useState(false);
  const [isPartyMode, setIsPartyMode] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );
  const [instance, update] = usePDF({ document });

  useEffect(() => {
    (update as any)(document); 
  }, [update, document]); // Keep document in the dependency array

  const handleImportSuccess = () => {
    dispatch({ type: 'RESUME_IMPORTED' });
  };

  // Close mobile menu when a section is clicked
  const handleSectionClick = (section: string) => {
    onSectionClick(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <div className="fixed left-0 top-[calc(var(--top-nav-bar-height)-33px)] md:hidden z-20">
        <button 
          className="bg-white p-3 shadow-md rounded-tr-md rounded-br-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
        </button>
      </div>

      {/* Navigation Sidebar */}
      <div 
        className={`fixed left-0 top-[var(--top-nav-bar-height)] h-[calc(100vh-var(--top-nav-bar-height))] w-14 md:w-20 bg-white shadow-md z-10 overflow-y-auto transition-transform duration-300 ${isPartyMode ? 'animate-pulse' : ''} ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex flex-col items-center py-2"> {/* Reduced padding */}
          {/* Import Button */}
          <button
            className="w-full py-2 px-1 mb-2 text-xs font-medium text-center transition-colors hover:bg-gray-50 active:bg-gray-100"
            onClick={() => setIsImportModalOpen(true)}
            title="Import your resume with magic! ✨"
          >
            <div className="flex flex-col items-center">
              <span className="text-xl mb-1">📤</span>
              <span className="mt-1 truncate w-full px-1 text-[10px] md:text-xs">IMPORT</span>
            </div>
          </button>

          {/* View Button (Renamed from Download) */}
          <a
            className="w-full py-2 px-1 mb-2 text-xs font-medium text-center transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
            onClick={() => window.open(instance.url!, '_blank')}
            title="View your resume as PDF"
          >
            <div className="flex flex-col items-center">
              <span className="text-xl mb-1">👁️</span>
              <span className="mt-1 truncate w-full px-1 text-[10px] md:text-xs">VIEW</span>
            </div>
          </a>

          {/* Divider */}
          <div className="w-2/3 h-px bg-gray-200 mb-2"></div> {/* Reduced margin */}

          {/* Profile Button */}
          <button
            className={`w-full py-2 px-1 mb-2 text-xs font-medium text-center transition-colors ${
              activeSection === "profile" ? "bg-gray-100 border-l-2 border-l-blue-500" : "hover:bg-gray-50"
            }`}
            onClick={() => handleSectionClick("profile")}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg mb-1">{navIcons.profile}</span>
              <span className="mt-1 truncate w-full px-1 text-[10px] md:text-xs">{sectionLabels.profile}</span>
            </div>
          </button>

          {/* Section Buttons */}
          {formsOrder.map((form) => (
            <button
              key={form}
              className={`w-full py-2 px-1 mb-2 text-xs font-medium text-center transition-colors ${
                activeSection === form ? "bg-gray-100 border-l-2 border-l-blue-500" : "hover:bg-gray-50"
              }`}
              onClick={() => handleSectionClick(form)}
            >
              <div className="flex flex-col items-center">
                <span className="text-lg mb-1">{navIcons[form as keyof typeof navIcons]}</span>
                <span className="mt-1 truncate w-full px-1 text-[10px] md:text-xs">{sectionLabels[form as keyof typeof sectionLabels]}</span>
              </div>
            </button>
          ))}

          {/* Theme Button */}
          <button
            className={`w-full py-2 px-1 mb-2 text-xs font-medium text-center transition-colors ${
              activeSection === "theme" ? "bg-gray-100 border-l-2 border-l-blue-500" : "hover:bg-gray-50"
            }`}
            onClick={() => handleSectionClick("theme")}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg mb-1">{navIcons.theme}</span>
              <span className="mt-1 truncate w-full px-1 text-[10px] md:text-xs">{sectionLabels.theme}</span>
            </div>
          </button>

          {/* Divider */}
          <div className="w-2/3 h-px bg-gray-200 my-2"></div> {/* Reduced margin */}

          {/* Party Button */}
          <button 
            className="w-full py-2 px-1 text-xs font-medium text-center bg-yellow-100 rounded-md hover:bg-yellow-200 transition-colors shadow-sm mx-2"
            onClick={() => setIsPartyMode(!isPartyMode)}
            title="Toggle party mode!"
          >
            <div className="flex flex-col items-center">
              <span className="text-lg mb-1">🎉</span>
              <span className="mt-1 truncate w-full px-1 text-[10px] md:text-xs">PARTY!</span>
            </div>
          </button>
        </div>
      </div>
      <ResumeImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={handleImportSuccess}
      />
    </>
  );
};


export default FormNavigation;
