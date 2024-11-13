import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  // State to hold data from the API
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch both people and planets data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const peopleResponse = await axios.get(urlPeople);
        setPeople(peopleResponse.data);

        const planetsResponse = await axios.get(urlPlanets);
        setPlanets(planetsResponse.data);

        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err.message); // Handle any errors
        setLoading(false);
      }
    };

    fetchData(); // Call the function to fetch the data
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Render loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there is an error
  }

  return (
    <div>
      <Character people={people} planets={planets} />
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
