import type { Metadata } from "next";
import "./globals.css";
import "./pca-overrides.css";

export const metadata: Metadata = {
  title: "PCA Auto | Painel",
  description: "Preparação, validação e automação controlada do PCA no e-ComprasDF.",
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
