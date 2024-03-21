/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSingleCreature } from '../../api/CreatureData';
import CategoryModal from '../../components/CategoryModal';
import CreatureCard from '../../components/CreatureCard';

export default function ViewCreature() {
  const [viewCreature, setCreature] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false); // State to control Modal visibility
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getCreature = (creatureId) => {
    getSingleCreature(creatureId).then(setCreature);
  };
  // Fetch the Creature data when component mounts or id changes
  useEffect(() => {
    if (id) {
      getCreature(id);
    }
  }, [id]);

  // If the Creature hasn't been loaded yet
  if (!viewCreature) {
    return <div>Loading...</div>;
  }
  // Function to toggle the visibility of the Modal
  const toggleCategoryModal = () => setShowCategoryModal(!showCategoryModal);

  // const categoryCount = viewCreature.category.length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        {viewCreature && (
        <CreatureCard creatureObj={viewCreature} onUpdate={() => {}} />
        )}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        minWidth: '200px',
        fontFamily: 'Courier New, monospace',
      }}
      >
        {(user.id === viewCreature.user?.id) ? (
          <Button
            variant="info"
            onClick={toggleCategoryModal}
          >EDIT CATEGORIES
          </Button>
        ) : (
          <Button variant="info" disabled style={{ marginLeft: '10px', marginBottom: '30px' }}>
            EDIT CATEGORIES
          </Button>
        )}
        {showCategoryModal && <CategoryModal creature={viewCreature} show={showCategoryModal} onHide={toggleCategoryModal} onUpdate={getCreature} />}
      </div>
    </div>
  );
}
