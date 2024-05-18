export interface OrganizationType {
  _id: string;
  users?: string[];
  robots?: string[];
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  role?: string;
  joinDate?: Date;
  __v?: number;
}
export interface OrgFormType {
  name: string | undefined;
  email: string | undefined;
  password?: string;
}
