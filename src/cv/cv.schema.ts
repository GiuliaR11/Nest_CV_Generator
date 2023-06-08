import { Schema, Document } from 'mongoose';

export interface CV extends Document {
  personalDetails: {
    wantedJobTitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
  };
  employmentHistory: {
    jobTitle: string;
    employer: string;
    startDate: Date;
    endDate: Date;
    city: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    startDate: Date;
    endDate: Date;
    city: string;
    description?: string;
  }[];
}

export const CVSchema = new Schema<CV>({
  personalDetails: {
    wantedJobTitle: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    profilePhoto: { type: String, default: '' },
  },
  employmentHistory: [
    {
      jobTitle: { type: String, required: true },
      employer: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      city: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  education: [
    {
      institution: { type: String, required: true },
      degree: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      city: { type: String, required: true },
      description: { type: String, required: false },
    },
  ],
});
