export type Log = {
  id: string;
  timestamp: Date;
  // [longitude, latitude]
  location: [number, number] | null;
  userid: string;
  message: string;
};