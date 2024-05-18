export type AdminType = {
  _id: string;
  name: string;
  email: string;
  role: "superAdmin" | "admin" | "user"; // Assuming these are the possible roles
  isActive: boolean;
  joinDate: Date;
  permission: {
    _id: string;
    name?: string;
  };
  __v: number;
};
