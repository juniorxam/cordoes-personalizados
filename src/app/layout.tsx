import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cordões Personalizados | Sua marca em cada detalhe",
  description: "Cordões, acessórios e identificadores personalizados para empresas, hospitais, escolas e eventos. Solicite um orçamento sob medida.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
