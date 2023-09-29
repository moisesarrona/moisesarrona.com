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
      folders: ['about', 'contact']
    },
    about: {
      id: 2,
      files: ['readme.txt', 'skills.txt'],
      folders: []
    },
    contact: {
      id: 3,
      files: ['contact.txt'],
      folders: []
    }
  }
]

export const CONTENTS = [
  {
    home: [
      { readme: 'Hi humans and robots, Im Software Architect and Software Engineer, I love writing 👨🏻‍💻 code and playing the guitar 🎸' }
    ],
    about: [
      { readme: 'I worked at Werkn as a Frontend Developer, Grupo Castores as a Software Engineer, currently working at Flecha Amarilla as a Software Architect.' },
      { skills: 'Throughout my professional career I have used various technologies and programming languages such as: Java, SpringBoot, C#, ASP.Net, PHP, Laravel, Angular, React, Git, GitLab Github, SqlServer, Mysql, DB2, AWS etc.' }
    ],
    contact: [
      { contact: 'My contact is ...' }
    ]
  }
]

export const TERMINAL_NAME = '~/arrona@term > ';