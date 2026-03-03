export type UserRole = "worker" | "employer" | "admin";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: "bearer";
  role: UserRole;
}

export interface JobCreate {
  title: string;
  description: string;
  location: string;
  required_skills: string[];
}

export interface MatchItem {
  profile_id: string;
  score: number;
  matched_skills: string[];
  missing_skills: string[];
}

export interface MatchResponse {
  job_id: string;
  matches: MatchItem[];
}
