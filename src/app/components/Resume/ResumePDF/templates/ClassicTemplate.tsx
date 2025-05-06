import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumePDFText, ResumePDFBulletList, ResumePDFLink } from "components/Resume/ResumePDF/common";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { styles as commonStyles, spacing } from "components/Resume/ResumePDF/styles";

export const ClassicTemplate = ({
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
  const themeColor = settings.themeColor || "#2a3f5f";

  return (
    <Document title={`${name} Resume`} author={name} producer={"OpenResume"}>
      <Page
        size={documentSize === "A4" ? "A4" : "LETTER"}
        style={{
          ...commonStyles.flexCol,
          color: "#333333",
          fontFamily,
          fontSize: fontSize + "pt",
          padding: spacing[6],
        }}
      >
        {/* Header */}
        <View style={{
          ...commonStyles.flexCol,
          alignItems: "center",
          marginBottom: spacing[5],
          borderBottom: `1pt solid ${themeColor}`,
          paddingBottom: spacing[4],
        }}>
          <ResumePDFText style={{ 
            fontSize: "20pt", 
            fontWeight: "bold",
            color: themeColor,
            marginBottom: spacing[1],
            textTransform: "uppercase",
            letterSpacing: "1pt",
          }}>
            {profile.name}
          </ResumePDFText>
          
          {/* Removed profile.title reference since it doesn't exist in ResumeProfile type */}
          
          {/* Contact Information */}
          <View style={{
            ...commonStyles.flexRow,
            justifyContent: "center",
            flexWrap: "wrap",
            gap: spacing[3],
          }}>
            {profile.email && (
              <ResumePDFText style={{ fontSize: "9pt", color: "#555555" }}>
                {isPDF ? (
                  <ResumePDFLink src={`mailto:${profile.email}`} isPDF={isPDF}>
                    {profile.email}
                  </ResumePDFLink>
                ) : (
                  profile.email
                )}
              </ResumePDFText>
            )}
            {profile.phone && (
              <ResumePDFText style={{ fontSize: "9pt", color: "#555555" }}>
                {profile.phone}
              </ResumePDFText>
            )}
            {profile.location && (
              <ResumePDFText style={{ fontSize: "9pt", color: "#555555" }}>
                {profile.location}
              </ResumePDFText>
            )}
            {profile.url && (
              <ResumePDFText style={{ fontSize: "9pt", color: "#555555" }}>
                {isPDF ? (
                  <ResumePDFLink src={profile.url} isPDF={isPDF}>
                    {profile.url}
                  </ResumePDFLink>
                ) : (
                  profile.url
                )}
              </ResumePDFText>
            )}
          </View>
        </View>
        
        {/* Summary */}
        {profile.summary && (
          <View style={{ marginBottom: spacing[5] }}>
            <ResumePDFText style={{ 
              fontStyle: "italic",
              color: "#555555",
              lineHeight: 1.4,
            }}>
              {profile.summary}
            </ResumePDFText>
          </View>
        )}
        
        {/* Main Content */}
        <View style={{ ...commonStyles.flexCol, gap: spacing[5] }}>
          {/* Work Experience */}
          {formToShow.workExperiences && (
            <View>
              <View style={{
                borderBottom: `1pt solid ${themeColor}`,
                marginBottom: spacing[3],
              }}>
                <ResumePDFText style={{ 
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: themeColor,
                  textTransform: "uppercase",
                  letterSpacing: "1pt",
                  marginBottom: spacing[1],
                }}>
                  {formToHeading.workExperiences}
                </ResumePDFText>
              </View>
              
              {workExperiences.map((exp, idx) => (
                <View key={idx} style={{ 
                  marginBottom: idx < workExperiences.length - 1 ? spacing[4] : 0,
                }}>
                  <View style={{ 
                    ...commonStyles.flexRow,
                    justifyContent: "space-between",
                    marginBottom: spacing[1],
                  }}>
                    <ResumePDFText style={{ 
                      fontWeight: "bold",
                      fontSize: "11pt",
                      color: "#333333",
                    }}>
                      {exp.company}
                    </ResumePDFText>
                    <ResumePDFText style={{ 
                      fontSize: "10pt",
                      color: "#555555",
                    }}>
                      {exp.date}
                    </ResumePDFText>
                  </View>
                  
                  <ResumePDFText style={{ 
                    fontSize: "10pt",
                    fontStyle: "italic",
                    color: "#555555",
                    marginBottom: spacing[2],
                  }}>
                    {exp.jobTitle}
                  </ResumePDFText>
                  
                  <ResumePDFBulletList
                    items={exp.descriptions}
                    showBulletPoints={true}
                  />
                </View>
              ))}
            </View>
          )}
          
          {/* Education */}
          {formToShow.educations && (
            <View>
              <View style={{
                borderBottom: `1pt solid ${themeColor}`,
                marginBottom: spacing[3],
              }}>
                <ResumePDFText style={{ 
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: themeColor,
                  textTransform: "uppercase",
                  letterSpacing: "1pt",
                  marginBottom: spacing[1],
                }}>
                  {formToHeading.educations}
                </ResumePDFText>
              </View>
              
              {educations.map((edu, idx) => (
                <View key={idx} style={{ 
                  marginBottom: idx < educations.length - 1 ? spacing[4] : 0,
                }}>
                  <View style={{ 
                    ...commonStyles.flexRow,
                    justifyContent: "space-between",
                    marginBottom: spacing[1],
                  }}>
                    <ResumePDFText style={{ 
                      fontWeight: "bold",
                      fontSize: "11pt",
                      color: "#333333",
                    }}>
                      {edu.school}
                    </ResumePDFText>
                    <ResumePDFText style={{ 
                      fontSize: "10pt",
                      color: "#555555",
                    }}>
                      {edu.date}
                    </ResumePDFText>
                  </View>
                  
                  <ResumePDFText style={{ 
                    fontSize: "10pt",
                    fontStyle: "italic",
                    color: "#555555",
                    marginBottom: spacing[2],
                  }}>
                    {edu.degree}
                  </ResumePDFText>
                  
                  <ResumePDFBulletList
                    items={edu.descriptions}
                    showBulletPoints={showBulletPoints.educations}
                  />
                </View>
              ))}
            </View>
          )}
          
          {/* Skills */}
          {formToShow.skills && (
            <View>
              <View style={{
                borderBottom: `1pt solid ${themeColor}`,
                marginBottom: spacing[3],
              }}>
                <ResumePDFText style={{ 
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: themeColor,
                  textTransform: "uppercase",
                  letterSpacing: "1pt",
                  marginBottom: spacing[1],
                }}>
                  {formToHeading.skills}
                </ResumePDFText>
              </View>
              
              <View style={{
                ...commonStyles.flexRow,
                flexWrap: "wrap",
                gap: spacing[2],
              }}>
                {skills.featuredSkills && skills.featuredSkills
                  .filter(item => item && item.skill)
                  .map((skill, idx) => (
                    <View key={idx} style={{
                      backgroundColor: "#f5f5f5",
                      padding: `${spacing[1]}pt ${spacing[2]}pt`,
                      borderRadius: "2pt",
                      borderLeft: `2pt solid ${themeColor}`,
                    }}>
                      <ResumePDFText style={{ 
                        fontSize: "9pt",
                        color: "#333333",
                      }}>
                        {skill.skill}
                      </ResumePDFText>
                    </View>
                  ))
                }
              </View>
              
              {skills.descriptions.length > 0 && (
                <View style={{ marginTop: spacing[3] }}>
                  <ResumePDFBulletList
                    items={skills.descriptions}
                    showBulletPoints={showBulletPoints.skills}
                  />
                </View>
              )}
            </View>
          )}
          
          {/* Projects */}
          {formToShow.projects && (
            <View>
              <View style={{
                borderBottom: `1pt solid ${themeColor}`,
                marginBottom: spacing[3],
              }}>
                <ResumePDFText style={{ 
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: themeColor,
                  textTransform: "uppercase",
                  letterSpacing: "1pt",
                  marginBottom: spacing[1],
                }}>
                  {formToHeading.projects}
                </ResumePDFText>
              </View>
              
              {projects.map((proj, idx) => (
                <View key={idx} style={{ 
                  marginBottom: idx < projects.length - 1 ? spacing[4] : 0,
                }}>
                  <View style={{ 
                    ...commonStyles.flexRow,
                    justifyContent: "space-between",
                    marginBottom: spacing[1],
                  }}>
                    <ResumePDFText style={{ 
                      fontWeight: "bold",
                      fontSize: "11pt",
                      color: "#333333",
                    }}>
                      {proj.project}
                    </ResumePDFText>
                    <ResumePDFText style={{ 
                      fontSize: "10pt",
                      color: "#555555",
                    }}>
                      {proj.date}
                    </ResumePDFText>
                  </View>
                  
                  <ResumePDFBulletList
                    items={proj.descriptions}
                    showBulletPoints={showBulletPoints.projects}
                  />
                </View>
              ))}
            </View>
          )}
          
          {/* Custom */}
          {formToShow.custom && (
            <View>
              <View style={{
                borderBottom: `1pt solid ${themeColor}`,
                marginBottom: spacing[3],
              }}>
                <ResumePDFText style={{ 
                  fontWeight: "bold",
                  fontSize: "12pt",
                  color: themeColor,
                  textTransform: "uppercase",
                  letterSpacing: "1pt",
                  marginBottom: spacing[1],
                }}>
                  {formToHeading.custom}
                </ResumePDFText>
              </View>
              
              <ResumePDFBulletList
                items={custom.descriptions}
                showBulletPoints={showBulletPoints.custom}
              />
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
