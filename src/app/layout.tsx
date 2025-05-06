import "globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "OpenResume - Free Open-source Resume Builder and Parser",
  description:
    "OpenResume is a free, open-source resume builder and parser. Build a professional resume and get it parsed by Applicant Tracking Systems (ATS).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
