import type { Language } from './content';
import type { icons } from './components/SkillIcons';

type Localised = Record<Language, string>;
// Six groups approved by Ettore; technologies from the CV and supplied selections.
export const technicalSkills: { id: string; title: Localised; items: (keyof typeof icons)[] }[] = [
  { id: 'languages', title: { en: 'Languages', it: 'Linguaggi' }, items: ['c', 'cpp', 'python', 'java', 'javascript', 'typescript', 'sql', 'html', 'css'] },
  { id: 'robotics', title: { en: 'Robotics, Tools & Platforms', it: 'Robotica, strumenti e piattaforme' }, items: ['ros', 'gazebo', 'mqtt', 'git', 'docker', 'linux', 'actions', 'aws', 'junit'] },
  { id: 'web', title: { en: 'Web Development', it: 'Sviluppo web' }, items: ['angular', 'react', 'tailwind', 'bootstrap', 'leaflet', 'node', 'express', 'spring', 'postgres', 'prisma', 'jwt'] },
];

export const complementarySkills: { id: string; title: Localised; items: Localised[] }[] = [
  { id: 'fundamentals', title: { en: 'CS Fundamentals', it: 'Fondamenti di informatica' }, items: [
    { en: 'Data Structures & Algorithms', it: 'Algoritmi e strutture dati' },
    { en: 'Object-Oriented Programming', it: 'Programmazione a oggetti' },
    { en: 'Design Patterns', it: 'Design pattern' },
    { en: 'Software Engineering', it: 'Ingegneria del software' },
    { en: 'Operating Systems', it: 'Sistemi operativi' },
    { en: 'Databases', it: 'Basi di dati' },
  ] },
  { id: 'soft', title: { en: 'Soft Skills', it: 'Competenze trasversali' }, items: [
    { en: 'Team Leadership', it: 'Coordinamento del team' },
    { en: 'Teamwork', it: 'Collaborazione' },
    { en: 'Communication', it: 'Comunicazione' },
    { en: 'Technical Training', it: 'Formazione tecnica' },
    { en: 'Problem Solving', it: 'Problem solving' },
  ] },
  { id: 'interests', title: { en: 'Areas of Interest', it: 'Aree di interesse' }, items: [
    { en: 'High Performance Computing', it: 'High Performance Computing' },
    { en: 'Scientific Computing', it: 'Calcolo scientifico' },
    { en: 'Autonomous Robotics', it: 'Robotica autonoma' },
    { en: 'Control Systems for Marine Applications', it: 'Sistemi di controllo applicati alla nautica' },
  ] },
];
