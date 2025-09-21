import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container className="py-5 text-center">
      <div style={{ fontSize: 96, lineHeight: 1, fontWeight: 800, color: '#adb5bd' }}>404</div>
      <h2 className="mt-3">Page not found</h2>
      <p className="text-muted">The page you are looking for doesn’t exist or has been moved.</p>
      <div className="d-flex gap-2 justify-content-center">
        <Button onClick={() => navigate('/')}>Go Home</Button>
        <Button variant="outline-secondary" onClick={() => navigate('/campsites')}>Browse Campsites</Button>
      </div>
    </Container>
  );
};

export default NotFoundPage;
