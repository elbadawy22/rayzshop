import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./(frontend)/components/Navbar/Navbar";
import { Categories, UserProfile } from "./(frontend)/lib/taypes";
import { getCurrentUser } from "./(frontend)/lib/auth/currentUser";
import { getCategories } from "./(frontend)/lib/services/server/categories.services";
import { AuthProvider } from "./(frontend)/providers/AuthProvider";
import { CartProvider } from "./(frontend)/providers/CartProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rayz Shop",
  description: "Rayz Shop Ecommerce Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: UserProfile = await getCurrentUser();
  const category: Categories[] = await getCategories();

  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider user={user} category={category}>
          <CartProvider>
            <Navbar category={category} />
            <main>
              <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover={true}
                draggable={true}
                theme="light"
              />
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
