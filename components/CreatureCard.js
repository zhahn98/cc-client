import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleCreature } from '../api/CreatureData';
import { useAuth } from '../utils/context/authContext';

export default function CreatureCard({ creatureObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisCreature = () => {
    if (window.confirm(`Do you want to Delete the Creature ${creatureObj.name}?`)) {
      deleteSingleCreature(creatureObj.id).then(() => onUpdate());
    }
  };

  const editMyCreature = () => (user.id === creatureObj.user?.id ? (
    <Button variant="outline-info" style={{ boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)' }}>
      EDIT
    </Button>
  ) : (''));

  const categoryCount = creatureObj.category.length;

  return (
    <>
      <Card className="text-center mx-auto col-md-3" style={{ border: '2px solid black' }}>
        <Card.Header>{creatureObj.name}</Card.Header>
        <Card.Img
          variant="top"
          src={creatureObj.img}
          alt={creatureObj.name}
          style={{
            height: '100%',
            width: '100%',
            boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)',
            objectFit: 'fill',
          }}
        />
        <Card.Body>
          <p>Lore: {creatureObj.lore}</p>
          <p>Rarity: {creatureObj.rarity.label}</p>
          {/* Handles changing category plurality for proper english on UI */}
          {categoryCount > 0 ? (
            <>
              <p>{categoryCount <= 1 ? 'Category:' : 'Categories:'}</p>
              <p>
                {creatureObj.category.map((category) => (
                  <p key={category.id}>{category.label}</p>
                ))}
              </p>
            </>
          ) : (
            <p>Categories: None</p>
          )}
          <Link href={`/creature/${creatureObj.id}`} passHref>
            <Button variant="warning" className="m-2">
              VIEW
            </Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT DETAILS  */}
          <Link href={`/creature/edit/${creatureObj.id}`} passHref>
            {editMyCreature()}
          </Link>
          {(user.id === creatureObj.user?.id) ? (
            <Button variant="outline-danger" onClick={deleteThisCreature} className="m-2">
              DELETE
            </Button>
          ) : ('')}
        </Card.Body>
      </Card>
    </>
  );
}

CreatureCard.propTypes = {
  creatureObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lore: PropTypes.string.isRequired,
    rarity: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
