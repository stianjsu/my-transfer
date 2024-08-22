import "./globals.css"
import type { Metadata, Viewport } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import Navbar from "@/components/NavBar"
import { dark } from "@clerk/themes"
import { Toaster } from "@/components/Toaster"

const APP_NAME = "My Transfer"
const APP_DEFAULT_TITLE = "My Transfer"
const APP_TITLE_TEMPLATE = "%s - PWA App"
const APP_DESCRIPTION = "Transfer your files accross devices"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#1e293b",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "#1e293b",
          colorText: "#f8fafc",
          colorTextSecondary: "#f8fafc",
          colorPrimary: "#f8fafc",
          fontSize: "1rem",
        },
      }}
    >
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
