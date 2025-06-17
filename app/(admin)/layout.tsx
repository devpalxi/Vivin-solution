"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/ui/logout-button";
import { supabasePublic } from "@/lib/supabase/public";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabasePublic.auth.getSession();

      if (!session) {
        console.log("No session found, redirecting to login");
        router.replace("/login");
      } else {
        console.log("Session found:", session.user.email);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }

    checkSession();
  }, [router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authenticated, show the admin interface with custom header
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Admin Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/admin" className="flex items-center">
              <span className="font-bold text-xl">Vivin Solutions</span>
              <span className="ml-2 text-sm text-gray-500">Admin</span>
            </Link>
            <LogoutButton />
          </div>
        </header>

        {/* Admin Content */}
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      </div>
    );
  }

  // This should never render because of the redirect, but just in case
  return null;
}
