export interface UsersType {
  _id: string;
  robots?:
    | {
        _id: any[] | null;
        name: any[];
      }
    | any; // You can replace `any[]` with a specific type if needed
  name?: string;
  email?: string;
  isActive?: boolean;
  role?: string;
  joinDate?: string;
  org: {
    _id: string | null;
    name: string;
  };
  permission?: {
    _id: string | null;
    name: string;
    permissions?: {};
  }; // Change `string` to a more specific type if needed
}
export interface UserFormType {
  name: string;
  email: string;
  password?: string;
  robots?: {
    _id: any[] | null;
    name: any[];
  };
  org: {
    _id: string | null;
    name: string;
  };
  permission: {
    _id: any;
    name: string;
  };
}
