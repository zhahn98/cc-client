import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { updateCreature, createCreature } from '../api/CreatureData';

const initialState = {
  name: '',
  imageUrl: '',
  lore: '',
  rarity: '',
};

function CreatureForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (obj.id) {
      setFormInput({
        name: obj.name,
        lore: obj.lore,
        imageUrl: obj.imageUrl,
        rarity: obj.rarity,
      });
    }
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = { ...formInput, id: obj.id };
      updateCreature(payload).then(() => router.push(`/creature/${obj.id}`));
    } else {
      const payload = { ...formInput, userId: user.id };
      createCreature(payload).then(() => router.push('/'));
    }
  };

  console.warn('User:', user);
  console.warn('User.id', user.id);

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-warning mt-5">{obj.id ? 'Update' : 'Create'} Creature</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Creature Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name for your creature"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Post Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an Image-Url"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LORE INPUT */}
      <FloatingLabel controlId="floatingTextarea" label="Lore" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter Creature's Lore:"
          style={{ height: '100px' }}
          name="lore"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* RARITY INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Rarity" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Creature's Rarity:"
          name="rarity"
          value={formInput.rarity}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Creature</Button>
    </Form>
  );
}

CreatureForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    lore: PropTypes.string,
    rarity: PropTypes.string,
    id: PropTypes.number,
  }),
};

CreatureForm.defaultProps = {
  obj: initialState,
};

export default CreatureForm;
