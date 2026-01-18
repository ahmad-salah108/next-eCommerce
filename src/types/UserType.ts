export type UserType = {
  id: string;
  user_id: string | undefined;
  full_name: string;
  email: string | undefined;
  role: "admin" | "customer";
  is_verified: boolean;
  created_at: string;
};
