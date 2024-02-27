import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCreature } from '../../../api/CreatureData';
import CreatureForm from '../../../components/CreatureForm';

export default function EditCreature() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the id-key
  const { id } = router.query;

  // make a call to the API to get the creature data
  useEffect(() => {
    getSingleCreature(id).then(setEditItem);
  }, [id]);

  // pass object to form
  return (<CreatureForm obj={editItem} />);
}
