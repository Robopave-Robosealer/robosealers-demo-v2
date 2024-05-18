export interface RobotType {
  _id: string;
  users?: any[]; // You can replace `any[]` with a specific type if needed
  org?: {
    _id: string;
    name: string;
  };
  name: string;
}
export interface RobotFormType {
  name: string;
  org: {
    _id: string | null;
    name: string;
  };
}
