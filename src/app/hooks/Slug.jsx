import React from 'react';

/**
  * Create slug to project route from project name
  * @param {string} name project name
  * @returns string
  */
const useSlug = () => {
  const slugify = (name) => {
    return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
  }

  return slugify
}

export default useSlug