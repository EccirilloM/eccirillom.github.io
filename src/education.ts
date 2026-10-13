import type { Language } from './content';
import type { Period } from './experience';

type Localised = Record<Language, string>;
type EducationEntry = {
  id: string;
  institution: string;
  period: Period;
  location?: Localised;
  title: Localised;
  description: Localised;
  grade?: number;
  skills: Localised[];
  extra?: { title: string; description: Localised; skills: string[] };
};

// Grades, high school and BSc start: user-supplied LinkedIn text, 2026-10-13.
// BSc end: March 2025 from the CV, explicitly confirmed by Ettore, 2026-10-13.
// MSc dates and coursework: supplied CV. No provisional MSc grade.
export const educationEntries: EducationEntry[] = [
  {
    id: 'double-msc', institution: 'Politecnico di Milano | KTH',
    period: { start: '2025-03', end: null },
    location: { en: 'Milan | Stockholm', it: 'Milano | Stoccolma' },
    title: { en: 'Double MSc · High Performance Computing', it: 'Doppia laurea magistrale · High Performance Computing' },
    description: { en: 'EIT Digital double-degree programme at Politecnico di Milano and KTH Royal Institute of Technology.', it: 'Percorso di doppia laurea EIT Digital tra Politecnico di Milano e KTH Royal Institute of Technology.' },
    skills: [
      { en: 'Advanced software engineering', it: 'Ingegneria del software avanzata' },
      { en: 'Scientific computing in aerospace', it: 'Calcolo scientifico in ambito aerospaziale' },
      { en: 'Mathematical models in finance', it: 'Modelli matematici per la finanza' },
      { en: 'Robotics', it: 'Robotica' },
    ],
  },
  {
    id: 'bsc', institution: 'Politecnico di Milano | ELIS College',
    period: { start: '2021-09', end: '2025-03' },
    location: { en: 'Milan | Rome', it: 'Milano | Roma' },
    title: { en: 'BSc · Engineering of Computing Systems', it: 'Laurea triennale · Ingegneria Informatica' },
    description: { en: 'Bachelor’s degree at Politecnico di Milano, complemented by technical training at ELIS College.', it: 'Laurea triennale al Politecnico di Milano, affiancata dal percorso di formazione tecnica di ELIS College.' },
    grade: 99,
    skills: [
      { en: 'Algorithms & data structures', it: 'Algoritmi e strutture dati' },
      { en: 'Software engineering', it: 'Ingegneria del software' },
      { en: 'Computer science fundamentals', it: 'Fondamenti di informatica' },
      { en: 'Artificial intelligence', it: 'Intelligenza artificiale' },
      { en: 'Databases', it: 'Basi di dati' },
      { en: 'Operating systems', it: 'Sistemi operativi' },
      { en: 'Computer architectures', it: 'Architetture dei calcolatori' },
      { en: 'Control theory', it: 'Teoria del controllo' },
    ],
    extra: {
      title: 'ELIS College',
      description: { en: 'Technical coursework', it: 'Formazione tecnica' },
      skills: ['SQL', 'UML', 'Java SE 11', 'Linux', 'Java EE', 'Spring', 'Angular', 'Data Science', 'Docker', 'AWS', 'Cybersecurity'],
    },
  },
  {
    id: 'high-school', institution: 'Liceo Scientifico John Fitzgerald Kennedy',
    period: { start: '2016', end: '2021' },
    location: { en: 'Rome, Italy', it: 'Roma, Italia' },
    title: { en: 'Scientific High School Diploma', it: 'Diploma di liceo scientifico' },
    description: { en: 'Scientific curriculum.', it: 'Indirizzo scientifico.' },
    grade: 100,
    skills: [],
  },
];
