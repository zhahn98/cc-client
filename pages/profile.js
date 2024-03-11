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

  console.warn(user);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '20px' }}>
        <h1>My Profile:</h1>
        <ProfileCard />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h1>My Creatures:</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {creatures.map((creature) => (
            <CreatureCard key={creature.id} creatureObj={creature} onUpdate={getAllMyCreatures} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
