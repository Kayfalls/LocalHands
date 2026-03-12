"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AnalyticsChart } from "@/components/analytics-chart";
import { MatchRing } from "@/components/match-ring";
import { MessageChat } from "@/components/message-chat";
import { RoleGuard } from "@/components/role-guard";
import apiClient from "@/lib/api-client";
import { AnalyticsOverview } from "@/types/api";

const fallback: AnalyticsOverview = {
  total_profiles: 3480,
  total_jobs: 247,
  match_success_rate: 0.82,
  monthly_placements: [12, 17, 21, 23, 26, 31],
};

export default function EmployerDashboardPage() {
  const [overview, setOverview] = useState<AnalyticsOverview>(fallback);

  useEffect(() => {
    apiClient
      .get<AnalyticsOverview>("/analytics/overview")
      .then((res) => setOverview(res.data))
      .catch(() => setOverview(fallback));
  }, []);

  return (
    <RoleGuard allow={["employer", "admin"]}>
      <main className="min-h-screen p-6 md:p-10">
        <section className="max-w-6xl mx-auto">
          <header className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold">Employer Dashboard</h1>
              <p className="text-neutral-600">Track job fill velocity and candidate quality across township regions.</p>
            </div>
            <Link
              href="/employer/settings"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
            >
              Company Settings
            </Link>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <article className="card p-5 animate-slideUp">
              <p className="text-sm text-neutral-500">Worker Profiles</p>
              <p className="text-3xl font-semibold mt-2">{overview.total_profiles}</p>
            </article>
            <article className="card p-5 animate-slideUp">
              <p className="text-sm text-neutral-500">Active Jobs</p>
              <p className="text-3xl font-semibold mt-2">{overview.total_jobs}</p>
            </article>
            <article className="card p-5 animate-slideUp">
              <p className="text-sm text-neutral-500">Match Success</p>
              <p className="text-3xl font-semibold mt-2">{Math.round(overview.match_success_rate * 100)}%</p>
            </article>
            <article className="card p-5 animate-slideUp flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Top Job Match</p>
                <p className="text-lg font-semibold mt-2">Electrical Assistant</p>
              </div>
              <MatchRing percentage={92} />
            </article>
          </div>

          <div className="mt-6 grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <AnalyticsChart points={overview.monthly_placements} />
            </div>
            <article className="card p-6 animate-slideUp">
              <h3 className="text-base font-semibold">Priority Actions</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                <li className="p-3 rounded-xl border border-[#f4d5da]">Post 4 urgent maintenance roles in Khayelitsha</li>
                <li className="p-3 rounded-xl border border-[#f4d5da]">Review 11 candidates with 80%+ match</li>
                <li className="p-3 rounded-xl border border-[#f4d5da]">Export weekly analytics for HR leadership</li>
              </ul>
            </article>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Worker Messages</h2>
            <MessageChat currentUserRole="employer" />
          </div>
        </section>
      </main>
    </RoleGuard>
  );
}
