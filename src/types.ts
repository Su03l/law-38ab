
export type BookingStatus = 'Pending' | 'Confirmed' | 'Rejected' | 'Completed';
export type ConsultationType = 'In-Person' | 'Online';

export interface Booking {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  type: ConsultationType;
  serviceType: string;      // Dropdown: General, Corporate, etc. ("نوع الاستشارة")
  consultationTopic?: string; // Text: Specific topic ("موضوع الاستشارة")
  details?: string;         // Textarea: Detailed description ("تفاصيل الاستشارة")
  status: BookingStatus;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}
