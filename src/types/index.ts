export interface Company {
  id: number;
  name: string;
}

export interface Shift {
  document: string;
  companyId: string;
  companyName: string;
  date: string;
  checkIn: string;
  checkOut: string;
}

export interface ShiftData {
  date: string;
  checkIn: string;
  checkOut: string;
}

export interface UserData {
  document: string;
  companyId: number | null;
  companyName: string;
}
  