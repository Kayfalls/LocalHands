"use client";

import Link from "next/link";
import { ProfileCard } from "@/components/profile-card";
import { MessageChat } from "@/components/message-chat";
import { RoleGuard } from "@/components/role-guard";

export default function WorkerDashboardPage() {
  return (
    <RoleGuard allow={["worker", "admin"]}>
      <main className="min-h-screen p-6 md:p-10">
        <section className="max-w-5xl mx-auto">
          <header className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold">Worker Dashboard</h1>
              <p className="text-neutral-600">Build your profile and improve your job-match score.</p>
            </div>
            <Link
              href="/worker/settings"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
            >
              Edit Profile
            </Link>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProfileCard name="Nomsa D." township="Khayelitsha" skills={["Electrical", "Safety", "Maintenance"]} />
            <ProfileCard name="Sipho K." township="Soweto" skills={["Plumbing", "Repairs", "Customer Service"]} />
            <ProfileCard name="Anele M." township="Mamelodi" skills={["Carpentry", "Finishing", "Measurement"]} />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>
            <MessageChat currentUserRole="worker" />
          </div>
        </section>
      </main>
    </RoleGuard>
  );
}
