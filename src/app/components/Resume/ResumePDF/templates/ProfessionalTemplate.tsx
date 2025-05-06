import { Page, View, Document, Link } from "@react-pdf/renderer";
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
import { ResumePDFText, ResumeFeaturedSkill, ResumePDFBulletList } from "components/Resume/ResumePDF/common";

export const ProfessionalTemplate = ({
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
          padding: spacing[6],
        }}
      >
        {/* Header with name and contact info */}
        <View style={{
          ...styles.flexRow,
          justifyContent: "space-between",
          marginBottom: spacing[4],
          borderBottom: `2pt solid ${themeColor}`,
          paddingBottom: spacing[2],
        }}>
          <View>
            <ResumePDFText style={{ 
              fontSize: "18pt", 
              fontWeight: "bold",
              color: themeColor,
            }}>
              {profile.name}
            </ResumePDFText>
            {profile.location && (
              <ResumePDFText style={{ fontSize: "10pt" }}>
                {profile.location}
              </ResumePDFText>
            )}
          </View>
          
          <View style={{ 
            ...styles.flexCol, 
            alignItems: "flex-end",
            fontSize: "9pt",
          }}>
            {profile.email && (
              <ResumePDFText>{profile.email}</ResumePDFText>
            )}
            {profile.phone && (
              <ResumePDFText>{profile.phone}</ResumePDFText>
            )}
            {profile.url && (
              <ResumePDFText>
                <Link src={profile.url}>{profile.url}</Link>
              </ResumePDFText>
            )}
          </View>
        </View>
        
        {/* Summary section */}
        {profile.summary && (
          <View style={{ marginBottom: spacing[4] }}>
            <ResumePDFText style={{ 
              fontWeight: "bold",
              color: themeColor,
              fontSize: "11pt",
              marginBottom: spacing[1],
              textTransform: "uppercase",
            }}>
              Professional Summary
            </ResumePDFText>
            <ResumePDFText>{profile.summary}</ResumePDFText>
          </View>
        )}
        
        {/* Main content */}
        <View style={{ ...styles.flexCol, gap: spacing[4] }}>
          {showFormsOrder.map((form) => {
            const Component = formTypeToComponent[form];
            return <Component key={form} />;
          })}
        </View>
      </Page>
    </Document>
  );
};
