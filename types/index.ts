export interface Person {
  name: string;
  homepage: string;
  workgroups: string[];
  role: string;
  mc: boolean;
  email?: string;
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

export interface PeopleContent {
  attributes: PeopleAttributes;
  body: string;
}
export interface PeopleAttributes {
  title: string;
  people: Person[];
  mc: boolean;
  roles: { [role: string]: Person };
  countries: { [countryCode: string]: Person[] };
}

export interface Update {
  id: string;
  title: string;
  date: string;
  image: string;
  author: string;
  announce_until: string;
}
