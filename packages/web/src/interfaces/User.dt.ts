export interface ICandidate {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  type: 'CANDIDATE';
}

export interface ICompany {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  type: 'COMPANY';
}

export type IUser = ICandidate | ICompany;

export type UserType = 'candidate' | 'company';