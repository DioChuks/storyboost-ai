import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoryblokProvider from "@/components/StoryblokProvider";
import Layout from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StoryBoost AI",
  description: "Your AI-powered Storyblok companion",
};

export default function RootLayout({ children }) {
  return (
    <StoryblokProvider>
			<html lang="en">
				<body>
					<Layout>{children}</Layout>
				</body>
			</html>
		</StoryblokProvider>
  );
}
