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

export const ElegantTemplate = ({
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
          padding: spacing[5], // Reduced padding to fit content better
        }}
      >
        {/* Header with elegant design */}
        <View style={{
          ...styles.flexCol,
          alignItems: "center",
          marginBottom: spacing[4], // Reduced margin
        }}>
          <ResumePDFText style={{ 
            fontSize: "20pt", 
            fontWeight: "bold",
            color: themeColor,
            marginBottom: spacing[2],
            letterSpacing: "1pt",
          }}>
            {profile.name}
          </ResumePDFText>
          
          <View style={{
            width: "40%",
            height: "1pt",
            backgroundColor: themeColor,
            marginBottom: spacing[4],
          }} />
          
          <View style={{
            ...styles.flexRow,
            justifyContent: "center",
            flexWrap: "wrap",
            gap: spacing[3],
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
                {isPDF ? <Link src={profile.url}>{profile.url}</Link> : profile.url}
              </ResumePDFText>
            )}
          </View>
        </View>
        
        {/* Summary section with elegant styling */}
        {profile.summary && (
          <View style={{ 
            marginBottom: spacing[4], // Reduced margin
            padding: spacing[3], // Reduced padding
            backgroundColor: `rgba(${parseInt(themeColor.slice(1, 3), 16)}, ${parseInt(themeColor.slice(3, 5), 16)}, ${parseInt(themeColor.slice(5, 7), 16)}, 0.05)`,
            borderLeft: `3pt solid ${themeColor}`,
          }}>
            <ResumePDFText style={{ 
              fontStyle: "italic",
              lineHeight: 1.4,
            }}>
              {profile.summary}
            </ResumePDFText>
          </View>
        )}
        
        {/* Two-column layout for main content */}
        <View style={{ 
          ...styles.flexRow,
          gap: spacing[4], // Reduced gap
        }}>
          {/* Left column - 65% width */}
          <View style={{ width: "65%" }}>
            {showFormsOrder
              .filter(form => form !== 'skills')
              .map((form) => {
                const Component = formTypeToComponent[form];
                return (
                  <View key={form} style={{ marginBottom: spacing[5] }}>
                    <Component />
                  </View>
                );
              })}
          </View>
          
          {/* Right column - 35% width */}
          <View style={{ 
            width: "35%",
            borderLeft: `0.5pt solid ${themeColor}`,
            paddingLeft: spacing[4],
          }}>
            {formToShow.skills && (
              <ResumePDFSkills
                heading={formToHeading["skills"]}
                skills={skills}
                themeColor={themeColor}
                showBulletPoints={showBulletPoints["skills"]}
              />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
