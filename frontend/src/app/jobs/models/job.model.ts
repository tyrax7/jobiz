export interface City {
  id: number;
  name: string;
  postalCode: string;
}

export interface Company {
  id: number;
  name: string;
  description?: string;
  address?: string;
  city?: City;
}

export interface JobCategory {
  id: number;
  name: string;
}

export interface JobType {
  id: number;
  name: string;
}

export interface JobCategoryRelation {
  category: JobCategory;
}

export interface JobTypeRelation {
  type: JobType;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  remoteAllowed: boolean;
  salaryMin?: number;
  salaryMax?: number;
  createdAt: string;
  company?: Company;
  city?: City;
  categories: JobCategoryRelation[];
  types: JobTypeRelation[];
}