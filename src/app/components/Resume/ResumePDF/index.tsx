import { Page, View, Document } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { ResumePDFProfile } from "components/Resume/ResumePDF/ResumePDFProfile";
import { ResumePDFWorkExperience } from "components/Resume/ResumePDF/ResumePDFWorkExperience";
import { ResumePDFEducation } from "components/Resume/ResumePDF/ResumePDFEducation";
import { ResumePDFProject } from "components/Resume/ResumePDF/ResumePDFProject";
import { ResumePDFSkills } from "components/Resume/ResumePDF/ResumePDFSkills";
import { ResumePDFCustom } from "components/Resume/ResumePDF/ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { SuppressResumePDFErrorMessage } from "components/Resume/ResumePDF/common/SuppressResumePDFErrorMessage";

// Add these imports
import { ModernTemplate } from "components/Resume/ResumePDF/templates/ModernTemplate";
import { MinimalTemplate } from "components/Resume/ResumePDF/templates/MinimalTemplate";
import { ProfessionalTemplate } from "components/Resume/ResumePDF/templates/ProfessionalTemplate";
import { ElegantTemplate } from "components/Resume/ResumePDF/templates/ElegantTemplate";
import { DecorTemplate } from "components/Resume/ResumePDF/templates/DecorTemplate";
import { BlackmagicTemplate } from "components/Resume/ResumePDF/templates/BlackmagicTemplate";
import { ClassicTemplate } from "components/Resume/ResumePDF/templates/ClassicTemplate";

export const ResumePDF = ({
  resume,
  settings,
  isPDF = false,
}: {
  resume: Resume;
  settings: Settings;
  isPDF?: boolean;
}) => {
  // Use type assertion to ensure template is recognized correctly
  const template = settings.template as Settings["template"];
  
  // Use the template from settings
  if (template === "modern") {
    return (
      <>
        <ModernTemplate resume={resume} settings={settings} isPDF={isPDF} />
        <SuppressResumePDFErrorMessage />
      </>
    );
  } else if (template === "minimal") {
    return (
      <>
        <MinimalTemplate resume={resume} settings={settings} isPDF={isPDF} />
        <SuppressResumePDFErrorMessage />
      </>
    );
  } else if (settings.template === "professional") {
    return (
      <>
        <ProfessionalTemplate resume={resume} settings={settings} isPDF={isPDF} />
        <SuppressResumePDFErrorMessage />
      </>
    );
  } else if (settings.template === "elegant") {
    return (
      <>
        <ElegantTemplate resume={resume} settings={settings} isPDF={isPDF} />
        <SuppressResumePDFErrorMessage />
      </>
    );
  } else if (settings.template === "decor") {
    return (
      <>
        <DecorTemplate resume={resume} settings={settings} isPDF={isPDF} />
        <SuppressResumePDFErrorMessage />
      </>
    );
  } else if (settings.template === "blackmagic") {
    return (
      <>
        <BlackmagicTemplate resume={resume} settings={settings} isPDF={isPDF} />
        <SuppressResumePDFErrorMessage />
      </>
    );
  } else if (settings.template === "classic") {
    return (
      <>
        <ClassicTemplate resume={resume} settings={settings} isPDF={isPDF} />
        <SuppressResumePDFErrorMessage />
      </>
    );
  }
  
  // Standard template (existing code)
  const { profile, workExperiences, educations, projects, skills, custom } =
    resume;
  const { name } = profile;
  const {
    fontFamily,
    fontSize,
    documentSize,
    formToHeading,
    formToShow,
    formsOrder,
    showBulletPoints,
  } = settings;
  const themeColor = settings.themeColor || DEFAULT_FONT_COLOR;

  const showFormsOrder = formsOrder.filter((form) => formToShow[form]);

  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
    workExperiences: () => (
      <ResumePDFWorkExperience
        heading={formToHeading["workExperiences"]}
        workExperiences={workExperiences}
        themeColor={themeColor}
      />
    ),
    educations: () => (
      <ResumePDFEducation
        heading={formToHeading["educations"]}
        educations={educations}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["educations"]}
      />
    ),
    projects: () => (
      <ResumePDFProject
        heading={formToHeading["projects"]}
        projects={projects}
        themeColor={themeColor}
      />
    ),
    skills: () => (
      <ResumePDFSkills
        heading={formToHeading["skills"]}
        skills={skills}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["skills"]}
      />
    ),
    custom: () => (
      <ResumePDFCustom
        heading={formToHeading["custom"]}
        custom={custom}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["custom"]}
      />
    ),
  };

  return (
    <>
      <Document title={`${name} Resume`} author={name} producer={"OpenResume"}>
        <Page
          size={documentSize === "A4" ? "A4" : "LETTER"}
          style={{
            ...styles.flexCol,
            color: DEFAULT_FONT_COLOR,
            fontFamily,
            fontSize: fontSize + "pt",
          }}
        >
          {Boolean(settings.themeColor) && (
            <View
              style={{
                width: spacing["full"],
                height: spacing[3.5],
                backgroundColor: themeColor,
              }}
            />
          )}
          <View
            style={{
              ...styles.flexCol,
              padding: `${spacing[0]} ${spacing[20]}`,
            }}
          >
            <ResumePDFProfile
              profile={profile}
              themeColor={themeColor}
              isPDF={isPDF}
            />
            {showFormsOrder.map((form) => {
              const Component = formTypeToComponent[form];
              return <Component key={form} />;
            })}
          </View>
        </Page>
      </Document>
      <SuppressResumePDFErrorMessage />
    </>
  );
};

