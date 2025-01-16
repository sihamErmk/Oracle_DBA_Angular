import { AwrData } from "./AwrData";

export interface GroupedAwrData {
  [snapId: string]: AwrData[];
}
