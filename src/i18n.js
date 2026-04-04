import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      teams: 'Teams',
      login: 'Login',
      register: 'Register'
    },

    home: {
      hero: {
        title: 'National Talent Innovation',
        description: 'Connecting students, mentors, companies, and innovative projects in one collaborative ecosystem.',
        projectsButton: 'Explore Projects',
        teamsButton: 'View Teams'
      },
      about: {
        title: 'About NTI',
        text: 'NTI is a platform designed to support collaboration between students, mentors, and companies. It helps students work in teams, join real projects, develop professional skills, and gain experience in a practical environment.'
      },
      mission: {
        title: 'Our Mission',
        text: 'Our mission is to create opportunities for students to participate in innovative projects, cooperate with companies, and receive support from experienced mentors.'
      },
      pillars: {
        title: 'Our Pillars',
        items: {
          education: {
            title: 'Education',
            text: 'Supporting student development through practical learning and teamwork.'
          },
          innovation: {
            title: 'Innovation',
            text: 'Encouraging new ideas and real project solutions for modern challenges.'
          },
          collaboration: {
            title: 'Collaboration',
            text: 'Connecting universities, companies, mentors, and student teams.'
          }
        }
      },
      ecosystem: {
        title: 'Ecosystem',
        items: {
          students: {
            title: 'Students',
            text: 'Form teams, join projects, and build their experience.'
          },
          companies: {
            title: 'Companies',
            text: 'Offer projects and collaborate with student teams.'
          },
          mentors: {
            title: 'Mentors',
            text: 'Guide students and support their professional growth.'
          },
          administration: {
            title: 'Administration',
            text: 'Manage approvals, cooperation, and platform activities.'
          }
        }
      },
      partners: {
        title: 'Partners',
        items: {
          partner1: {
            name: 'TechCorp',
            text: 'Industry partner focused on software innovation.'
          },
          partner2: {
            name: 'Smart Solutions',
            text: 'Supporting student collaboration and development.'
          },
          partner3: {
            name: 'Digital Future',
            text: 'Helping connect education with business practice.'
          },
          partner4: {
            name: 'InnovateLab',
            text: 'Partner for research and digital transformation.'
          }
        }
      },
      mentors: {
        title: 'Mentors',
        items: {
          mentor1: 'Software Engineering',
          mentor2: 'AI and Data Science',
          mentor3: 'Project Management'
        }
      },
      references: {
        title: 'References',
        items: {
          reference1: {
            text: 'This platform gave our team real project experience.',
            author: 'Student Team Alpha'
          },
          reference2: {
            text: 'A great opportunity to connect students with real business needs.',
            author: 'TechCorp'
          },
          reference3: {
            text: 'Mentoring students through practical work is highly rewarding.',
            author: 'Mentor Network'
          }
        }
      },
      successfulProjects: {
        title: 'Successful Projects',
        items: {
          project1: {
            title: 'AI Task Manager',
            text: 'A smart productivity tool developed by student teams.',
            status: 'Completed'
          },
          project2: {
            title: 'Student Collaboration Platform',
            text: 'A digital workspace for communication and teamwork.',
            status: 'Successful'
          },
          project3: {
            title: 'Project Matching System',
            text: 'A tool for connecting students to suitable projects.',
            status: 'Delivered'
          }
        }
      },
      news: {
        title: 'Latest News',
        items: {
          news1: {
            title: 'New Call for Student Teams',
            text: 'Applications are now open for the next innovation cycle.',
            date: 'April 2026'
          },
          news2: {
            title: 'New Industry Partners Joined',
            text: 'Several companies joined the NTI ecosystem this month.',
            date: 'March 2026'
          },
          news3: {
            title: 'Mentor Program Expanded',
            text: 'More mentors are now available for incoming teams.',
            date: 'March 2026'
          }
        }
      },
      faq: {
        title: 'FAQ',
        items: {
          faq1: {
            question: 'Who can join NTI?',
            answer: 'Students, companies, mentors, and administrators can participate based on their role.'
          },
          faq2: {
            question: 'Can students work alone?',
            answer: 'No, students are expected to work in teams.'
          },
          faq3: {
            question: 'Can companies create projects?',
            answer: 'Yes, companies can submit and manage project opportunities.'
          }
        }
      },
      keyDates: {
        title: 'Call Calendar / Key Dates',
        items: {
          date1: {
            date: 'May 10, 2026',
            title: 'Registration Deadline',
            text: 'Last day for student and mentor registration.'
          },
          date2: {
            date: 'May 20, 2026',
            title: 'Project Applications Open',
            text: 'Teams can start applying for available projects.'
          },
          date3: {
            date: 'June 1, 2026',
            title: 'Selection Process',
            text: 'Evaluation of teams and project applications begins.'
          },
          date4: {
            date: 'June 15, 2026',
            title: 'Project Kick-off',
            text: 'Approved teams officially begin their projects.'
          }
        }
      },
      language: {
        title: 'Language Support',
        text: 'This platform is prepared for bilingual support with Slovak and English content.'
      }
    }
  },

  sk: {
    nav: {
      home: 'Domov',
      projects: 'Projekty',
      teams: 'Tímy',
      login: 'Prihlásenie',
      register: 'Registrácia'
    },

    home: {
      hero: {
        title: 'Národná talentová inovácia',
        description: 'Prepájame študentov, mentorov, firmy a inovatívne projekty v jednom spolupracujúcom ekosystéme.',
        projectsButton: 'Preskúmať projekty',
        teamsButton: 'Zobraziť tímy'
      },
      about: {
        title: 'O NTI',
        text: 'NTI je platforma navrhnutá na podporu spolupráce medzi študentmi, mentormi a firmami. Pomáha študentom pracovať v tímoch, zapájať sa do reálnych projektov, rozvíjať profesionálne zručnosti a získavať praktické skúsenosti.'
      },
      mission: {
        title: 'Naša misia',
        text: 'Našou misiou je vytvárať príležitosti pre študentov zapájať sa do inovatívnych projektov, spolupracovať s firmami a získavať podporu od skúsených mentorov.'
      },
      pillars: {
        title: 'Naše piliere',
        items: {
          education: {
            title: 'Vzdelávanie',
            text: 'Podpora rozvoja študentov prostredníctvom praktického učenia a tímovej práce.'
          },
          innovation: {
            title: 'Inovácie',
            text: 'Podpora nových nápadov a reálnych projektových riešení pre moderné výzvy.'
          },
          collaboration: {
            title: 'Spolupráca',
            text: 'Prepájanie univerzít, firiem, mentorov a študentských tímov.'
          }
        }
      },
      ecosystem: {
        title: 'Ekosystém',
        items: {
          students: {
            title: 'Študenti',
            text: 'Tvoria tímy, zapájajú sa do projektov a budujú si skúsenosti.'
          },
          companies: {
            title: 'Firmy',
            text: 'Ponúkajú projekty a spolupracujú so študentskými tímami.'
          },
          mentors: {
            title: 'Mentori',
            text: 'Vedú študentov a podporujú ich profesijný rast.'
          },
          administration: {
            title: 'Administrácia',
            text: 'Riadi schvaľovanie, spoluprácu a aktivity platformy.'
          }
        }
      },
      partners: {
        title: 'Partneri',
        items: {
          partner1: {
            name: 'TechCorp',
            text: 'Priemyselný partner zameraný na softvérové inovácie.'
          },
          partner2: {
            name: 'Smart Solutions',
            text: 'Podpora študentskej spolupráce a rozvoja.'
          },
          partner3: {
            name: 'Digital Future',
            text: 'Prepája vzdelávanie s firemnou praxou.'
          },
          partner4: {
            name: 'InnovateLab',
            text: 'Partner pre výskum a digitálnu transformáciu.'
          }
        }
      },
      mentors: {
        title: 'Mentori',
        items: {
          mentor1: 'Softvérové inžinierstvo',
          mentor2: 'Umelá inteligencia a dátová veda',
          mentor3: 'Projektový manažment'
        }
      },
      references: {
        title: 'Referencie',
        items: {
          reference1: {
            text: 'Táto platforma dala nášmu tímu reálnu projektovú skúsenosť.',
            author: 'Študentský tím Alpha'
          },
          reference2: {
            text: 'Skvelá príležitosť prepojiť študentov s reálnymi potrebami biznisu.',
            author: 'TechCorp'
          },
          reference3: {
            text: 'Mentorovanie študentov cez praktickú prácu je veľmi obohacujúce.',
            author: 'Mentorská sieť'
          }
        }
      },
      successfulProjects: {
        title: 'Úspešné projekty',
        items: {
          project1: {
            title: 'AI Task Manager',
            text: 'Inteligentný nástroj na produktivitu vyvinutý študentskými tímami.',
            status: 'Dokončený'
          },
          project2: {
            title: 'Platforma pre študentskú spoluprácu',
            text: 'Digitálny priestor na komunikáciu a tímovú prácu.',
            status: 'Úspešný'
          },
          project3: {
            title: 'Systém párovania projektov',
            text: 'Nástroj na prepájanie študentov s vhodnými projektmi.',
            status: 'Odovzdaný'
          }
        }
      },
      news: {
        title: 'Novinky',
        items: {
          news1: {
            title: 'Nová výzva pre študentské tímy',
            text: 'Prihlasovanie do ďalšieho inovačného cyklu je teraz otvorené.',
            date: 'Apríl 2026'
          },
          news2: {
            title: 'Pridali sa noví priemyselní partneri',
            text: 'Tento mesiac sa k ekosystému NTI pridalo viacero firiem.',
            date: 'Marec 2026'
          },
          news3: {
            title: 'Rozšírený mentorský program',
            text: 'Pre nové tímy je teraz k dispozícii viac mentorov.',
            date: 'Marec 2026'
          }
        }
      },
      faq: {
        title: 'FAQ',
        items: {
          faq1: {
            question: 'Kto sa môže zapojiť do NTI?',
            answer: 'Študenti, firmy, mentori a administrátori sa môžu zapojiť podľa svojej roly.'
          },
          faq2: {
            question: 'Môžu študenti pracovať samostatne?',
            answer: 'Nie, od študentov sa očakáva práca v tímoch.'
          },
          faq3: {
            question: 'Môžu firmy vytvárať projekty?',
            answer: 'Áno, firmy môžu pridávať a spravovať projektové príležitosti.'
          }
        }
      },
      keyDates: {
        title: 'Kalendár výziev / Kľúčové termíny',
        items: {
          date1: {
            date: '10. máj 2026',
            title: 'Deadline registrácie',
            text: 'Posledný deň registrácie študentov a mentorov.'
          },
          date2: {
            date: '20. máj 2026',
            title: 'Otvorenie projektových prihlášok',
            text: 'Tímy sa môžu začať prihlasovať na dostupné projekty.'
          },
          date3: {
            date: '1. jún 2026',
            title: 'Výberový proces',
            text: 'Začína hodnotenie tímov a projektových prihlášok.'
          },
          date4: {
            date: '15. jún 2026',
            title: 'Spustenie projektov',
            text: 'Schválené tímy oficiálne začínajú svoje projekty.'
          }
        }
      },
      language: {
        title: 'Jazyková podpora',
        text: 'Táto platforma je pripravená na dvojjazyčnú podporu v slovenčine a angličtine.'
      }
    }
  }
}

const i18n = createI18n({
  legacy: true,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n