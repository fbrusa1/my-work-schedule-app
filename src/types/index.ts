export interface Company {
  id: number;
  name: string;
}

export interface Option {
  value: number;
  label: string;
}

export interface Shift {
  document: string;
  companyId: number | null;
  companyName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  optionals: Option[];
}

export interface ShiftData {
  date: string;
  checkIn: string;
  checkOut: string;
  optionals: Option[];
}

export interface UserData {
  document: string;
  companyId: number | null;
  companyName: string;
}

export interface LoginData {
  document: string;
  company: string;
}
  