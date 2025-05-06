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
import { ResumePDFText, ResumeFeaturedSkill, ResumePDFBulletList } from "components/Resume/ResumePDF/common";

export const ModernTemplate = ({
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
        }}
      >
        <View style={{
          backgroundColor: themeColor,
          padding: spacing[6],
          marginBottom: spacing[4]
        }}>
          <ResumePDFText style={{ 
            color: "white", 
            fontSize: "18pt", 
            fontWeight: "bold",
            marginBottom: spacing[2]
          }}>
            {profile.name}
          </ResumePDFText>
          {profile.summary && (
            <ResumePDFText style={{ color: "white" }}>
              {profile.summary}
            </ResumePDFText>
          )}
        </View>
        
        <View style={{
          ...styles.flexRow,
          padding: `${spacing[0]} ${spacing[6]}`,
        }}>
          {/* Left column - Contact info and Skills */}
          <View style={{
            width: "30%",
            paddingRight: spacing[4],
            borderRight: `1pt solid ${themeColor}`,
          }}>
            <View style={{ marginBottom: spacing[4] }}>
              <ResumePDFText bold={true} style={{ marginBottom: spacing[2] }}>
                CONTACT
              </ResumePDFText>
              <View style={{ display: "flex", flexDirection: "column" }}>
                {profile.email && (
                  <View style={{ marginBottom: spacing[1] }}>
                    <ResumePDFText style={{ fontSize: "9pt" }}>
                      {profile.email}
                    </ResumePDFText>
                  </View>
                )}
                {profile.phone && (
                  <View style={{ marginBottom: spacing[1] }}>
                    <ResumePDFText style={{ fontSize: "9pt" }}>
                      {profile.phone}
                    </ResumePDFText>
                  </View>
                )}
                {profile.location && (
                  <View style={{ marginBottom: spacing[1] }}>
                    <ResumePDFText style={{ fontSize: "9pt" }}>
                      {profile.location}
                    </ResumePDFText>
                  </View>
                )}
                {profile.url && (
                  <View style={{ marginBottom: spacing[1] }}>
                    <ResumePDFText style={{ fontSize: "9pt" }}>
                      {profile.url}
                    </ResumePDFText>
                  </View>
                )}
              </View>
            </View>
            
            {formToShow.skills && (
              <View style={{ marginBottom: spacing[4] }}>
                <ResumePDFText bold={true} style={{ marginBottom: spacing[2] }}>
                  {formToHeading.skills}
                </ResumePDFText>
                {skills.featuredSkills && Object.entries(skills.featuredSkills).map(([skill, rating], idx) => (
                  <ResumeFeaturedSkill
                    key={skill}
                    skill={skill}
                    rating={Number(rating)}
                    themeColor={themeColor}
                    style={{ marginBottom: spacing[1] }}
                  />
                ))}
                {skills.descriptions.length > 0 && (
                  <ResumePDFBulletList
                    items={skills.descriptions}
                    showBulletPoints={showBulletPoints.skills}
                  />
                )}
              </View>
            )}
          </View>
          
          {/* Right column - Experience, Education, Projects */}
          <View style={{
            width: "70%",
            paddingLeft: spacing[4],
          }}>
            {showFormsOrder
              .filter(form => form !== 'skills')
              .map((form) => {
                const Component = formTypeToComponent[form];
                return <Component key={form} />;
              })}
          </View>
        </View>
      </Page>
    </Document>
  );
};
