"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react"; // Import the LogOut icon
import { supabasePublic } from "@/lib/supabase/public";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await supabasePublic.auth.signOut();
        window.location.replace("/login");
      }}
      className="flex items-center gap-2 px-4 py-2 rounded-md text-white hover:bg-gray-100 transition-colors hover:text-gray-900"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
}
