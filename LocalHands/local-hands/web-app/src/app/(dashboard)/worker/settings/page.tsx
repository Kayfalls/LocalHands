"use client";

import { useState } from "react";
import { RoleGuard } from "@/components/role-guard";
import apiClient from "@/lib/api-client";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    township: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await apiClient.post("/api/v1/profiles", {
        full_name: formData.full_name,
        phone: formData.phone,
        township: formData.township,
        skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      });

      setMessage("Profile updated successfully!");
      setFormData({ full_name: "", phone: "", township: "", skills: "" });
    } catch (error: any) {
      setMessage(error?.response?.data?.detail || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allow={["worker", "admin"]}>
      <main className="min-h-screen p-6 md:p-10 bg-gray-50">
        <section className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold">Profile Settings</h1>
            <p className="text-neutral-600 mt-2">Update your profile information to improve your job matches.</p>
          </header>

          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="township" className="block text-sm font-medium text-gray-700 mb-2">
                  Township
                </label>
                <input
                  type="text"
                  id="township"
                  name="township"
                  value={formData.township}
                  onChange={handleChange}
                  placeholder="Enter your township"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (comma-separated)
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., Electrical, Plumbing, Carpentry"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Separate skills with commas for better matching</p>
              </div>

              {message && (
                <div
                  className={`p-4 rounded-lg text-sm ${
                    message.includes("successfully")
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Profile Tips</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Add detailed skills to increase your job match score</li>
                <li>✓ Keep your phone number up to date for employer contact</li>
                <li>✓ Specify your township to find local opportunities</li>
                <li>✓ Complete all fields for the best matches</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </RoleGuard>
  );
}
