export interface RobotData {
  _id: string;
  robot: string;
  area: string;
  endDate: string;
  startDate: string;
  distance: number;
  runningHours: number;
  sealantVolume: number;
  cracksNumber: number;
  cracksVolume: number;
  accuracy: number;
  image: string[]; // Assuming these are URLs to images
  isActive: boolean;
  pointsLocation: any[]; // You can define a more specific type if needed
  __v: number;
}

export interface Totals {
  distanceTotal: number;
}

export interface ApiResponse {
  code: number;
  count: number;
  result: RobotData[];
  success: boolean;
  totals: Totals;
}
