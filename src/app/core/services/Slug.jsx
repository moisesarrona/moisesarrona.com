/**
* Create slug to project route from project name
* @param {string} name project name
* @returns string
*/
export const slugify = (name) => {
 return name.toLowerCase()
   .replace(/\s+/g, '-')
   .replace(/[^\w-]+/g, '')
   .replace(/--+/g, '-')
}