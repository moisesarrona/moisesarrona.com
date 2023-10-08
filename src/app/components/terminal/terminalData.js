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
      folders: ['about', 'projects']
    },
    about: {
      id: 2,
      files: ['readme.txt', 'skills.txt'],
      folders: []
    },
    projects: {
      id: 3,
      files: ['readme.txt', 'projects.txt'],
      folders: []
    }
  }
]

export const CONTENTS = [
  {
    home: [
      {
        readme: "Hi humans and robots, I'm Software Architect and Software Engineer, I love writing code 👨🏻‍💻 and playing the guitar 🎸" +
          "\nI made it with React and love, I hope u like it."
      }
    ],
    about: [
      {
        readme: "I worked at Werkn as a Frontend Developer, Grupo Castores as a Software Engineer, currently working at Flecha Amarilla as a Software Architect." +
          "\nMy activities at GFA are: proposing technological solutions, architectural solutions to migrate systems and for new developments." +
          "Create and Propose guidelines, design patterns, standards. Provide research and technical training. Develop proofs of concept."
      },
      { skills: 'Throughout my professional career I have used various technologies and programming languages such as: Java, SpringBoot, C#, ASP.Net, PHP, Laravel, Angular, React, Git, GitLab, Github, SqlServer, Mysql, DB2, AWS etc.' }
    ],
    projects: [
      {
        readme: "In my free time I maintain and create Open-Source projects for the community and Closed-Source for Companies. Take a look at my projects." +
          "\nI've some projects on Github, discover them"
      },
      {
        projects: "Arron EDI," +
          "\nArron Privacy," +
          "\nmoisesarrona.com," +
          ".\nbrisApp"
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