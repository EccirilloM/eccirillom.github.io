import type { Language } from './content';

// Source: experience text pasted by Ettore from LinkedIn, 2026-10-13.
// These dates supersede the earlier CV summary. Social Media Marketing excluded.
export type ExperienceScene = 'sailing' | 'robot' | 'claims' | 'road' | 'instruction';
type Localised = Record<Language, string>;
export type Period = { start: string; end: string | null };
export type ExperienceEntry = {
  id: string; company: string; period: Period; location: Localised; mode: Localised;
  kind: Localised; role: Localised; summary: Localised;
  responsibilities: Record<Language, string[]>; skills: string[]; scene: ExperienceScene;
  progression?: { period: Period; role: Localised }[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'polimi-sailing', company: 'Polimi Sailing Team', period: { start: '2025-03', end: null },
    location: { en: 'Milan, Italy', it: 'Milano, Italia' }, mode: { en: 'On-site', it: 'In sede' },
    kind: { en: 'Full-time', it: 'Tempo pieno' }, scene: 'sailing',
    role: { en: 'Co-Head of the Mechatronics Department', it: 'Co-responsabile Dipartimento Meccatronica' },
    summary: { en: 'Onboard sensing and control for the Moth, with growing responsibility in the mechatronics department.', it: 'Sensoristica e controllo di bordo per la Moth, con responsabilità crescenti nel dipartimento di meccatronica.' },
    progression: [
      { period: { start: '2026-08', end: null }, role: { en: 'Co-Head of the Mechatronics Department', it: 'Co-responsabile Dipartimento Meccatronica' } },
      { period: { start: '2025-09', end: '2026-08' }, role: { en: 'Head of the Mechatronics Sub-department', it: 'Responsabile Sotto-dipartimento Meccatronica' } },
      { period: { start: '2025-03', end: '2025-09' }, role: { en: 'Mechatronics Department Member', it: 'Membro Reparto Meccatronica' } },
    ],
    responsibilities: {
      en: ['Design and implementation of the ROS 2 communication pipeline between onboard sensors and the Moth’s control system.', 'Development of an Angular and Node.js interface for real-time control-parameter tuning and boat mapping.', 'Mechatronics team coordination and technical training sessions on new technologies.'],
      it: ['Progettazione e implementazione della pipeline ROS 2 tra i sensori di bordo e il sistema di controllo della Moth.', 'Sviluppo di un’interfaccia Angular e Node.js per regolare i parametri di controllo in tempo reale e mappare l’imbarcazione.', 'Coordinamento del team di meccatronica e sessioni di formazione tecnica sulle nuove tecnologie.'],
    },
    skills: ['ROS 2', 'Angular', 'Node.js', 'Autonomous navigation'],
  },
  {
    id: 'airlab', company: 'AIRLab · Politecnico di Milano', period: { start: '2026-03', end: '2026-07' },
    location: { en: 'Milan, Italy', it: 'Milano, Italia' }, mode: { en: 'On-site', it: 'In sede' },
    kind: { en: 'Full-time', it: 'Tempo pieno' }, scene: 'robot',
    role: { en: 'Control Engineer · Robotics Team FRE2026', it: 'Control Engineer · Robotics Team FRE2026' },
    summary: { en: 'Autonomous agricultural robotics for the Field Robot Event 2026: navigating corn rows and understanding the surrounding environment.', it: 'Robotica agricola autonoma per il Field Robot Event 2026: navigazione tra i filari di mais e percezione dell’ambiente.' },
    responsibilities: {
      en: ['Development of an autonomous robot able to navigate corn rows and perform agricultural operations.', 'Integration and calibration of LiDAR, IMU and ZED cameras for environmental perception and mapping.'],
      it: ['Sviluppo di un robot autonomo capace di navigare tra i filari di mais e svolgere operazioni agricole.', 'Integrazione e calibrazione di LiDAR, IMU e telecamere ZED per la percezione ambientale e la mappatura.'],
    },
    skills: ['ROS 2', 'Autonomous navigation', 'LiDAR', 'IMU', 'ZED'],
  },
  {
    id: 'avr-2024', company: 'AVR Tech', period: { start: '2024-03', end: '2024-07' },
    location: { en: 'Rome, Italy', it: 'Roma, Italia' }, mode: { en: 'Hybrid', it: 'Ibrido' },
    kind: { en: 'Internship', it: 'Stage' }, scene: 'claims',
    role: { en: 'Software Engineer', it: 'Software Engineer' },
    summary: { en: 'Digitisation of claims management under service contracts between AVR and its clients.', it: 'Digitalizzazione della gestione dei sinistri nell’ambito dei contratti di servizio tra AVR e i suoi clienti.' },
    responsibilities: {
      en: ['Digitisation of incoming and outgoing claims handled under client service contracts.', 'Streamlining of data collection and processing, reducing operational time and the environmental footprint of the workflow.'],
      it: ['Digitalizzazione della gestione dei sinistri attivi e passivi trattati nell’ambito dei contratti di servizio.', 'Semplificazione della raccolta e dell’elaborazione dei dati, con riduzione dei tempi operativi e dell’impronta ambientale del processo.'],
    },
    skills: ['Tailwind CSS', 'Prisma', 'PostgreSQL', 'HTML', 'Leaflet', 'Node.ts', 'TypeScript', 'Angular', 'Git'],
  },
  {
    id: 'avr-2023', company: 'AVR Tech', period: { start: '2023-03', end: '2023-07' },
    location: { en: 'Rome, Italy', it: 'Roma, Italia' }, mode: { en: 'Hybrid', it: 'Ibrido' },
    kind: { en: 'Internship', it: 'Stage' }, scene: 'road',
    role: { en: 'Junior Software Developer · Full Stack', it: 'Junior Software Developer · Full Stack' },
    summary: { en: 'A responsive web application replacing paper reports for road-maintenance teams, also usable on tablets.', it: 'Un’applicazione web responsive, utilizzabile anche su tablet, per sostituire i rapporti cartacei delle squadre di manutenzione stradale.' },
    responsibilities: {
      en: ['Development of a responsive application to digitise road-maintenance work reports.', 'Standardisation, digitisation and georeferencing of processes to simplify accounting and activity management.', 'Real-time remote access to field-team data, reducing data collection and processing times.'],
      it: ['Sviluppo di un’applicazione responsive per digitalizzare i rapporti di lavoro nella manutenzione stradale.', 'Standardizzazione, digitalizzazione e georeferenziazione dei processi per semplificare contabilità e gestione delle attività.', 'Accesso remoto e in tempo reale ai dati delle squadre in cantiere, riducendo i tempi di raccolta ed elaborazione.'],
    },
    skills: ['AngularJS', 'Node.js', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Node.ts', 'Angular', 'Git'],
  },
  {
    id: 'sailing-instructor', company: 'Lega Navale Italiana Ostia', period: { start: '2014-01', end: '2023-07' },
    location: { en: 'Lido di Ostia, Italy', it: 'Lido di Ostia, Italia' }, mode: { en: 'On-site', it: 'In sede' },
    kind: { en: 'Freelance', it: 'Freelance' }, scene: 'instruction',
    role: { en: 'Sailing Instructor', it: 'Istruttore di vela' },
    summary: { en: 'Sailing instruction at Lega Navale Italiana Ostia.', it: 'Attività di istruttore di vela presso la Lega Navale Italiana Ostia.' },
    responsibilities: { en: [], it: [] }, skills: [],
  },
];
