import "./globals.css";

export const metadata = {
  title: "My Transfer",
  description: "Upload your files to access them accross devices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
