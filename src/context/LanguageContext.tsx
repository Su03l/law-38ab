import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Embedded translations to avoid import issues
const translations: Record<string, any> = {
    ar: {
        dir: 'rtl',
        navbar: {
            home: 'الرئيسية',
            about: 'من نحن',
            practiceAreas: 'خدماتنا',
            blog: 'آفاق قانونية',
            packages: 'باقات الخدمات',
            contact: 'للتواصل معنا',
            adminPortal: 'بوابة المسئول',
            bookConsultation: 'احجز استشارتك',
            bookConsultationNow: 'احجز استشارتك الآن',
            companyName: 'شركة عقاب السحيمي',
            companySubtitle: 'للمحاماة والاستشارات والتحكيم والتوثيق',
            langToggle: 'EN',
        },
        hero: {
            badge: 'شركة عقاب السحيمي للمحاماة والاستشارات والتحكيم والتوثيق',
            title1: 'عدالة',
            titleHighlight: 'راسخة',
            title2: 'وحماية قانونية شاملة.',
            subtitle: 'نحن لا نمثلك قانونياً فحسب، بل نحن شركاؤك في النجاح وحماية مصالحك بأعلى معايير النزاهة والاحترافية العالمية في قلب المملكة.',
            cta1: 'احجز استشارتك الآن',
            cta2: 'تعرف علينا',
            partnersLabel: 'شركاء نجاحنا',
        },
        successModal: {
            title: 'تم استلام طلبك!',
            message: 'شكراً لثقتك بشركة عقاب السحيمي. سيقوم أحد مستشارينا بالتواصل معك خلال 24 ساعة لتأكيد موعدك.',
            close: 'إغلاق',
        },
        about: {
            sectionTitle: 'من نحن',
            description: 'شركة محاماة تتمتع بخبرة واسعة في مجال تقديم استشارات قانونية متخصصة ومتكاملة وحلول قانونية مبتكرة، نقدم مجموعة شاملة من الخدمات القانونية تشمل استشارات قانونية متخصصة سواءً لأفراد أو شركات في مختلف القضايا والمشكلات القانونية، وتقديم العون للشركات المحلية والدولية في استخراج السجلات والرخص وجميع الخدمات الأخرى.',
            founderTitle: 'عن المؤسس',
            founderBio: 'المحامي عقاب مسفر زكي الحربي، مستشار قانوني ومحكّم. يحمل درجة البكالوريوس في الشريعة من الجامعة الإسلامية ودرجة الماجستير في "الدعوة والحسبة" من جامعة الإمام محمد بن سعود الإسلامية. خلال مسيرته المهنية، شغل عدة مناصب بارزة، منها محامي إمارة المدينة المنورة حيث مثّل الإمارة أمام المحاكم الإدارية والعامة. كما شغل منصب مدير إدارة الحقوق الفردية والعامة وإدارة المستشارين القانونيين في الإمارة. وهو عضو مميز في هيئة التحكيم السعودية ومحكّم في القضايا الجنائية والتجارية. تميّز بالحصول على تدريب مكثف في مختلف مجالات القانون، بما في ذلك إجراءات التقاضي والتحقيق وتطوير المهارات القانونية وصياغة العقود والتخطيط الاستراتيجي.',
            readMore: 'اقرأ المزيد عن تاريخنا',
            closeModal: 'إغلاق النافذة',
            stat1Label: '50M+ ريال',
            stat1Sub: 'تم تحصيلها للعملاء',
            stat2Label: '98%',
            stat2Sub: 'نسبة نجاح القضايا',
            stat3Label: '15+',
            stat3Sub: 'عاماً من الخبرة',
        },
        goals: {
            sectionTitle: 'أهدافنا',
            description: 'تقديم خدمات قانونية تحقق أعلى المعايير، لضمان رضا العملاء واحتياجاتهم المتنوعة، والسعي لتحقيق أفضل النتائج في القضايا الموكلة إلينا، من خلال استراتيجيات قانونية فعالة وفهم عميق للقوانين والأنظمة، وتعزيز التوعية القانونية ونشر الوعي والمعرفة القانونية بين أفراد المجتمع.',
        },
        values: {
            sectionTitle: 'قيمنا',
            responsibility: {
                title: 'المسؤولية',
                description: 'أننا نؤمن بالمسؤولية كاملة اتجاه عملائنا والتواصل معهم باستمرارية وتزويدهم بالتحديثات.',
            },
            innovation: {
                title: 'الابتكار',
                description: 'أننا نسعى دائماً للابتكار وتبني أفكار جديدة لفريقنا وتقديم الحلول الفعالة والغير تقليدية لعملائنا.',
            },
            professionalism: {
                title: 'المهنية',
                description: 'أننا نلتزم بالنزاهة والأخلاق والامتثال لأخلاقيات العمل والالتزام بالمواعيد النهائية لاكتساب ثقة العملاء.',
            },
        },
        services: {
            sectionTitle: 'خدماتنا',
            subtitle: 'خبرات قانونية متكاملة تغطي كافة احتياجاتك التجارية والشخصية.',
            items: [
                {
                    title: 'الاستشارات القانونية',
                    description: 'تقديم استشارات قانونية متخصصة تهدف إلى تحقيق مصالح العملاء من خلال التطبيق الأمثل للقوانين. إعداد الدراسات القانونية لتوضيح الجوانب المختلفة.',
                },
                {
                    title: 'التمثيل القانوني',
                    description: 'تمثيل العملاء أمام الجهات القضائية.',
                },
                {
                    title: 'العقود',
                    description: 'صياغة وإعداد وتدقيق كافة أنواع العقود بدقة واحترافية عالية.',
                },
                {
                    title: 'مجال التنفيذ',
                    description: 'رفع ومتابعة طلبات التنفيذ أمام محاكم التنفيذ.',
                },
                {
                    title: 'تحصيل الديون',
                    description: 'التواصل الفعال مع المدينين وتحصيل الديون المعلقة بالطرق الودية دون الرجوع إلى الطرق القضائية.',
                },
                {
                    title: 'الشركات',
                    description: 'إعداد وتعديل اللوائح الداخلية ومتابعة جميع الإجراءات اللازمة لتأسيس الشركات لدى وزارة التجارة.',
                },
                {
                    title: 'الاستثمار الأجنبي',
                    description: 'تقديم خدمات دعم المستثمرين، بما في ذلك إصدار التراخيص وتأسيس المنشآت.',
                },
                {
                    title: 'خدمات العقارات',
                    description: 'جدولة القروض والمطالبات لضمان استقرار العملاء. توفير حلول قانونية شاملة في مجال العقارات.',
                },
                {
                    title: 'حل النزاعات والتحكيم',
                    description: 'تقديم حلول تحكيم عادلة وسريعة لضمان حقوق جميع الأطراف.',
                },
            ],
        },
        contact: {
            sectionTitle: 'للتواصل معنا',
            subtitle: 'نحن هنا للإجابة على استفساراتكم وتقديم الدعم القانوني الذي تحتاجونه.',
            mainAddress: 'العنوان الرئيسي',
            madinahAddress: 'المدينة المنورة\nشارع الملك عبدالله الفرعي\n(مقابل الراشد مول)',
            riyadhAddress: 'الرياض\nطريق الملك عبدالعزيز\nمجمع ألوان سنتر',
            callUs: 'اتصل بنا',
            email: 'البريد الإلكتروني',
            workHours: 'ساعات العمل',
            workSchedule: 'الأحد - الخميس: 10:00 ص - 4:00 م',
            weekend: 'الجمعة - السبت: مغلق',
            sendMessage: 'أرسل رسالة فورية',
            fullName: 'الاسم الكامل',
            namePlaceholder: 'الاسم',
            emailLabel: 'البريد الإلكتروني',
            emailPlaceholder: 'example@mail.com',
            messageLabel: 'الرسالة',
            messagePlaceholder: 'اكتب استفسارك هنا...',
            send: 'إرسال الرسالة',
            modal: {
                title: 'عذراً، لم يتم الإرسال',
                desc: 'نواجه حالياً مشكلة تقنية في إرسال الرسائل عبر الموقع. يرجى التواصل معنا مباشرة عبر واتساب لخدمتك بشكل أسرع.',
                whatsapp: 'تواصل عبر واتساب',
                close: 'إغلاق',
            },
        },
        footer: {
            companyDesc: 'نحن نقدم حلولاً قانونية استثنائية لأكثر القضايا تعقيداً في المملكة العربية السعودية.',
            quickLinks: 'روابط سريعة',
            contactUs: 'تواصل معنا',
            followUs: 'تابعنا',
            newsletter: 'النشرة البريدية',
            newsletterDesc: 'اشترك ليصلك جديد الأنظمة واللوائح القانونية في المملكة.',
            subscribe: 'اشترك',
            emailPlaceholder: 'بريدك الإلكتروني',
            copyright: 'جميع الحقوق محفوظة © 2024 شركة عقاب السحيمي للمحاماة والاستشارات والتحكيم والتوثيق.',
            home: 'الرئيسية',
            aboutLink: 'عن المكتب',
            areasLink: 'مجالات الاختصاص',
            blogLink: 'المدونة القانونية',
        },
        blog: {
            sectionTitle: 'آفاق قانونية',
            subtitle: 'تحليلات معمقة ورؤى قانونية من نخبة خبرائنا القانونيين.',
            readArticle: 'اقرأ المقال',
            readingTime: '5 دقائق قراءة',
            introTitle: 'مقدمة في أهمية هذا التحديث القانوني:',
            closeModal: 'إغلاق النافذة',
        },
        packages: {
            sectionTitle: 'باقات الخدمات السنوية',
            subtitle: 'حلول قانونية متكاملة مصممة خصيصاً لتلبية احتياجات أعمالك بكفاءة ومهنية.',
            period: 'شهرياً',
            currency: 'ريال',
            subscribe: 'اشترك الآن',
            modal: {
                title: 'تأكيد الاشتراك',
                desc: 'سيتم تحويلك الآن إلى تطبيق واتساب لاستكمال إجراءات الاشتراك في الباقة المختارة. هل أنت متأكد؟',
                confirm: 'تأكيد ومتابعة',
                cancel: 'إلغاء'
            },
            contactForCustom: 'تواصل لباقة مخصصة',
            tiers: [
                {
                    title: 'باقة الخدمات العمالية',
                    price: '3,500',
                    features: [
                        '10 استشارات عمالية شهرياً',
                        '3 مراجعات موارد بشرية',
                        '2 خطابات قانونية',
                        '4 قضايا عمالية (تمثيل)',
                        '6 صياغة مستندات عمالية',
                        'خصم 5% على الخدمات الأخرى'
                    ]
                },
                {
                    title: 'الشركات الناشئة (الأساسية)',
                    price: '4,300',
                    features: [
                        '3 استشارات مكتوبة شهرياً',
                        'استشارات هاتفية',
                        '8 خطابات للعملاء',
                        'قضيتين (أقل من 50 ألف)',
                        '2 اتفاقيات شهرياً',
                        '2 تحقيق إداري وعمالي',
                        'إعداد اللوائح والمذكرات (2)',
                        'خصم 10% على الخدمات الأخرى'
                    ]
                },
                {
                    title: 'الشركات الناشئة (البرونزية)',
                    price: '5,000',
                    features: [
                        '6 استشارات مكتوبة شهرياً',
                        '18 خطاب للعملاء',
                        'قضيتين (أقل من 100 ألف)',
                        '3 اتفاقيات شهرياً',
                        '5 تحقيق إداري وعمالي',
                        '4 لوائح واعتراضات',
                        'خصم 10% على الخدمات الأخرى'
                    ]
                },
                {
                    title: 'الشركات المتوسطة (الفضية)',
                    price: '7,500',
                    features: [
                        '6 استشارات مكتوبة شهرياً',
                        '20 خطاب للعملاء',
                        'قضيتين (أقل من 100 ألف)',
                        '7 اتفاقيات سنوياً',
                        '5 تحقيق إداري وعمالي',
                        '6 لوائح واعتراضات',
                        'خصم 10% على الخدمات الأخرى'
                    ]
                },
                {
                    title: 'الشركات المتوسطة (الذهبية)',
                    price: '11,000',
                    features: [
                        '20 استشارة مكتوبة شهرياً',
                        'استشارات هاتفية لا محدودة',
                        '2 تأسيس شركات',
                        '10 خطابات شهرياً',
                        '3 حوكمة شركات',
                        '2 عقود أجنبية',
                        '10 قضايا (تمثيل)',
                        '10 لوائح ومذكرات',
                        '10 تنفيذ أحكام',
                        '20 صياغة عقود',
                        '5 تراخيص & 5 اجتماعات',
                        'خصم 20% على الخدمات الأخرى'
                    ]
                },
                {
                    title: 'الشركات الكبرى (الماسية)',
                    price: '13,000',
                    features: [
                        'استشارات لا محدودة',
                        'تأسيس واندماج شركات',
                        '5 عقود تأسيس',
                        '15 خطاب شهرياً',
                        '6 حوكمة شركات',
                        '4 عقود أجنبية',
                        '16 قضية (أقل من 500 ألف)',
                        '10 لوائح ومذكرات',
                        '15 تنفيذ أحكام',
                        '25 صياغة عقود',
                        '5 تراخيص & 15 اجتماع',
                        'خصم 20% على الخدمات الأخرى'
                    ]
                }
            ],
            flexible: {
                title: 'للاشتراك وطلب الباقات',
                desc: 'يسعدنا جداً تواصلكم معنا لتحديد الباقة الأنسب لاحتياجاتكم.',
                cta: 'تواصل معنا: 0553300581',
                subCta: 'أو عبر الواتساب مباشرة'
            }
        },
        booking: {
            pageTitle: 'حجز موعد استشارة',
            title: 'ابدأ رحلتك القانونية',
            subtitle: 'الخطوة الأولى نحو حماية حقوقك تبدأ من هنا.',
            desc: 'احجز استشارتك القانونية\nنسعد بتقديم الدعم القانوني اللازم لك ولأعمالك عبر فريقنا المتخصص.',
            steps: {
                1: 'الموعد والنوع',
                2: 'البيانات الشخصية',
                3: 'التأكيد النهائي',
            },
            stepStatus: {
                1: 'جاري الاختيار...',
                2: 'جاري الإدخال...',
                3: 'المرحلة الأخيرة',
            },
            step1: {
                title: '١. اختيار الموعد المناسب',
                subtitle: 'يرجى تحديد التاريخ والوقت المفضل لاستشارتك.',
                dateLabel: 'تاريخ الاستشارة',
                timeLabel: 'الوقت المتاح',
                moreSlots: 'عرض بقية المواعيد المتاحة...',
                typeLabel: 'نوع الحضور',
                inPerson: 'حضور شخصي',
                online: 'عن بعد (أونلاين)',
                next: 'المتابعة للبيانات'
            },
            step2: {
                title: '٢. البيانات الشخصية',
                subtitle: 'يرجى إدخال معلومات التواصل الخاصة بك.',
                nameLabel: 'الاسم الكامل',
                namePlaceholder: 'الاسم الثلاثي',
                phoneLabel: 'رقم الجوال',
                emailLabel: 'البريد الإلكتروني',
                serviceTypeLabel: 'نوع الاستشارة',
                serviceTypePlaceholder: 'اختر نوع الاستشارة...',
                topicLabel: 'موضوع الاستشارة',
                topicPlaceholder: 'مثال: تأسيس شركة، نزاع تجاري...',
                notesLabel: 'ملاحظات إضافية (اختياري)',
                notesPlaceholder: 'نبذة مختصرة عن موضوع الاستشارة...',
                back: 'عودة للخلف',
                next: 'مراجعة وتأكيد',
                serviceTypes: {
                    general: 'استشارة عامة',
                    commercial: 'قضايا تجارية',
                    labor: 'قضايا عمالية',
                    criminal: 'قضايا جنائية',
                    personal: 'قضايا أحوال شخصية',
                    contracts: 'صياغة عقود',
                    other: 'أخرى'
                }
            },
            step3: {
                title: '3. التأكيد النهائي',
                subtitle: 'يرجى مراجعة تفاصيل الحجز قبل الاعتماد.',
                dateLabel: 'الموعد المحدد',
                typeLabel: 'نوع الاستشارة',
                clientLabel: 'صاحب الطلب',
                fieldLabel: 'مجال الاستشارة',
                topicLabel: 'الموضوع',
                agreement: 'بالضغط على تأكيد الحجز، فإنك توافق على سياسة الخصوصية وشروط الخدمة الخاصة بشركة عقاب السحيمي للمحاماة.',
                back: 'تعديل البيانات',
                confirm: 'تأكيد الحجز',
                processing: 'جاري المعالجة...'
            }
        },
    },
    en: {
        dir: 'ltr',
        navbar: {
            home: 'Home',
            about: 'Who We Are',
            practiceAreas: 'Our Services',
            blog: 'Legal Insights',
            packages: 'Service Packages',
            contact: 'Contact Us',
            adminPortal: 'Admin Portal',
            bookConsultation: 'Book Consultation',
            bookConsultationNow: 'Book Consultation Now',
            companyName: 'Oqab Al-Suhaimi',
            companySubtitle: 'Law, Consulting, Arbitration & Notarization',
            langToggle: 'عربي',
        },
        hero: {
            badge: 'Oqab Al-Suhaimi Law, Consulting, Arbitration & Notarization',
            title1: 'Solid',
            titleHighlight: 'Justice',
            title2: 'and Comprehensive Legal Protection.',
            subtitle: 'We don\'t just represent you legally — we are your partners in success, protecting your interests with the highest standards of integrity and international professionalism in the heart of the Kingdom.',
            cta1: 'Book Your Consultation Now',
            cta2: 'Learn About Us',
            partnersLabel: 'Our Success Partners',
        },
        successModal: {
            title: 'Request Received!',
            message: 'Thank you for your trust in Oqab Al-Suhaimi. One of our consultants will contact you within 24 hours to confirm your appointment.',
            close: 'Close',
        },
        about: {
            sectionTitle: 'Who We Are',
            description: 'A law company with extensive experience in the field, providing specialized and comprehensive legal consultations and innovative legal solutions. We offer a wide range of legal services, including specialized legal consultations for individuals and companies in various legal matters and issues. Additionally, we assist local and international companies in obtaining records, licenses, and all other related services.',
            founderTitle: 'About the Founder',
            founderBio: 'Lawyer Oqab Mesfer Zaki Al-Harbi, legal consultant, and arbitrator. Holds a Bachelor\'s degree in Sharia from the Islamic University and a Master\'s degree in "Dawah and Hisbah" from Imam Mohammad Ibn Saud Islamic University. Throughout his career, he has held several prominent positions, including serving as the attorney for the Emirate of Al-Madinah Al-Munawwarah, where he represented the Emirate in administrative and general courts. He also served as the Director of the Department of Individual and Public Rights and the Department of Legal Advisors in the Emirate. Additionally, he is a distinguished member of the Saudi Arbitration Committee and an arbitrator in criminal and commercial cases. He has distinguished himself by obtaining extensive training in various fields of law, including litigation procedures, investigation, legal skills development, contract drafting, and strategic planning.',
            readMore: 'Read More About Our History',
            closeModal: 'Close',
            stat1Label: '50M+ SAR',
            stat1Sub: 'Collected for Clients',
            stat2Label: '98%',
            stat2Sub: 'Case Success Rate',
            stat3Label: '15+',
            stat3Sub: 'Years of Experience',
        },
        goals: {
            sectionTitle: 'Our Goals',
            description: 'Providing legal services that meet the highest standards to ensure client satisfaction and achieve their needs. We strive to achieve the best outcomes in the cases entrusted to us through effective legal strategies and a deep understanding of laws and regulations. Additionally, we are committed to promoting legal awareness and spreading legal knowledge among members of society.',
        },
        values: {
            sectionTitle: 'Our Values',
            responsibility: {
                title: 'Responsibility',
                description: 'We take full responsibility for our clients by maintaining constant communication and providing regular updates.',
            },
            innovation: {
                title: 'Innovation',
                description: 'We strive for innovation by adopting new ideas and providing our clients with effective, unconventional solutions.',
            },
            professionalism: {
                title: 'Professionalism',
                description: 'We uphold integrity, ethics, professionalism, and timely delivery to earn our clients\' trust.',
            },
        },
        services: {
            sectionTitle: 'Our Services',
            subtitle: 'Comprehensive legal expertise covering all your commercial and personal needs.',
            items: [
                {
                    title: 'Legal Consultations',
                    description: 'Providing specialized legal consultations aimed at achieving clients\' interests through the optimal application of laws. Preparing legal studies to clarify various aspects.',
                },
                {
                    title: 'Legal Representation',
                    description: 'Representing clients before judicial authorities and quasi-judicial committees to ensure their rights.',
                },
                {
                    title: 'Contracts',
                    description: 'Drafting, preparing, and reviewing all types of contracts with high accuracy and professionalism.',
                },
                {
                    title: 'Execution',
                    description: 'Filing and following up on execution requests before execution courts.',
                },
                {
                    title: 'Debt Collection',
                    description: 'Communication with debtors and the collection of outstanding debts through amicable means without resorting to legal proceedings.',
                },
                {
                    title: 'Corporate Services',
                    description: 'Preparing and amending internal regulations and following up on all procedures required to establish companies with the Ministry of Commerce.',
                },
                {
                    title: 'Foreign Investment',
                    description: 'Providing investor support services, including issuing licenses and establishing entities.',
                },
                {
                    title: 'Real Estate Services',
                    description: 'Scheduling loans and claims to ensure clients\' stability. Providing comprehensive legal solutions in the real estate field.',
                },
                {
                    title: 'Dispute Resolution / Arbitration',
                    description: 'Offering fair and swift arbitration solutions to ensure the rights of all parties.',
                },
            ],
        },
        contact: {
            sectionTitle: 'Contact Us',
            subtitle: 'We are here to answer your inquiries and provide the legal support you need.',
            mainAddress: 'Main Address',
            madinahAddress: 'Al-Madinah Al-Munawwarah\nKing Abdullah Branch Road\n(Opposite Al-Rashid Mall)',
            riyadhAddress: 'Riyadh\nKing Abdulaziz Road\nAlwan Center Complex',
            callUs: 'Call Us',
            email: 'Email',
            workHours: 'Working Hours',
            workSchedule: 'Sun - Thu: 10:00 AM - 4:00 PM',
            weekend: 'Fri - Sat: Closed',
            sendMessage: 'Send a Quick Message',
            fullName: 'Full Name',
            namePlaceholder: 'Your Name',
            emailLabel: 'Email Address',
            emailPlaceholder: 'example@mail.com',
            messageLabel: 'Message',
            messagePlaceholder: 'Write your inquiry here...',
            send: 'Send Message',
            modal: {
                title: 'Sorry, Message Not Sent',
                desc: 'We are currently facing a technical issue sending messages through the website. Please contact us directly via WhatsApp for faster service.',
                whatsapp: 'Contact via WhatsApp',
                close: 'Close',
            },
        },
        footer: {
            companyDesc: 'We provide exceptional legal solutions for the most complex cases in the Kingdom of Saudi Arabia.',
            quickLinks: 'Quick Links',
            contactUs: 'Contact Us',
            followUs: 'Follow Us',
            newsletter: 'Newsletter',
            newsletterDesc: 'Subscribe to receive the latest legal regulations and updates in the Kingdom.',
            subscribe: 'Subscribe',
            emailPlaceholder: 'Your email',
            copyright: 'All rights reserved © 2024 Oqab Al-Suhaimi Law, Consulting, Arbitration & Notarization.',
            home: 'Home',
            aboutLink: 'About Us',
            areasLink: 'Practice Areas',
            blogLink: 'Legal Blog',
        },
        blog: {
            sectionTitle: 'Legal Insights',
            subtitle: 'In-depth analysis and legal perspectives from our top legal experts.',
            readArticle: 'Read Article',
            readingTime: '5 min read',
            introTitle: 'Introduction to this legal update:',
            closeModal: 'Close',
        },
        packages: {
            sectionTitle: 'Annual Service Packages',
            subtitle: 'Comprehensive legal solutions designed to meet your business needs effectively.',
            period: 'Monthly',
            currency: 'SAR',
            subscribe: 'Subscribe Now',
            modal: {
                title: 'Confirm Subscription',
                desc: 'You will be redirected to WhatsApp to complete your subscription for the selected package. Are you sure?',
                confirm: 'Confirm & Continue',
                cancel: 'Cancel'
            },
            contactForCustom: 'Contact for Custom Package',
            tiers: [
                {
                    title: 'Labor Services Package',
                    price: '3,500',
                    features: [
                        '10 Labor Consultations/mo',
                        '3 HR Reviews',
                        '2 Legal Letters',
                        '4 Labor Cases (Representation)',
                        '6 Document Drafting',
                        '5% Discount on other services'
                    ]
                },
                {
                    title: 'Startup (Basic)',
                    price: '4,300',
                    features: [
                        '3 Written Consultations/mo',
                        'Phone Consultations',
                        '8 Client Letters',
                        '2 Cases (<50k SAR)',
                        '2 Agreements/mo',
                        '2 Administrative Investigations',
                        '2 Regulations Drafting',
                        '10% Discount on other services'
                    ]
                },
                {
                    title: 'Startup (Bronze)',
                    price: '5,000',
                    features: [
                        '6 Written Consultations/mo',
                        'Phone Consultations',
                        '18 Client Letters',
                        '2 Cases (<100k SAR)',
                        '3 Agreements/mo',
                        '5 Administrative Investigations',
                        '4 Regulations Drafting',
                        '10% Discount on other services'
                    ]
                },
                {
                    title: 'Medium Companies (Silver)',
                    price: '7,500',
                    features: [
                        '6 Written Consultations/mo',
                        '20 Client Letters',
                        '2 Cases (<100k SAR)',
                        '7 Agreements/yr',
                        '5 Administrative Investigations',
                        '6 Regulations Drafting',
                        '10% Discount on other services'
                    ]
                },
                {
                    title: 'Medium Companies (Gold)',
                    price: '11,000',
                    features: [
                        '20 Written Consultations/mo',
                        'Unlimited Phone Consults',
                        '2 Company Formations',
                        '10 Letters/mo',
                        '3 Corporate Governance',
                        '2 Foreign Contracts',
                        '10 Cases (Representation)',
                        '10 Regulations',
                        '10 Execution Requests',
                        '20 Contract Drafting',
                        '5 Licenses & 5 Meetings',
                        '20% Discount on other services'
                    ]
                },
                {
                    title: 'Large Companies (Diamond)',
                    price: '13,000',
                    features: [
                        'Unlimited Consultations',
                        'Mergers & Acquisitions',
                        '5 Company Formations',
                        '15 Letters/mo',
                        '6 Corporate Governance',
                        '4 Foreign Contracts',
                        '16 Cases (<500k SAR)',
                        '10 Regulations',
                        '15 Execution Requests',
                        '25 Contract Drafting',
                        '5 Licenses & 15 Meetings',
                        '20% Discount on other services'
                    ]
                }
            ],
            flexible: {
                title: 'Subscription & Inquiries',
                desc: 'We are happy to assist you in choosing the best package for your needs.',
                cta: 'Call Us: 0553300581',
                subCta: 'Or via WhatsApp'
            }
        },
        booking: {
            pageTitle: 'Book Consultation',
            title: 'Start Your Legal Journey',
            subtitle: 'The first step towards protecting your rights starts here.',
            desc: 'Book Your Legal Consultation\nWe are happy to provide the necessary legal support for you and your business through our specialized team.',
            steps: {
                1: 'Date & Type',
                2: 'Personal Info',
                3: 'Final Confirmation',
            },
            stepStatus: {
                1: 'Selecting...',
                2: 'Entering Info...',
                3: 'Final Step',
            },
            step1: {
                title: '1. Select Appointment',
                subtitle: 'Please select your preferred date and time for consultation.',
                dateLabel: 'Consultation Date',
                timeLabel: 'Available Time',
                moreSlots: 'Show more slots...',
                typeLabel: 'Attendance Type',
                inPerson: 'In-Person',
                online: 'Remote (Online)',
                next: 'Continue to Info'
            },
            step2: {
                title: '2. Personal Information',
                subtitle: 'Please enter your contact information.',
                nameLabel: 'Full Name',
                namePlaceholder: 'Full Name',
                phoneLabel: 'Mobile Number',
                emailLabel: 'Email Address',
                serviceTypeLabel: 'Consultation Type',
                serviceTypePlaceholder: 'Select type...',
                topicLabel: 'Consultation Topic',
                topicPlaceholder: 'Ex: Company formation, Commercial dispute...',
                notesLabel: 'Additional Notes (Optional)',
                notesPlaceholder: 'Brief description of the consultation topic...',
                back: 'Back',
                next: 'Review & Confirm',
                serviceTypes: {
                    general: 'General Consultation',
                    commercial: 'Commercial Cases',
                    labor: 'Labor Cases',
                    criminal: 'Criminal Cases',
                    personal: 'Personal Status',
                    contracts: 'Contract Drafting',
                    other: 'Other'
                }
            },
            step3: {
                title: '3. Final Confirmation',
                subtitle: 'Please review booking details before confirming.',
                dateLabel: 'Selected Date',
                typeLabel: 'Consultation Type',
                clientLabel: 'Client Name',
                fieldLabel: 'Field',
                topicLabel: 'Topic',
                agreement: 'By clicking Confirm Booking, you agree to Oqab Al-Suhaimi Law Firm\'s Privacy Policy and Terms of Service.',
                back: 'Edit Info',
                confirm: 'Confirm Booking',
                processing: 'Processing...'
            }
        },
    },
};

type Lang = 'ar' | 'en';

interface LanguageContextType {
    lang: Lang;
    toggleLang: () => void;
    t: (key: string) => string;
    isAr: boolean;
    translations: typeof translations.ar;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: 'ar',
    toggleLang: () => { },
    t: (key: string) => key,
    isAr: true,
    translations: translations.ar,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Lang>('ar');

    const toggleLang = useCallback(() => {
        setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
    }, []);

    const t = useCallback((key: string): string => {
        const keys = key.split('.');
        let value: any = translations[lang];
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // fallback to key if not found
            }
        }
        return typeof value === 'string' ? value : key;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t, isAr: lang === 'ar', translations: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
