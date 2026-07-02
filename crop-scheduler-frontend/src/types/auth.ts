export type FarmerProfile = {
  id: number;
  name: string;
  phone: string;
  area: string;
  state: string;
  district: string;
  village: string;
  land_area: string | null;
  crop: number | null;
  crop_name: string;
};

export type AuthUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_joined?: string | null;
  last_login?: string | null;
  is_staff: boolean;
  is_superuser: boolean;
  role: 'admin' | 'farmer' | 'user';
  farmer_profile?: FarmerProfile | null;
};

export type AuthSession = {
  access: string;
  refresh: string;
  user: AuthUser;
};

export type FarmerLoginPayload = {
  phone: string;
  password: string;
};

export type FarmerSignupPayload = {
  name: string;
  phone: string;
  password: string;
  area?: string;
  state?: string;
  district?: string;
  village?: string;
  land_area?: string;
};
