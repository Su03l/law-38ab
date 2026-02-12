
import React from 'react';
import { Scale, ShieldCheck, Briefcase, Users, Landmark, Gavel } from 'lucide-react';
import { PracticeArea, BlogPost, Booking, Employee } from '../types';

export const PRACTICE_AREAS: PracticeArea[] = [
  { id: '1', title: 'قانون الشركات', description: 'تقديم المشورة القانونية لعمليات الاندماج والاستحواذ والامتثال التنظيمي وحوكمة الشركات.', iconName: 'Briefcase' },
  { id: '2', title: 'القانون الجنائي', description: 'دفاع قوي لحماية حقوقك وحريتك أمام المحاكم المختصة بكافة درجاتها.', iconName: 'ShieldCheck' },
  { id: '3', title: 'الأحوال الشخصية', description: 'التعامل مع قضايا الأسرة والإرث والوصايا بعناية فائقة وخصوصية تامة وفق الشريعة.', iconName: 'Users' },
  { id: '4', title: 'الملكية الفكرية', description: 'حماية ابتكاراتك وعلاماتك التجارية وبراءات الاختراع محلياً ودولياً.', iconName: 'Landmark' },
  { id: '5', title: 'العقارات والمقاولات', description: 'حلول قانونية متقدمة للمعاملات العقارية المعقدة ونزاعات المقاولات والإنشاءات.', iconName: 'Gavel' },
  { id: '6', title: 'التقاضي والتحكيم', description: 'سجل حافل في حسم النزاعات القضائية الكبرى والتحكيم التجاري بكفاءة عالية.', iconName: 'Scale' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'تعديلات نظام العمل 2026: ما يجب معرفته',
    date: '12 مايو 2024',
    excerpt: 'تغييرات جوهرية في أنظمة العمل والعمال القادمة تشمل ساعات العمل والعقود.',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'الذكاء الاصطناعي وحقوق الملكية الفكرية',
    date: '28 أبريل 2024',
    excerpt: 'كيف يغير الذكاء الاصطناعي مفاهيم براءات الاختراع وحقوق النشر التقليدية.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'حماية الأصول في إعادة الهيكلة',
    date: '15 أبريل 2024',
    excerpt: 'التخطيط القانوني الاستراتيجي لحماية المصالح المالية والاعتبارية أثناء التغيير.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: '1',
    clientName: 'عبدالعزيز السعدون',
    email: 'a.sadoun@mail.sa',
    phone: '0501112223',
    date: '2024-06-15',
    time: '09:00 ص',
    type: 'In-Person',
    serviceType: 'قانون الشركات',
    consultationTopic: 'تأسيس شركة ذات مسؤولية محدودة',
    details: 'نرغب في حجز موعد لمناقشة إجراءات تأسيس شركة جديدة والشروط اللازمة.',
    status: 'Pending'
  },
  {
    id: '2',
    clientName: 'ريم الفهد',
    email: 'reem@law.sa',
    phone: '0552223334',
    date: '2024-06-16',
    time: '04:30 م',
    type: 'Online',
    serviceType: 'الأحوال الشخصية',
    consultationTopic: 'استشارة في قضايا الحضانة',
    details: 'لدي استفسارات بخصوص حقوق الحضانة بعد الطلاق.',
    status: 'Pending'
  },
  {
    id: '3',
    clientName: 'محمد الشهري',
    email: 'm.shehri@corp.sa',
    phone: '0563334445',
    date: '2024-06-18',
    time: '11:00 ص',
    type: 'In-Person',
    serviceType: 'التقاضي والتحكيم',
    consultationTopic: 'نزاع عقاري',
    details: 'مراجعة عقد إيجار تجاري والنزاع القائم مع المؤجر.',
    status: 'Confirmed'
  },
];

export const IconMap: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Briefcase: <Briefcase className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Landmark: <Landmark className="w-8 h-8" />,
  Gavel: <Gavel className="w-8 h-8" />,
};

// Initial Employees Data
export const INITIAL_EMPLOYEES: Employee[] = [
  { id: '1', name: 'أحمد Mohammed', email: 'ahmed@justicefirm.sa', role: 'محامي أول', status: 'Active' },
  { id: '2', name: 'سارة Ali', email: 'sara@justicefirm.sa', role: 'مستشار قانوني', status: 'Active' },
  { id: '3', name: 'خالد Omar', email: 'khaled@justicefirm.sa', role: 'مساعد قانوني', status: 'Inactive' },
];
