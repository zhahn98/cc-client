/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCategoryToCreature, removeCategoryfromCreature, getCategories } from '../api/CategoryData';

function CategoryModal({ creature, onUpdate }) {
  // Simulating categories with a state
  const [categories, setCategories] = useState([]); // Initial categories

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);
  // Function to handle deleting the last tag
  const deleteCategory = (categoryId, creatureId) => {
    removeCategoryfromCreature(creatureId, categoryId)
      .then(() => onUpdate(creatureId));
  };

  const addCategory = (categoryId, creatureId) => {
    addCategoryToCreature(creatureId, categoryId)
      .then(() => onUpdate(creatureId));
  };
  // Checks if specific category is present when assigning categories
  const isCategoryInCreature = (creatureCategories, category) => creatureCategories.some((creatureCategory) => creatureCategory.id === category.id);

  const categoriesController = (creatureCategories, category) => {
    const categoryExists = isCategoryInCreature(creatureCategories, category);
    if (categoryExists) {
      deleteCategory(category.id, creature.id);
    } else {
      addCategory(category.id, creature.id);
    }
  };

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose} style={{ background: '' }}>
          <Modal.Title>
            Categories
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '' }}>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                {category.label}

                {/* Assuming addTag should be specific to each tag, you might need a function to handle the action per tag */}
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => categoriesController(creature.category, category)}
                  style={{ marginLeft: '10px' }}
                >
                  {isCategoryInCreature(creature.category, category) ? 'Delete' : 'Add'}
                </Button>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}

CategoryModal.propTypes = {
  creature: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default CategoryModal;
