import { ReactElement } from "react-markdown/lib/react-markdown";

export interface Person {
  name: string;
  homepage: string;
  workgroups: string[];
  role: string;
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
  function?: ()
}

export interface PortalData {
  x: number;
  y: number;
  content: ReactElement
}
