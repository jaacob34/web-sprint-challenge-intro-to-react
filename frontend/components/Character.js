import React, { useState, useEffect } from 'react';
import axios from 'axios';

const urlPlanets = 'http://localhost:9009/api/planets';

function Character({ people }) {
  const [planets, setPlanets] = useState([]); // Store the list of planets
  const [activeIds, setActiveIds] = useState([]); // Track active character cards

  // Fetch planet data once when the component mounts
  useEffect(() => {
    axios.get(urlPlanets)
      .then(res => {
        setPlanets(res.data); // Set all planets in state
      })
      .catch(err => {
        console.log('Error fetching planet data:', err.message);
      });
  }, []);

  const toggleHome = (id) => {
    setActiveIds(prevActiveIds => {
      if (prevActiveIds.includes(id)) {
        // If the ID is already in activeIds, remove it (hide the planet)
        return prevActiveIds.filter(activeId => activeId !== id);
      } else {
        // If the ID is not in activeIds, add it (show the planet)
        return [...prevActiveIds, id];
      }
    });
  };

  return (
    <div>
      {people.map(person => (
        <div className="character-card" key={person.id} onClick={() => toggleHome(person.id)}>
          <h3 className="character-name">
            {person.name}
          </h3>

          {activeIds.includes(person.id) && (
            <p className="character-planet">
              Planet: 
              <span>
                {planets.find((planet) => planet.id === person.homeworld)?.name || "Unknown Planet"}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Character;
