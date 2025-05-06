import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumePDFText, ResumePDFBulletList, ResumePDFLink } from "components/Resume/ResumePDF/common";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { styles as commonStyles, spacing } from "components/Resume/ResumePDF/styles";

export const DecorTemplate = ({
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
  const themeColor = settings.themeColor || "#7e57c2";

  const showFormsOrder = formsOrder.filter((form) => formToShow[form]);

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
          backgroundColor: "#fcfcfc",
        }}
      >
        {/* Decorative Header */}
        <View style={{
          ...commonStyles.flexCol,
          alignItems: "center",
          marginBottom: spacing[5],
          position: "relative",
        }}>
          {/* Decorative Lines */}
          <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2pt",
            backgroundColor: themeColor,
          }} />
          
          <View style={{
            position: "absolute",
            top: "6pt",
            left: 0,
            right: 0,
            height: "1pt",
            backgroundColor: themeColor,
            opacity: 0.5,
          }} />
          
          {/* Name and Title */}
          <View style={{ marginTop: spacing[4], textAlign: "center" }}>
            <ResumePDFText style={{ 
              fontSize: "22pt", 
              fontWeight: "bold",
              color: themeColor,
              marginBottom: spacing[1],
              textTransform: "uppercase",
              letterSpacing: "2pt",
            }}>
              {profile.name}
            </ResumePDFText>
            
            {/* Job title/role can be derived from location or summary if needed */}
            {profile.location && (
              <ResumePDFText style={{ 
                fontSize: "11pt",
                color: "#666666",
                marginBottom: spacing[3],
                letterSpacing: "0.5pt",
              }}>
                {profile.location}
              </ResumePDFText>
            )}
          </View>
          
          {/* Contact Information */}
          <View style={{
            ...commonStyles.flexRow,
            justifyContent: "center",
            flexWrap: "wrap",
            gap: spacing[4],
            marginTop: spacing[2],
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
          
          {/* Bottom Decorative Lines */}
          <View style={{
            position: "absolute",
            bottom: "-10pt",
            left: 0,
            right: 0,
            height: "1pt",
            backgroundColor: themeColor,
            opacity: 0.5,
          }} />
          
          <View style={{
            position: "absolute",
            bottom: "-16pt",
            left: 0,
            right: 0,
            height: "2pt",
            backgroundColor: themeColor,
          }} />
        </View>
        
        {/* Summary Section */}
        {profile.summary && (
          <View style={{ 
            marginBottom: spacing[5],
            padding: spacing[4],
            backgroundColor: "#f9f7fc",
            borderRadius: "4pt",
            borderLeft: `3pt solid ${themeColor}`,
          }}>
            <ResumePDFText style={{ 
              fontStyle: "italic",
              lineHeight: 1.4,
              color: "#555555",
            }}>
              {profile.summary}
            </ResumePDFText>
          </View>
        )}
        
        {/* Main Content */}
        <View style={{ ...commonStyles.flexRow, gap: spacing[6] }}>
          {/* Left Column - 60% */}
          <View style={{ width: "60%" }}>
            {/* Work Experience */}
            {formToShow.workExperiences && (
              <View style={{ marginBottom: spacing[5] }}>
                <View style={{
                  ...commonStyles.flexRow,
                  alignItems: "center",
                  marginBottom: spacing[3],
                }}>
                  <View style={{
                    width: "30pt",
                    height: "1pt",
                    backgroundColor: themeColor,
                    marginRight: spacing[2],
                  }} />
                  <ResumePDFText style={{ 
                    fontWeight: "bold",
                    fontSize: "12pt",
                    color: themeColor,
                    textTransform: "uppercase",
                    letterSpacing: "1pt",
                  }}>
                    {formToHeading.workExperiences}
                  </ResumePDFText>
                  <View style={{
                    flex: 1,
                    height: "1pt",
                    backgroundColor: themeColor,
                    marginLeft: spacing[2],
                    opacity: 0.3,
                  }} />
                </View>
                
                {workExperiences.map((exp, idx) => (
                  <View key={idx} style={{ 
                    marginBottom: spacing[4],
                    position: "relative",
                    paddingLeft: spacing[4],
                  }}>
                    {/* Decorative Circle */}
                    <View style={{
                      position: "absolute",
                      left: 0,
                      top: "4pt",
                      width: "8pt",
                      height: "8pt",
                      borderRadius: "4pt",
                      backgroundColor: themeColor,
                    }} />
                    
                    <ResumePDFText style={{ 
                      fontWeight: "bold",
                      fontSize: "11pt",
                      color: "#333333",
                      marginBottom: spacing[1],
                    }}>
                      {exp.jobTitle}
                    </ResumePDFText>
                    
                    <View style={{ 
                      ...commonStyles.flexRow,
                      justifyContent: "space-between",
                      marginBottom: spacing[2],
                    }}>
                      <ResumePDFText style={{ 
                        fontSize: "10pt",
                        color: "#555555",
                      }}>
                        {exp.company}
                      </ResumePDFText>
                      <ResumePDFText style={{ 
                        fontSize: "9pt",
                        color: themeColor,
                        fontStyle: "italic",
                      }}>
                        {exp.date}
                      </ResumePDFText>
                    </View>
                    
                    <ResumePDFBulletList
                      items={exp.descriptions}
                      showBulletPoints={true}
                    />
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
                }}>
                  <View style={{
                    width: "30pt",
                    height: "1pt",
                    backgroundColor: themeColor,
                    marginRight: spacing[2],
                  }} />
                  <ResumePDFText style={{ 
                    fontWeight: "bold",
                    fontSize: "12pt",
                    color: themeColor,
                    textTransform: "uppercase",
                    letterSpacing: "1pt",
                  }}>
                    {formToHeading.projects}
                  </ResumePDFText>
                  <View style={{
                    flex: 1,
                    height: "1pt",
                    backgroundColor: themeColor,
                    marginLeft: spacing[2],
                    opacity: 0.3,
                  }} />
                </View>
                
                {projects.map((proj, idx) => (
                  <View key={idx} style={{ 
                    marginBottom: spacing[4],
                    position: "relative",
                    paddingLeft: spacing[4],
                  }}>
                    {/* Decorative Circle */}
                    <View style={{
                      position: "absolute",
                      left: 0,
                      top: "4pt",
                      width: "8pt",
                      height: "8pt",
                      borderRadius: "4pt",
                      backgroundColor: themeColor,
                    }} />
                    
                    <View style={{ 
                      ...commonStyles.flexRow,
                      justifyContent: "space-between",
                      marginBottom: spacing[2],
                    }}>
                      <ResumePDFText style={{ 
                        fontWeight: "bold",
                        fontSize: "11pt",
                        color: "#333333",
                      }}>
                        {proj.project}
                      </ResumePDFText>
                      <ResumePDFText style={{ 
                        fontSize: "9pt",
                        color: themeColor,
                        fontStyle: "italic",
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
          </View>
          
          {/* Right Column - 40% */}
          <View style={{ width: "40%" }}>
            {/* Skills Section */}
            {formToShow.skills && (
              <View style={{ 
                marginBottom: spacing[5],
                backgroundColor: "#f9f7fc",
                padding: spacing[4],
                borderRadius: "4pt",
              }}>
                <View style={{
                  ...commonStyles.flexRow,
                  alignItems: "center",
                  marginBottom: spacing[3],
                }}>
                  <ResumePDFText style={{ 
                    fontWeight: "bold",
                    fontSize: "12pt",
                    color: themeColor,
                    textTransform: "uppercase",
                    letterSpacing: "1pt",
                  }}>
                    {formToHeading.skills}
                  </ResumePDFText>
                  <View style={{
                    flex: 1,
                    height: "1pt",
                    backgroundColor: themeColor,
                    marginLeft: spacing[2],
                    opacity: 0.3,
                  }} />
                </View>
                
                {skills.featuredSkills && skills.featuredSkills
                  .filter(item => item && item.skill)
                  .map((skill, idx) => (
                    <View key={idx} style={{ 
                      ...commonStyles.flexRow,
                      marginBottom: spacing[2],
                      alignItems: "center",
                    }}>
                      <ResumePDFText style={{ 
                        width: "40%",
                        fontSize: "9pt",
                        color: "#333333",
                      }}>
                        {skill.skill}
                      </ResumePDFText>
                      <View style={{ 
                        ...commonStyles.flexRow,
                        width: "60%",
                      }}>
                        {[...Array(5)].map((_, i) => (
                          <View
                            key={i}
                            style={{
                              width: "8pt",
                              height: "8pt",
                              borderRadius: "4pt",
                              backgroundColor: i < skill.rating ? themeColor : "#e0e0e0",
                              marginRight: i < 4 ? "3pt" : 0,
                            }}
                          />
                        ))}
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
              <View style={{ marginBottom: spacing[5] }}>
                <View style={{
                  ...commonStyles.flexRow,
                  alignItems: "center",
                  marginBottom: spacing[3],
                }}>
                  <ResumePDFText style={{ 
                    fontWeight: "bold",
                    fontSize: "12pt",
                    color: themeColor,
                    textTransform: "uppercase",
                    letterSpacing: "1pt",
                  }}>
                    {formToHeading.educations}
                  </ResumePDFText>
                  <View style={{
                    flex: 1,
                    height: "1pt",
                    backgroundColor: themeColor,
                    marginLeft: spacing[2],
                    opacity: 0.3,
                  }} />
                </View>
                
                {educations.map((edu, idx) => (
                  <View key={idx} style={{ 
                    marginBottom: spacing[3],
                    padding: spacing[2],
                    backgroundColor: idx % 2 === 0 ? "#f9f7fc" : "transparent",
                    borderRadius: "2pt",
                  }}>
    
                    <ResumePDFText style={{ 
                      fontWeight: "bold",
                      fontSize: "10pt",
                      color: "#333333",
                      marginBottom: spacing[1],
                    }}>
                      {edu.school}
                    </ResumePDFText>
                    
                    <View style={{ 
                      ...commonStyles.flexRow,
                      justifyContent: "space-between",
                      marginBottom: spacing[1],
                    }}>
                      <ResumePDFText style={{ 
                        fontSize: "9pt",
                        color: "#555555",
                      }}>
                        {edu.degree}
                      </ResumePDFText>
                      <ResumePDFText style={{ 
                        fontSize: "9pt",
                        color: themeColor,
                        fontStyle: "italic",
                      }}>
                        {edu.date}
                      </ResumePDFText>
                    </View>
                    
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
              <View style={{ marginBottom: spacing[5] }}>
                <View style={{
                  ...commonStyles.flexRow,
                  alignItems: "center",
                  marginBottom: spacing[3],
                }}>
                  <ResumePDFText style={{ 
                    fontWeight: "bold",
                    fontSize: "12pt",
                    color: themeColor,
                    textTransform: "uppercase",
                    letterSpacing: "1pt",
                  }}>
                    {formToHeading.custom}
                  </ResumePDFText>
                  <View style={{
                    flex: 1,
                    height: "1pt",
                    backgroundColor: themeColor,
                    marginLeft: spacing[2],
                    opacity: 0.3,
                  }} />
                </View>
                
                <ResumePDFBulletList
                  items={custom.descriptions}
                  showBulletPoints={showBulletPoints.custom}
                />
              </View>
            )}
          </View>
        </View>
        
        {/* Footer with decorative elements */}
        <View style={{
          position: "absolute",
          bottom: spacing[6],
          left: spacing[6],
          right: spacing[6],
        }}>
          <View style={{
            height: "1pt",
            backgroundColor: themeColor,
            opacity: 0.3,
            marginBottom: "4pt",
          }} />
          <View style={{
            height: "2pt",
            backgroundColor: themeColor,
          }} />
        </View>
      </Page>
    </Document>
  );
};
