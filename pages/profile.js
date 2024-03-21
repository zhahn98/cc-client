/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import ProfileCard from '../components/ProfileCard';
import CreatureCard from '../components/CreatureCard';
import { getMyCreatures } from '../api/CreatureData';

function Profile() {
  const { user } = useAuth();
  const [creatures, setCreatures] = useState([]);
  const getAllMyCreatures = () => {
    getMyCreatures(user.id).then(setCreatures);
  };

  useEffect(() => {
    getAllMyCreatures();
  }, []);

  return (
    <div style={{ fontFamily: 'Andale Mono, monospace', textAlign: 'center' }}>
      <div style={{
        marginBottom: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <h1>My Profile:</h1>
        <ProfileCard />
      </div>
      <div className="text-center my-4">
        <h1>My Creatures:</h1>
        <div className="d-flex flex-wrap" style={{ justifyContent: 'space-evenly' }}>
          {creatures.map((creature) => (
            <CreatureCard key={creature.id} creatureObj={creature} onUpdate={getAllMyCreatures} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
