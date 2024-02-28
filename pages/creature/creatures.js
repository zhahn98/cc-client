/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
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
      <Link href="/creature/new" passHref>
        <Button>New Creature</Button>
      </Link>
      <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
        {creatures.map((creature) => (
          <CreatureCard key={creature.id} creatureObj={creature} onUpdate={getAllCreatures} />
        ))}
      </div>
    </div>
  );
}

export default AllCreaturesPage;
