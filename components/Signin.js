import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
        fontFamily: 'Courier New, monospace',
      }}
    >
      <h1>Welcome to Creature Creations!</h1>
      <p>Click the button below to sign in!</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn} style={{ width: '200px' }}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
