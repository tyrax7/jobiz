import { Job } from '../../jobs/models/job.model';

export interface Application {
  id: number;
  coverLetter: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  jobId: number;
  userId: number;
  job: Job;
}

export interface CreateApplicationRequest {
  jobId: number;
  coverLetter: string;
}