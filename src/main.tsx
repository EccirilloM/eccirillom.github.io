import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource-variable/inter/opsz.css';
import '@fontsource-variable/geist-mono';
import App from './App';
import './style.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/yellowtail/latin-400.css';
import './landing.css';
import './about.css';
import './experience.css';
import './education.css';
import './skills.css';
import './profile-contact.css';

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
