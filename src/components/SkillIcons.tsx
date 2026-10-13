import type { IconType } from 'react-icons';
import { FaAngular, FaAws, FaCss3Alt, FaDatabase, FaDocker, FaGitAlt, FaHtml5, FaJava, FaLinux, FaNodeJs, FaPython, FaReact } from 'react-icons/fa6';
import { SiBootstrap, SiC, SiCplusplus, SiExpress, SiGithubactions, SiJavascript, SiJsonwebtokens, SiJunit5, SiLeaflet, SiMqtt, SiPostgresql, SiPrisma, SiRos, SiSpring, SiTailwindcss, SiTypescript } from 'react-icons/si';

const Gazebo: IconType = ({ size = 18, className, style }) =>
  <img src="/icons/gazebo.svg" width={size} height={size} className={className} style={style} alt="" />;

export const icons = {
  c: { label: 'C', Icon: SiC, color: '#a8b9cc' },
  javascript: { label: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
  html: { label: 'HTML', Icon: FaHtml5, color: '#e34f26' },
  css: { label: 'CSS', Icon: FaCss3Alt, color: '#38a9db' },
  sql: { label: 'SQL', Icon: FaDatabase, color: '#8db4e2' },
  aws: { label: 'AWS', Icon: FaAws, color: '#ff9900' },
  junit: { label: 'JUnit', Icon: SiJunit5, color: '#25a162' },
  bootstrap: { label: 'Bootstrap', Icon: SiBootstrap, color: '#b38aff' },
  express: { label: 'Express.js', Icon: SiExpress, color: '#f4f6f7' },
  prisma: { label: 'Prisma', Icon: SiPrisma, color: '#a9c3d8' },
  leaflet: { label: 'Leaflet', Icon: SiLeaflet, color: '#99c744' },
  docker: { label: 'Docker', Icon: FaDocker, color: '#2496ed' },
  python: { label: 'Python', Icon: FaPython, color: '#ffd343' },
  typescript: { label: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  react: { label: 'React', Icon: FaReact, color: '#61dafb' },
  node: { label: 'Node.js', Icon: FaNodeJs, color: '#68a063' },
  postgres: { label: 'PostgreSQL', Icon: SiPostgresql, color: '#659ac1' },
  linux: { label: 'Linux', Icon: FaLinux, color: '#f4f6f7' },
  ros: { label: 'ROS 2', Icon: SiRos, color: '#adc6e8' },
  actions: { label: 'GitHub Actions', Icon: SiGithubactions, color: '#2088ff' },
  spring: { label: 'Spring', Icon: SiSpring, color: '#6db33f' },
  java: { label: 'Java', Icon: FaJava, color: '#ed8b23' },
  tailwind: { label: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38bdf8' },
  jwt: { label: 'JWT', Icon: SiJsonwebtokens, color: '#fb6e9f' },
  mqtt: { label: 'MQTT', Icon: SiMqtt, color: '#bd8fe8' },
  angular: { label: 'Angular', Icon: FaAngular, color: '#dd0031' },
  cpp: { label: 'C++', Icon: SiCplusplus, color: '#659ad2' },
  git: { label: 'Git', Icon: FaGitAlt, color: '#f05032' },
  gazebo: { label: 'Gazebo', Icon: Gazebo, color: '#f58113' },
};

export const sideSkills = [icons.docker, icons.python, icons.typescript, icons.react,
  icons.node, icons.postgres, icons.linux, icons.ros, icons.actions, icons.spring,
  icons.java, icons.tailwind, icons.jwt, icons.mqtt];

export const orbitSkills = [icons.ros, icons.angular, icons.typescript, icons.cpp,
  icons.docker, icons.git, icons.spring, icons.gazebo, icons.actions];
