"use client";

import { ProfileCard } from "@/components/profile-card";
import { RoleGuard } from "@/components/role-guard";

export default function WorkerDashboardPage() {
  return (
    <RoleGuard allow={["worker", "admin"]}>
      <main className="min-h-screen p-6 md:p-10">
        <section className="max-w-5xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold">Worker Dashboard</h1>
            <p className="text-neutral-600">Build your profile and improve your job-match score.</p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProfileCard name="Nomsa D." township="Khayelitsha" skills={["Electrical", "Safety", "Maintenance"]} />
            <ProfileCard name="Sipho K." township="Soweto" skills={["Plumbing", "Repairs", "Customer Service"]} />
            <ProfileCard name="Anele M." township="Mamelodi" skills={["Carpentry", "Finishing", "Measurement"]} />
          </div>
        </section>
      </main>
    </RoleGuard>
  );
}
