import { supabase } from "../lib/supabase";

export interface ProfileData {
  id: string;
  username: string;
  phone: string;
  role?: string;
}

export const createProfile = async (profileData: ProfileData) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        id: profileData.id,
        username: profileData.username,
        phone: profileData.phone,
        role: "customer", // Default role for new users
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
