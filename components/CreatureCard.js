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

  // Function to map category labels to colors
  const getCategoryColor = (categoryLabel) => {
    // Implement your logic to map category labels to colors here
    // For example:
    switch (categoryLabel.toLowerCase()) {
      case 'cave':
        return '#85947f';
      case 'swamp':
        return '#1d5c1d';
      case 'jungle':
        return '#3eab3e';
      case 'ocean':
        return '#6c96e6';
      case 'volcano':
        return '#c27748';
      case 'sky':
        return '#7ebcd9';
      default:
        return 'white'; // Default color
    }
  };
  // Function to determine primary and secondary colors based on categories
  const getColors = () => {
    let primaryColor = 'white';
    let secondaryColor = 'black'; // Default border color

    if (creatureObj.category.length >= 1) {
      primaryColor = getCategoryColor(creatureObj.category[0].label);
    }
    if (creatureObj.category.length >= 2) {
      secondaryColor = getCategoryColor(creatureObj.category[1].label);
    }

    return { primaryColor, secondaryColor };
  };

  // Get primary and secondary colors
  const { primaryColor, secondaryColor } = getColors();

  const categoryCount = creatureObj.category.length;

  return (
    <>
      <Card
        className="text-center col-md-3 creature-card"
        style={{
          border: `5px solid ${secondaryColor}`,
          backgroundColor: primaryColor,
          borderRadius: '40px',
          padding: '10px',
          margin: '0 10px 20px 0px',
          transition: 'transform 0.3s ease',
        }}
      >
        <Card.Header style={{
          fontWeight: 'bold',
          fontSize: '1.5em',
          fontFamily: 'Courier New, monospace',
          textShadow: '2px 2px 5px white',
        }}
        >
          {creatureObj.name}
        </Card.Header>
        <Card.Img
          variant="top"
          src={creatureObj.img}
          alt={creatureObj.name}
          style={{
            height: '100%',
            width: '100%',
            boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)',
            objectFit: 'fill',
            border: '2px solid black',
          }}
        />
        <Card.Body style={{ fontSize: '1.0em', fontFamily: 'Andale Mono, monospace' }}>
          <p>Lore: {creatureObj.lore}</p>
          <p>Rarity: {creatureObj.rarity.label}</p>
          {/* Handles changing category plurality for proper english on UI */}
          {categoryCount > 0 ? (
            <>
              <p>{categoryCount <= 1 ? 'Category:' : 'Categories:'}</p>
              <p>
                {creatureObj.category.map((category, index) => (
                  <span key={category.id}>
                    {category.label}
                    {index < creatureObj.category.length - 1 ? ', ' : ''}
                  </span>
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
    rarity: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    category: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
