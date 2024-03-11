import React, { useState, useEffect } from 'react';
import HomeInfo from '../components/HomeInfo';
import CreatureCard from '../components/CreatureCard';
import { getRandomCreature } from '../api/CreatureData';

function Home() {
  const [randomCreature, setRandomCreature] = useState(null);

  useEffect(() => {
    getRandomCreature()
      .then((data) => {
        setRandomCreature(data);
      })
      .catch((error) => {
        console.error('Error fetching random creature:', error);
      });
  }, []);

  return (
    <div style={{ padding: '50px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ marginRight: '20px' }}>
        <HomeInfo />
      </div>
      {randomCreature && (
        <CreatureCard creatureObj={randomCreature} onUpdate={() => {}} />
      )}
    </div>
  );
}

export default Home;
