"use client";
import { useState, useRef, useEffect } from "react";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "lib/redux/hooks";
import { ShowForm, selectFormsOrder } from "lib/redux/settingsSlice";
import { ProfileForm } from "components/ResumeForm/ProfileForm";
import { WorkExperiencesForm } from "components/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "components/ResumeForm/EducationsForm";
import { ProjectsForm } from "components/ResumeForm/ProjectsForm";
import { SkillsForm } from "components/ResumeForm/SkillsForm";
import { ThemeForm } from "components/ResumeForm/ThemeForm";
import { CustomForm } from "components/ResumeForm/CustomForm";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { cx } from "lib/cx";
import { FormNavigation } from "components/ResumeForm/FormNavigation";

const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const ResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  
  // Create refs for each section
  const profileRef = useRef<HTMLDivElement>(null);
  const formRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const themeRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll to a section
  const scrollToSection = (section: string) => {
    setActiveSection(section);
    
    if (section === "profile" && profileRef.current) {
      profileRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "theme" && themeRef.current) {
      themeRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (formRefs.current[section]) {
      formRefs.current[section]?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Set up intersection observer to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (profileRef.current) observer.observe(profileRef.current);
    if (themeRef.current) observer.observe(themeRef.current);
    
    Object.values(formRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, [formsOrder]);

  return (
    <>
      <FormNavigation 
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      
      <div
        className={cx(
          "flex justify-center scrollbar-thin scrollbar-track-gray-100 h-[calc(100vh-var(--top-nav-bar-height))] w-full overflow-y-scroll px-4",
          isHover ? "scrollbar-thumb-gray-200" : "scrollbar-thumb-gray-100"
        )}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <section className="flex w-full max-w-2xl flex-col gap-6 p-4 md:p-[var(--resume-padding)]">
          <div ref={profileRef} id="profile">
            <ProfileForm />
          </div>
          
          {formsOrder.map((form) => {
            const Component = formTypeToComponent[form];
            return (
              <div 
                key={form} 
                ref={(el) => (formRefs.current[form] = el)} 
                id={form}
              >
                <Component />
              </div>
            );
          })}
          
          <div ref={themeRef} id="theme">
            <ThemeForm />
          </div>
          <br />
        </section>
        <FlexboxSpacer maxWidth={50} className="hidden md:block" />
      </div>
    </>
  );
};
