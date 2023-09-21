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
      files: ['readme.txt'],
      folders: ['about', 'contact']
    },
    about: {
      files: ['readme.txt', 'portfolio.txt'],
      folders: []
    },
    contact: {
      files: ['contact.txt'],
      folers: []
    }
  }
]

export const terminalName = '~/arrona@term > ';