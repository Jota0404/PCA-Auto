import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PCA Auto",
  description: "Preparação e automação controlada do PCA no e-ComprasDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
