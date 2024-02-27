/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSingleCreature } from '../../api/CreatureData';
import CategoryModal from '../../components/CategoryModal';

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

  const categoryCount = viewCreature.category.length;

  return (
    <div>
      <div className="text-center mt-3">
        <h1>Creature Details:</h1>
      </div>
      <Card className="text-center mx-auto col-md-5" style={{ border: '2px solid black' }}>
        <Card.Header>Creature Name: {viewCreature.name}</Card.Header>
        <Card.Body>
          <Card.Text>Lore: {viewCreature.lore}</Card.Text>
          <Card.Text>Rarity: {viewCreature.rarity.label}</Card.Text>
          {/* Handles changing category plurality for proper english on UI */}
          {categoryCount > 0 ? (
            <>
              <Card.Text>{categoryCount <= 1 ? 'Category:' : 'Categories:'}</Card.Text>
              <Card.Text>
                {viewCreature.category.map((category) => (
                  <p key={category.id}>{category.label}</p>
                ))}
              </Card.Text>
            </>
          ) : (
            <Card.Text>Categories: None</Card.Text>
          )}
          {(user.id === viewCreature.user?.id) ? (
            <Button
              variant="primary"
              onClick={toggleCategoryModal}
            >Edit Categories
            </Button>
          ) : (
            <Button variant="primary" size="sm" disabled style={{ marginLeft: '10px' }}>
              Edit Categories
            </Button>
          )}
          <Card.Text>Created by: User #{viewCreature.user.id}</Card.Text>
        </Card.Body>
      </Card>
      {/* Modal for editing categories */}
      {showCategoryModal && <CategoryModal creature={viewCreature} show={showCategoryModal} onHide={toggleCategoryModal} onUpdate={getCreature} />}
    </div>
  );
}
