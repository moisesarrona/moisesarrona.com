import React, { useState } from 'react'
import { PROJECTS } from '../../core/data/projectData'
import ProjectItem from './ProjectItem'
import ProjectFilter from './ProjectFilter'

const Projects = () => {
  const [filterType, setFilterType] = useState('')

  /**
   * save input string radio
   * @param {event} e  event from input radio
   */
  const handleType = (e) => {
    setFilterType(e.target.value)
  }

  /**
   * Clear filters
   */
  const clearFilter = () => {
    setFilterType('')
  }

  /**
   * Get all type project from PROJECTS
   * @returns Array
   */
  const getTypeProject = () => {
    const types = [... new Set(PROJECTS.map(project => project.type))]
    types.push("ALL")
    return types
  }

  const filteredProjects = PROJECTS.filter((project) => {
    if (filterType.toUpperCase() != 'ALL') {
      const searchType = filterType.toUpperCase()
      return (
        project.type.toUpperCase().includes(searchType)
      )
    }
    return clearFilter()
  });

  return (
    <>
      <section>
        <div className='content__projects'>
        {filterType}
          <ProjectFilter filterType={filterType} 
            handleType={handleType}
            typeProject={getTypeProject()}
            clearFilter={clearFilter} />

          {
            filteredProjects.map((project, index) => {
              return (
                <ProjectItem key={index} project={project} />
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default Projects