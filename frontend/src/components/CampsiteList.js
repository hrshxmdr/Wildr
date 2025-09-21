import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import './CampsiteList.css';

const CampsiteList = ({ campsites, onSelect }) => {
  return (
    <Row className="campsite-list g-4">
      {campsites.map((c) => {
        const first = (Array.isArray(c.images) && c.images.length > 0) ? c.images[0] : (c.coverImage || c.image);
        const cover = typeof first === 'string'
          ? first
          : (first && first.url) || c.coverImage || c.image || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop';
        const desc = c.description && c.description.trim().length > 0 ? c.description : 'Description coming soon.';
        const location = c.location || 'Location TBA';
        const tags = Array.isArray(c.tags) ? c.tags.slice(0, 3) : [];
        return (
          <Col md={6} lg={4} key={c.id}>
            <Card className="campsite-card h-100" onClick={() => onSelect && onSelect(c)} style={{ cursor: onSelect ? 'pointer' : 'default' }}>
              <div className="image-wrap">
                <img src={cover} alt={c.name} />
                <div className="location-pill">{location}</div>
              </div>
              <Card.Body>
                <Card.Title className="mb-1">{c.name}</Card.Title>
                <Card.Text className="text-muted small mb-2 line-clamp-2">{desc}</Card.Text>
                <div className="d-flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Badge bg="success" key={t}>{t}</Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CampsiteList;
