import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ghost AI",
  description: "AI-powered code editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: "var(--accent-primary)",
              colorBackground: "var(--bg-surface)",
              colorInput: "var(--bg-base)",
              colorForeground: "var(--text-primary)",
              colorMutedForeground: "var(--text-muted)",
              colorBorder: "var(--border-default)",
              colorInputForeground: "var(--text-primary)",
            },
            elements: {
              card: "bg-zinc-950/70 border border-zinc-800/80 shadow-2xl backdrop-blur-md rounded-2xl p-6",
              headerTitle: "text-zinc-100 font-semibold tracking-tight text-xl",
              headerSubtitle: "text-zinc-400 text-sm",
              socialButtonsBlockButton: "border border-zinc-800/80 bg-zinc-950/50 hover:bg-zinc-900/80 text-zinc-300 font-medium transition-colors duration-200",
              formButtonPrimary: "bg-cyan-400 hover:bg-cyan-500 text-zinc-950 font-semibold transition-all duration-200 cursor-pointer shadow-md active:scale-[0.98]",
              formFieldInput: "bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder:text-zinc-650 focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-all duration-200",
              footerActionLink: "text-cyan-400 hover:text-cyan-300 font-medium",
            }
          }}
          localization={{
            signIn: {
              start: {
                title: "Sign in to Ghost AI",
                subtitle: "Welcome back! Please sign in to continue"
              }
            },
            signUp: {
              start: {
                title: "Sign up to Ghost AI",
                subtitle: "Create your account to continue"
              }
            }
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}