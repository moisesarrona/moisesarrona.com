export const commands = [
  'ls',
  'cd',
  'cat',
  'clear',
  'arron'
]

export const sections = [
  {
    home: {
      id: 1,
      files: ['readme.txt'],
      folders: ['about', 'contact']
    },
    about: {
      id: 2,
      files: ['readme.txt', 'portfolio.txt'],
      folders: []
    },
    contact: {
      id: 3,
      files: ['contact.txt'],
      folers: []
    }
  }
]

export const contents = [
  {
    home: [
      {readme: 'Heeeeeeey, my name is Moises Arrona, Im Software Engineer and Software Architect'}
    ],
    about: [
      {readme: 'Well, lest go'},
      {portfolio: 'Ok, my skill are ...'}
    ],
    contact: [
      {contact: 'My contact is ...'}
    ]
  }
]

export const terminalName = '~/arrona@term > ';