import { clientCredentials } from '../utils/client';

const getCreatures = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/creatures`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createCreature = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/creatures`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateCreature = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/creatures/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

const getSingleCreature = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/creatures/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleCreature = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/creatures/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch(reject);
});

const getMyCreatures = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/creatures?user=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getRandomCreature = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/creatures/random/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch random creature');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCreatures, createCreature, updateCreature, deleteSingleCreature, getSingleCreature, getRandomCreature, getMyCreatures,
};
