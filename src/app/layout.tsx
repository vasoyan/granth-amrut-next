// app/layout.tsx
"use client";
import { useContext, useEffect, useState } from "react";
import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import Loader from "@/components/common/Loader";
import { AuthContext } from "./context/authContext";
import SignInPage from "./(auth)/signin/page";
import AuthProvider from "./context/authContext";
import { ThemeProvider, useThemeContext } from "./context/themeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <ThemeProvider>
            <Content>{children}</Content>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authContext?.loading === false) {
      setLoading(false);
    }
  }, [authContext?.loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`dark:bg-boxdark-2 dark:text-bodydark`}>
      {authContext?.user ? <main>{children}</main> : <SignInPage />}
    </div>
  );
}
