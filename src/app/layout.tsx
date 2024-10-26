import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { ReactNode } from "react"; // Import ReactNode

export const metadata = {
  title: "Countdown Timer",
  description: "Powered by CopilotKit",
};

// Define the type for RootLayout props
interface RootLayoutProps {
  children: ReactNode; // Specify the correct type for children
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CopilotKit runtimeUrl="/api/copilotkit">{children}</CopilotKit>
      </body>
    </html>
  );
}
