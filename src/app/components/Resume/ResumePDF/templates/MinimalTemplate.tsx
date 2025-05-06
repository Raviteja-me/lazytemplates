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
import { ResumePDFText } from "components/Resume/ResumePDF/common";

export const MinimalTemplate = ({
  resume,
  settings,
  isPDF = false,
}: {
  resume: Resume;
  settings: Settings;
  isPDF?: boolean;
}) => {
  const { profile, workExperiences, educations, projects, skills, custom } = resume;
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
        showBulletPoints={showBulletPoints["projects"]}
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
    <Document title={`${name} Resume`} author={name} producer={"OpenResume"}>
      <Page
        size={documentSize === "A4" ? "A4" : "LETTER"}
        style={{
          ...styles.flexCol,
          color: DEFAULT_FONT_COLOR,
          fontFamily,
          fontSize: fontSize + "pt",
          padding: spacing[8],
        }}
      >
        {/* Header with name and contact info in a clean layout */}
        <View style={{
          ...styles.flexCol,
          alignItems: "center",
          marginBottom: spacing[6],
          borderBottom: `0.5pt solid ${themeColor}`,
          paddingBottom: spacing[4],
        }}>
          <ResumePDFText style={{ 
            fontSize: "16pt", 
            fontWeight: "bold",
            marginBottom: spacing[2],
            textTransform: "uppercase",
            letterSpacing: "1pt",
          }}>
            {profile.name}
          </ResumePDFText>
          
          <View style={{
            ...styles.flexRow,
            justifyContent: "center",
            flexWrap: "wrap",
            gap: spacing[4],
          }}>
            {profile.email && (
              <ResumePDFText style={{ fontSize: "9pt" }}>
                {profile.email}
              </ResumePDFText>
            )}
            {profile.phone && (
              <ResumePDFText style={{ fontSize: "9pt" }}>
                {profile.phone}
              </ResumePDFText>
            )}
            {profile.location && (
              <ResumePDFText style={{ fontSize: "9pt" }}>
                {profile.location}
              </ResumePDFText>
            )}
            {profile.url && (
              <ResumePDFText style={{ fontSize: "9pt" }}>
                {profile.url}
              </ResumePDFText>
            )}
          </View>
        </View>
        
        {/* Summary section */}
        {profile.summary && (
          <View style={{ marginBottom: spacing[6] }}>
            <ResumePDFText style={{ 
              fontSize: "9pt",
              textAlign: "center",
              fontStyle: "italic",
            }}>
              {profile.summary}
            </ResumePDFText>
          </View>
        )}
        
        {/* Main content */}
        <View style={{ ...styles.flexCol }}>
          {showFormsOrder.map((form) => {
            const Component = formTypeToComponent[form];
            return (
              <View key={form} style={{ 
                marginBottom: spacing[6],
                borderBottom: form !== showFormsOrder[showFormsOrder.length - 1] ? `0.25pt solid #e5e5e5` : "none",
                paddingBottom: form !== showFormsOrder[showFormsOrder.length - 1] ? spacing[4] : 0,
              }}>
                <Component />
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};
