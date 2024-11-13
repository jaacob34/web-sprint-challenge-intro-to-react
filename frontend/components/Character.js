import React, { useState } from 'react'


function Character({ people, planets }) { // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const [activeId, setActiveId] = useState(null);

  const toggleHome = (id) => {
    setActiveId(activeId === id ? null : id); // Toggle the active ID
  };

  return (
    <div>
      {people.map(person => (
        <div className='character-card' key={person.id}>
          <h3 className='character-name' onClick={() => toggleHome(person.id)}>{person.name}</h3>
          
          {activeId === person.id && (
          <p>Planet: <span className='character-planet'>
            {planets.find((planet) => planet.id === person.homeworld)?.name || "Unknown Planet"}</span>
          </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default Character
