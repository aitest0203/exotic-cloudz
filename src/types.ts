import type { ReactNode } from 'react';

export type View = 'home' | 'booking' | 'success';

export type PackageId = 'starter' | 'party' | 'king';

export interface Package {
  id: PackageId;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: ReactNode;
}

export interface FormData {
  package: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  location: string;
  flavors: string;
}
