import React from 'react';

/**
  * Create slug to project route from project name
  * @param {string} name project name
  * @returns string
  */
const useSlugify = (name) => {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export default useSlugify