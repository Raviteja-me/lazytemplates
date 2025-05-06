import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumePDFText, ResumePDFBulletList, ResumePDFLink, ResumeFeaturedSkill } from "components/Resume/ResumePDF/common";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { styles as commonStyles, spacing } from "components/Resume/ResumePDF/styles";

export const BlackmagicTemplate = ({
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
  const themeColor = settings.themeColor || "#00c4ff";

  const showFormsOrder = formsOrder.filter((form) => formToShow[form]);

  return (
    <Document title={`${name} Resume`} author={name} producer={"OpenResume"}>
      <Page
        size={documentSize === "A4" ? "A4" : "LETTER"}
        style={{
          ...commonStyles.flexCol,
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily,
          fontSize: fontSize + "pt",
          padding: 0,
        }}
      >
        {/* Glowing Header Bar */}
        <View style={{
          backgroundColor: themeColor,
          height: spacing[2],
          width: "100%",
          opacity: 0.8,
        }} />
        
        {/* Main Content Container */}
        <View style={{
          padding: spacing[6],
        }}>
          {/* Header with Futuristic Design */}
          <View style={{
            ...commonStyles.flexRow,
            marginBottom: spacing[6],
          }}>
            {/* Name and Title Column */}
            <View style={{ width: "70%" }}>
              <ResumePDFText style={{ 
                fontSize: "24pt", 
                fontWeight: "bold",
                color: themeColor,
                marginBottom: spacing[1],
                textTransform: "uppercase",
                letterSpacing: "1pt",
              }}>
                {profile.name}
              </ResumePDFText>
              
              {/* Removed profile.title reference since it doesn't exist in ResumeProfile type */}
              
              {profile.summary && (
                <View style={{
                  marginTop: spacing[2],
                  paddingTop: spacing[2],
                  borderTop: `1pt solid rgba(255, 255, 255, 0.1)`,
                }}>
                  <ResumePDFText style={{ 
                    fontSize: "9pt",
                    color: "#aaaaaa",
                    lineHeight: 1.4,
                  }}>
                    {profile.summary}
                  </ResumePDFText>
                </View>
              )}
            </View>
            
            {/* Contact Info Column */}
            <View style={{ 
              width: "30%", 
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              padding: spacing[3],
              borderRadius: "4pt",
            }}>
              <ResumePDFText style={{ 
                color: themeColor,
                fontSize: "10pt",
                fontWeight: "bold",
                marginBottom: spacing[2],
                textTransform: "uppercase",
              }}>
                CONTACT
              </ResumePDFText>
              
              <View style={{ ...commonStyles.flexCol, gap: spacing[2] }}>
                {profile.email && (
                  <ResumePDFText style={{ fontSize: "8pt", color: "#ffffff" }}>
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
                  <ResumePDFText style={{ fontSize: "8pt", color: "#ffffff" }}>
                    {profile.phone}
                  </ResumePDFText>
                )}
                {profile.location && (
                  <ResumePDFText style={{ fontSize: "8pt", color: "#ffffff" }}>
                    {profile.location}
                  </ResumePDFText>
                )}
                {profile.url && (
                  <ResumePDFText style={{ fontSize: "8pt", color: "#ffffff" }}>
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
          </View>
          
          {/* Two Column Layout for Content */}
          <View style={{ ...commonStyles.flexRow, gap: spacing[5] }}>
            {/* Main Content Column - 70% */}
            <View style={{ width: "70%" }}>
              {/* Work Experience */}
              {formToShow.workExperiences && (
                <View style={{ marginBottom: spacing[5] }}>
                  <View style={{
                    ...commonStyles.flexRow,
                    alignItems: "center",
                    marginBottom: spacing[3],
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    padding: `${spacing[1]} ${spacing[3]}`,
                    borderRadius: "2pt",
                  }}>
                    <ResumePDFText style={{ 
                      color: themeColor,
                      fontWeight: "bold",
                      fontSize: "11pt",
                      textTransform: "uppercase",
                    }}>
                      {formToHeading.workExperiences}
                    </ResumePDFText>
                  </View>
                  
                  {workExperiences.map((exp, idx) => (
                    <View key={idx} style={{ 
                      marginBottom: spacing[4],
                      padding: spacing[2],
                      borderLeft: `2pt solid ${themeColor}`,
                      paddingLeft: spacing[3],
                    }}>
                      <ResumePDFText style={{ 
                        fontWeight: "bold",
                        fontSize: "10pt",
                        color: "#ffffff",
                        marginBottom: spacing[1],
                      }}>
                        {exp.jobTitle}
                      </ResumePDFText>
                      
                      <View style={{ 
                        ...commonStyles.flexRow,
                        justifyContent: "space-between",
                        marginBottom: spacing[2],
                      }}>
                        <ResumePDFText style={{ fontSize: "9pt", color: "#aaaaaa" }}>
                          {exp.company}
                        </ResumePDFText>
                        <ResumePDFText style={{ fontSize: "9pt", color: themeColor }}>
                          {exp.date}
                        </ResumePDFText>
                      </View>
                      
                      <View style={{ marginLeft: spacing[1] }}>
                        <ResumePDFBulletList
                          items={exp.descriptions}
                          showBulletPoints={true}
                          
                        />
                      </View>
                    </View>
                  ))}
                </View>
              )}
              
              {/* Projects */}
              {formToShow.projects && (
                <View style={{ marginBottom: spacing[5] }}>
                  <View style={{
                    ...commonStyles.flexRow,
                    alignItems: "center",
                    marginBottom: spacing[3],
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    padding: `${spacing[1]} ${spacing[3]}`,
                    borderRadius: "2pt",
                  }}>
                    <ResumePDFText style={{ 
                      color: themeColor,
                      fontWeight: "bold",
                      fontSize: "11pt",
                      textTransform: "uppercase",
                    }}>
                      {formToHeading.projects}
                    </ResumePDFText>
                  </View>
                  
                  {projects.map((proj, idx) => (
                    <View key={idx} style={{ 
                      marginBottom: spacing[4],
                      padding: spacing[2],
                      borderLeft: `2pt solid ${themeColor}`,
                      paddingLeft: spacing[3],
                    }}>
                      <View style={{ 
                        ...commonStyles.flexRow,
                        justifyContent: "space-between",
                        marginBottom: spacing[2],
                      }}>
                        <ResumePDFText style={{ 
                          fontWeight: "bold",
                          fontSize: "10pt",
                          color: "#ffffff",
                        }}>
                          {proj.project}
                        </ResumePDFText>
                        <ResumePDFText style={{ fontSize: "9pt", color: themeColor }}>
                          {proj.date}
                        </ResumePDFText>
                      </View>
                      
                      <View style={{ marginLeft: spacing[1] }}>
                        <ResumePDFBulletList
                          items={proj.descriptions}
                          showBulletPoints={showBulletPoints.projects}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
            
            {/* Sidebar Column - 30% */}
            <View style={{ width: "30%" }}>
              {/* Skills Section */}
              {formToShow.skills && (
                <View style={{ 
                  marginBottom: spacing[5],
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  padding: spacing[3],
                  borderRadius: "4pt",
                }}>
                  <ResumePDFText style={{ 
                    color: themeColor,
                    fontWeight: "bold",
                    fontSize: "11pt",
                    marginBottom: spacing[3],
                    textTransform: "uppercase",
                  }}>
                    {formToHeading.skills}
                  </ResumePDFText>
                  
                  {skills.featuredSkills && skills.featuredSkills
                    .filter(item => item && item.skill)
                    .map((skill, idx) => (
                      <View key={idx} style={{ marginBottom: spacing[2] }}>
                        <ResumePDFText style={{ 
                          color: "#ffffff",
                          fontSize: "9pt",
                          marginBottom: spacing[1],
                        }}>
                          {skill.skill}
                        </ResumePDFText>
                        <View style={{ 
                          height: "4pt",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderRadius: "2pt",
                        }}>
                          <View style={{ 
                            height: "4pt",
                            width: `${skill.rating * 20}%`,
                            backgroundColor: themeColor,
                            borderRadius: "2pt",
                          }} />
                        </View>
                      </View>
                    ))
                  }
                  
                  {skills.descriptions.length > 0 && (
                    <View style={{ marginTop: spacing[2] }}>
                      <ResumePDFBulletList
                        items={skills.descriptions}
                        showBulletPoints={showBulletPoints.skills}
                        
                      />
                    </View>
                  )}
                </View>
              )}
              
              {/* Education Section */}
              {formToShow.educations && (
                <View style={{ 
                  marginBottom: spacing[5],
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  padding: spacing[3],
                  borderRadius: "4pt",
                }}>
                  <ResumePDFText style={{ 
                    color: themeColor,
                    fontWeight: "bold",
                    fontSize: "11pt",
                    marginBottom: spacing[3],
                    textTransform: "uppercase",
                  }}>
                    {formToHeading.educations}
                  </ResumePDFText>
                  
                  {educations.map((edu, idx) => (
                    <View key={idx} style={{ 
                      marginBottom: idx < educations.length - 1 ? spacing[3] : 0,
                    }}>
                      <ResumePDFText style={{ 
                        fontWeight: "bold",
                        fontSize: "9pt",
                        color: "#ffffff",
                        marginBottom: spacing[1],
                      }}>
                        {edu.degree}
                      </ResumePDFText>
                      <ResumePDFText style={{ 
                        fontSize: "8pt",
                        color: "#aaaaaa",
                        marginBottom: spacing[1],
                      }}>
                        {edu.school}
                      </ResumePDFText>
                      <ResumePDFText style={{ 
                        fontSize: "8pt",
                        color: themeColor,
                        marginBottom: spacing[1],
                      }}>
                        {edu.date}
                      </ResumePDFText>
                      
                      <ResumePDFBulletList
                        items={edu.descriptions}
                        showBulletPoints={showBulletPoints.educations}
                      />
                    </View>
                  ))}
                </View>
              )}
              
              {/* Custom Section */}
              {formToShow.custom && (
                <View style={{ 
                  marginBottom: spacing[5],
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  padding: spacing[3],
                  borderRadius: "4pt",
                }}>
                  <ResumePDFText style={{ 
                    color: themeColor,
                    fontWeight: "bold",
                    fontSize: "11pt",
                    marginBottom: spacing[3],
                    textTransform: "uppercase",
                  }}>
                    {formToHeading.custom}
                  </ResumePDFText>
                  
                  <ResumePDFBulletList
                    items={custom.descriptions}
                    showBulletPoints={showBulletPoints.custom}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
