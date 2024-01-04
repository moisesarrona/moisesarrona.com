import {PROJECTS} from './projectData'
import {SKILLS} from'./aboutData'

export const COMMANDS = [
  'ls',
  'cd',
  'cat',
  'clear',
  'arron'
]

export const SECTIONS = [
  {
    home: {
      id: 1,
      files: ['readme.txt'],
      folders: ['about', 'projects'],
      active: true
    },
    about: {
      id: 2,
      files: ['readme.txt', 'skills.txt'],
      folders: [],
      active: true
    },
    projects: {
      id: 3,
      files: ['readme.txt', 'projects.txt'],
      folders: [],
      active: true
    }
  }
]

export const CONTENTS = [
  {
    home: [
      {
        readme: "Hola humanos y robots, mi nombre es Moises Arrona, me gusta escribir codigo y tocar la guitarra, este es mi portafolio, así que echale un vistazo"
      }
    ],
    about: [
      {
        readme: "He trabajado en Werken como Desarrollador Frontend, en Grupo Castores como Ingeniero de Software. En la actualidad, trabajo en Grupo Flecha Amarilla como Arquitecto de Software, donde brindo soluciones tecnológicas y arquitectura para software y nube. Propongo lineamientos, guías, estándares para un desarrollo seguro y de calidad. Documento procesos, desarrollo pruebas de concepto y, obvio, programo."
      },
      { 
        skills: `He trabajado con varios lenguajes de programación: ${SKILLS.map(skills => skills.name)}`
      }
    ],
    projects: [
      {
        readme: "Como hobby, me gusta programar soluciones en distintos lenguajes de programación, he creado proyectos Open Source y, bueno, también me gusta tocar la guitarra."
      },
      {
        projects: `Estos son los proyectos en los que he trabajado: ${PROJECTS.map(project => project.name)}`
      }
    ]
  }
]



export const BANNER = `
______ ______   _______  ___     
|\\   _ \\  _   \\|\\   __  \\|\\  \\    
\\ \\  \\\\\\__\\ \\  \\ \\  \\|\\  \\ \\  \\   
\\ \\  \\\\|__| \\  \\ \\  \\\\\\  \\ \\  \\  
 \\ \\  \\    \\ \\  \\ \\  \\\\\\  \\ \\  \\ 
  \\ \\__\\    \\ \\__\\ \\_______\\ \\__\\
   \\|__|     \\|__|\\|_______|\\|__|
                                 
`;

export const TERMINAL_NAME = '~/arrona@term > ';