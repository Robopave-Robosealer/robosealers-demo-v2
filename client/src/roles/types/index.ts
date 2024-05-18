export interface Permission {
  admins: string[];
  roles: string[];
  permissions: string[];
  users: string[];
  orgs: string[];
  robots: string[];
  oprations: string[]; // Typo corrected from 'oprations' to 'operations'
}

export type RoleType = {
  _id: string;
  name: string;
  permissions: Permission;
  type: string;
  __v: number;
};
