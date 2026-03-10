"use client";

import { useState } from "react";
import { RoleGuard } from "@/components/role-guard";
import apiClient from "@/lib/api-client";

export default function EmployerSettingsPage() {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_email: "",
    phone: "",
    industry: "",
    description: "",
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
      await apiClient.post("/api/v1/employer-profiles", {
        company_name: formData.company_name,
        contact_email: formData.contact_email,
        phone: formData.phone,
        industry: formData.industry,
        description: formData.description,
      });

      setMessage("Company settings updated successfully!");
      setFormData({
        company_name: "",
        contact_email: "",
        phone: "",
        industry: "",
        description: "",
      });
    } catch (error: any) {
      setMessage(error?.response?.data?.detail || "Error updating settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allow={["employer", "admin"]}>
      <main className="min-h-screen p-6 md:p-10 bg-gray-50">
        <section className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold">Company Settings</h1>
            <p className="text-neutral-600 mt-2">Update your company information to attract better matches.</p>
          </header>

          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  placeholder="Enter contact email"
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
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g., Construction, Healthcare, Retail"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell workers about your company"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
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
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </RoleGuard>
  );
}
