"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";
import { useState, useEffect } from "react";
import { ResumeImportModal } from "./components/ResumeImportModal";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    document.title = "LazyTemplates";
    // Add a small delay to ensure smooth loading transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const pdfUrl = searchParams.get('pdf');
    if (pdfUrl) {
      setIsImportModalOpen(true);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading resume builder...</p>
        </div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
          <div className="col-span-1 lg:col-span-3 relative order-2 md:order-1">
            <ResumeForm />
          </div>
          <div className="col-span-1 lg:col-span-3 bg-gray-50 order-1 md:order-2 min-h-screen">
            <Resume />
          </div>
        </div>
        {isImportModalOpen && (
          <ResumeImportModal
            isOpen={isImportModalOpen}
            onClose={() => setIsImportModalOpen(false)}
            initialPdfUrl={searchParams.get('pdf') || undefined}
          />
        )}
      </main>
    </Provider>
  );
}
