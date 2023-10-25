import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faTerminal, faCode, faSoap } from '@fortawesome/free-solid-svg-icons';
import { faFirefox } from '@fortawesome/free-brands-svg-icons'


const ProjectFilter = ({
  filterType,
  handleType,
  typeProject }) => {

  return (
    <>

      <div className='option__content'>
        {
          typeProject.map((type, index) => {
            return (
              <label className='option__label'
                key={index}
                htmlFor={type}>

                <input className='option__radio'
                  type='radio'
                  name='type'
                  id={type}
                  value={type}
                  checked={filterType === type || (!filterType && type === 'ALL')}
                  onChange={handleType} />

                <div className='option__box'>
                  <FontAwesomeIcon
                    icon={
                      type.toUpperCase() === 'DESKTOP APP' ? faLaptop :
                      type.toUpperCase() === 'WEB APP' ? faFirefox :
                      type.toUpperCase() === 'LIBRARY' ? faTerminal :
                      type.toUpperCase() === 'MULTI APP' ? faCode : faSoap
                    } />

                    <span>{type}</span>
                </div>
              </label>
            )
          })
        }
      </div>

    </>
  )
}

export default ProjectFilter