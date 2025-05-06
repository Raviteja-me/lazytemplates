import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeProject } from "lib/redux/types";

export const ResumePDFProject = ({
  heading,
  projects,
  themeColor,
  showBulletPoints = true,
}: {
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
  showBulletPoints?: boolean;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {projects.map(({ project, date, descriptions }, idx) => (
        <View key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
          <View style={{ ...styles.flexRowBetween }}>
            <ResumePDFText bold={true}>{project}</ResumePDFText>
            <ResumePDFText>{date}</ResumePDFText>
          </View>
          <ResumePDFBulletList items={descriptions} showBulletPoints={showBulletPoints} />
        </View>
      ))}
    </ResumePDFSection>
  );
};
