import { ReactElement } from "react-markdown/lib/react-markdown";

export interface Person {
  name: string;
  homepage: string;
  workgroups: string[];
  role: string;
  mc: boolean;
  country: string;
  countryCode: string;
  countryFlag: string;
}

export interface ColumnSpec {
  name: string;
  label: string;
  /** if given, the label will be clickable to direct to href */
  href?: string;
  style?: any; // somehow CSSProperties is not allowed this time...
  func?: (row: Record<string, any>) => any;
}

export interface Position {
  x: number;
  y: number;
}
