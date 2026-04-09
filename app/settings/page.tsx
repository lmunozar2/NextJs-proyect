import SideBar from "@/components/SideBar";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { AccountSettings } from "@stackframe/stack";

export default async function SettingsPage() {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <SideBar currentPath="/settings">
        {/* ── Header ── */}
        <div className="flex items-center gap-4 mb-10"></div>

        {/* ── Content Container ── */}
        <div className="bg-base-100/40 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-lg overflow-hidden">
          <AccountSettings />
        </div>
      </SideBar>
    </div>
  );
}
