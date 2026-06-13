import { createI18n } from 'vue-i18n'
import DashboardView from './views/DashboardView.vue'

const messages = {
  en: {
    nav: {
  home: "Home",
  about: "About NTI",
  projects: "Projects",
  teams: "Teams",
  partners: "Partners and Mentors",
  challenges: "Challenges and Deadlines",
  news: "News",
  contact: "Contact",
  dashboard: "Dashboard",
  login: "Login",
  register: "Register"
},
//DASHBOARD
dashboard:{
  title: "Dashboard",
  welcome: "Welcome back!",


   admin_dashboard: {
  title: "Admin Dashboard",
  subtitle: "System management",

  users: "Users",
  all_users: "All Users",

  mentors: "Mentors",
  all_mentors: "All Mentors",

  projects: "Projects",
  all_projects: "All Projects",

  commissions: "Commissions",
  all_commissions: "All Commissions",

  team: "Team",
  current_mentors: "Current Mentors",
  assign_mentor: "Assign Mentor",
  select_mentor: "Select Mentor",
  remove: "Remove"
},

     UserList: {
      title: "Users",
      subtitle: "Manage registered users",
      total: "Total users",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      role: "Role",
      verified: "Verified",
      notVerified: "Not verified",
        actions: "Actions",
        verify: "Verify",
        delete: "Delete",
        edit: "Edit",
     },
      MentorList: {
      title: "Mentors",
      subtitle: "Manage registered mentors",
      total: "Total mentors",
      user_id: "User ID",
      expertise: "Expertise",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      bio: "Bio",
      phone: "Phone",
       actions: "Actions",
        assign: "Assign to Team",
        remove: "Remove from Team",
        specialization: "Specialization",
        empty: "No mentors found"

      },
      //FORDITAS
      allProjects: {
        title: "All Projects",
        subtitle: "Manage all projects",
        total: "Total projects",

        id: "ID",
        titleColumn: "Project Title",
        description: "Description",
        status: "Status",
        assignedCommission: "Assigned Commission",
        createdAt: "Created At",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        empty: "No projects found",
         assignCommission: "Assign Commission",
         paused: "Paused",
         archived: "Archived",
         finished: "Finished",
         noCommission: "No commissions available",
         selectCommission: "Select a commission",
                   active: "Active",
          pending: "Pending",
          cancel: "Cancel",
          save: "Save",
          editproject: "Edit Project",
      },
      allCommissions: {
                        title: "All Commissions",
        subtitle: "Manage Commissions",
        total: "Total commissions",
        editcommission: "Edit Commission",
        id: "ID",
        name: "Name",
        description: "Description",
        status: "Status",
        assignedCommission: "Assigned Commission",
        createdAt: "Created At",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        empty: "No commissions found",
        members: "Members",
        selectMember: "Select member",
        addMember: "Add member",
        editproject: "Edit Project",
        assignCommission: "Assign Commission",
        save: "Save",
        calcel: "Cancel",
        search: "Search by name or by description"
      },

      ProjectList: {
  title: "Projects",
  subtitle: "Manage all projects",
  total: "Total projects",

  id: "ID",
  name: "Name",
  titleColumn: "Project Title",
  description: "Description",
  status: "Status",
  createdAt: "Created At",

  actions: "Actions",
  edit: "Edit",
  delete: "Delete",

  empty: "No projects found"
},

CommissionList: {
  title: "Commissions",
  subtitle: "Manage all commissions",
  total: "Total commissions",

  id: "ID",
  name: "Name",
  description: "Description",
  createdAt: "Created At",

  actions: "Actions",
  edit: "Edit",
  delete: "Delete",

  empty: "No commissions found"
},
      messages:{
        mentorUpdated: "Mentor updated successfully!",
        mentorDeleted: "Mentor deleted successfully!",
        sureDelete: "Are you sure you want to delete this mentor?"

      }
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
    },
    //ide meg a project
  projects: {
  title: "Projects",
  description: "Explore available projects from companies and student teams.",
  type: "Type",
  company: "Company",
  budget: "Budget",
  status: "Status",
  viewDetails: "View Details",

  types: {
    company: "Company Project",
    student: "Student Idea"
  },

  statuses: {
    open: "Open",
    progress: "In Progress"
  }
},
     teams: {
      title: "Teams",
      description: "Browse student teams participating in projects.",
      leader: "Leader",
      members: "Members",
      project: "Project",
      status: "Status",
      viewDetails: "View Details",

      statuses: {
        active: "Active",
        pending: "Pending",
        approved: "Approved"
      }
    }
  },

  sk: {
  nav: {
    home: "Domov",
    about: "O NTI",
    projects: "Projekty",
    teams: "Tímy",
    partners: "Partneri a mentori",
    challenges: "Výzvy a termíny",
    news: "Novinky",
    contact: "Kontakt",
    dashboard: "Nástenka",
    login: "Prihlásenie",
    register: "Registrácia"
  },

  //DASHBOARD
dashboard: {
  title: "Nástenka",
  welcome: "Vitajte späť!",

  admin_dashboard: {
  title: "Administrátorský panel",
  subtitle: "Správa systému",

  users: "Používatelia",
  all_users: "Všetci používatelia",

  mentors: "Mentori",
  all_mentors: "Všetci mentori",

  projects: "Projekty",
  all_projects: "Všetky projekty",

  commissions: "Komisie",
  all_commissions: "Všetky komisie",

  team: "Tím",
  current_mentors: "Aktuálni mentori",
  assign_mentor: "Priradiť mentora",
  select_mentor: "Vybrať mentora",
  remove: "Odobrať"
},

  ProjectList: {
  title: "Projekty",
  subtitle: "Správa všetkých projektov",
  total: "Celkový počet projektov",

  id: "ID",
  name: "Názov",
  titleColumn: "Názov projektu",
  description: "Popis",
  status: "Status",
  createdAt: "Vytvorené",

  actions: "Akcie",
  edit: "Upraviť",
  delete: "Odstrániť",

  empty: "Neboli nájdené žiadne projekty"
},

CommissionList: {
  title: "Komisie",
  subtitle: "Správa všetkých komisií",
  total: "Celkový počet komisií",

  id: "ID",
  name: "Názov",
  description: "Popis",
  createdAt: "Vytvorené",

  actions: "Akcie",
  edit: "Upraviť",
  delete: "Odstrániť",

  empty: "Neboli nájdené žiadne komisie"
},

  UserList: {
    title: "Používatelia",
    subtitle: "Správa registrovaných používateľov",
    total: "Celkový počet používateľov",

    firstName: "Meno",
    lastName: "Priezvisko",
    email: "E-mail",
    role: "Rola",
    phone: "Telefón",

    verified: "Overený",
    notVerified: "Neoverený",

    actions: "Akcie",
    verify: "Overiť",
    delete: "Odstrániť",
    edit: "Upraviť"
  },

  MentorList: {
    title: "Mentori",
    subtitle: "Správa registrovaných mentorov",
    total: "Celkový počet mentorov",

    user_id: "ID používateľa",
    expertise: "Odbornosť",

    firstName: "Meno",
    lastName: "Priezvisko",
    email: "E-mail",
    bio: "Bio",
    phone: "Telefón",

    actions: "Akcie",
    assign: "Priradiť k tímu",
    remove: "Odstrániť z tímu",

    specialization: "Špecializácia",
    empty: "Neboli nájdení žiadni mentori"
  },


        //FORDITAS
      allProjects: {
        title: "Všetky projekty",
        subtitle: "Správa všetkých projektov",
        total: "Celkový počet projektov",
        editproject: "Upraviť projekt",
        id: "ID",
        titleColumn: "Názov projektu",
        description: "Popis",
        status: "Stav",
        assignedCommission: "Priradený komisii",
        createdAt: "Vytvorené",
        actions: "Akcie",
        edit: "Upraviť",
        delete: "Odstrániť",
        empty: "Neboli nájdené žiadne projekty",
         assignCommission: "Priradiť komisii",
         paused: "Pozastavený",
         archived: "Archivovaný",
          finished: "Dokončený",
          active: "Aktívny",
          pending: "Čakajúci",
           noCommission: "Neboli nájdené žiadne komisie",
         selectCommission: "Vybrať komisiu",
         cancel: "Zrušiť",
         save: "Uložiť"
      },
      allCommissions: {
        title: "Všetky komisie",
        subtitle: "Správa všetkých komisií",
        total: "Celkový počet komisií",
save: "Uložiť",
        id: "ID",
        name: "Názov",
        description: "Popis",
        status: "Stav",
        assignedCommission: "Priradený komisii",
        createdAt: "Vytvorené",
        actions: "Akcie",
        edit: "Upraviť",
        delete: "Odstrániť",
        empty: "Neboli nájdené žiadne komisie",
        members: "Členovia",
        addMember: "Pridať člena",
        selectMember: "Vybrať člena",
      assignCommission: "Priradiť komisii",
      cancel: "Zrušiť",
      search: "Hľadať podla mena alebo popisu",
      },

  messages: {
    mentorUpdated: "Mentor bol úspešne aktualizovaný!",
    mentorDeleted: "Mentor bol úspešne odstránený!",
    sureDelete: "Ste si istí, že chcete tohto mentora odstrániť?"
  }
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
    },
        projects: {
  title: "Projekty",
  description: "Preskúmajte dostupné projekty od firiem a študentských tímov.",
  type: "Typ",
  company: "Firma",
  budget: "Rozpočet",
  status: "Stav",
  viewDetails: "Zobraziť detaily",

  types: {
    company: "Firemný projekt",
    student: "Študentský nápad"
  },

  statuses: {
    open: "Otvorený",
    progress: "Prebieha"
  }
},
    teams: {
      title: "Tímy",
      description: "Prehliadajte študentské tímy zapojené do projektov.",
      leader: "Vedúci",
      members: "Členovia",
      project: "Projekt",
      status: "Stav",
      viewDetails: "Zobraziť detaily",

      statuses: {
        active: "Aktívny",
        pending: "Čakajúci",
        approved: "Schválený"
      }
    },

  }
}

const i18n = createI18n({
  legacy: true,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
