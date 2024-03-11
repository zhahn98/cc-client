import React from 'react';
import { Card } from 'react-bootstrap';

export default function HomeInfo() {
  return (
    <Card className="card-shadow" style={{ width: '600px', height: '375px' }}>
      <Card.Header style={{ fontWeight: 'bold', fontSize: '2.0em', fontFamily: 'Courier New, monospace' }}>What are Creature Creations?</Card.Header>
      <Card.Body style={{ fontSize: '1.9em', fontFamily: 'Andale Mono, monospace' }}>This web app allows you to upload your digital art, and turn it into pretend collectible Trading Cards that are brought to life by assigning details such as lore, habitat categories, and more!</Card.Body>
    </Card>
  );
}
