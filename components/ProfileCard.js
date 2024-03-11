import React from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function ProfileCard() {
  const { user } = useAuth();
  return (
    <Card className="card-shadow" style={{ width: '325px', height: '600px' }}>
      <Card.Header style={{ fontWeight: 'bold', fontSize: '2.0em', fontFamily: 'Courier New, monospace' }}>{user.fbUser.displayName}</Card.Header>
      <Card.Img
        variant="top"
        src={user.fbUser.photoURL}
        alt={user.fbUser.displayName}
        style={{
          height: '100%',
          width: '100%',
          boxShadow: '0px 1rem 1.5rem rgba(0, 0, 0, 0.5)',
          objectFit: 'fill',
        }}
      />
      <Card.Body style={{ fontSize: '1.9em', fontFamily: 'Andale Mono, monospace' }}>This is where a short bio would go.</Card.Body>
    </Card>
  );
}
