import { clientCredentials } from '../utils/client';

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const addCategoryToCreature = (creatureId, categoryIdObject) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/creatures/${creatureId}/add_category_to_creature`, {
    method: 'POST',
    body: JSON.stringify({ categoryId: categoryIdObject }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

const removeCategoryfromCreature = (creatureId, categoryIdObject) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/creatures/${creatureId}/remove_category_from_creature`, {
    method: 'DELETE',
    body: JSON.stringify({ categoryId: categoryIdObject }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

export {
  getCategories,
  addCategoryToCreature,
  removeCategoryfromCreature,
};
