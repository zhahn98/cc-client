/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getCreatures } from '../../api/CreatureData';
import CreatureCard from '../../components/CreatureCard';

function AllCreaturesPage() {
  const [creatures, setCreatures] = useState([]);
  const getAllCreatures = () => {
    getCreatures().then(setCreatures);
  };

  useEffect(() => {
    getAllCreatures();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
        {creatures.map((creature) => (
          <CreatureCard key={creature.id} creatureObj={creature} onUpdate={getAllCreatures} />
        ))}
      </div>
    </div>
  );
}

export default AllCreaturesPage;
