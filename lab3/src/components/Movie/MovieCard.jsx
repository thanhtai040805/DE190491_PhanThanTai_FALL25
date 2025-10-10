import React from "react";
import { Button, Card, Badge} from "react-bootstrap";
// import "./MovieCard.css";

export default function MovieCard({ 
  id,
  img, 
  title, 
  text, 
  genre, 
  year,
  country,
  duration
}) {
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  const handleViewDetails = () => {
    // Simple alert for now since we don't use state
    alert(`Movie Details:\nTitle: ${title}\nYear: ${year}\nCountry: ${country}\nDuration: ${duration} minutes\n\nDescription: ${text}`);
  };

  return (
    <>
      <Card 
        className="shadow-sm" 
        style={{ width: "18rem", height: "100%" }}
      >
        <Card.Img 
          variant="top" 
          src={img} 
          alt={title}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="h5 mb-3">{title}</Card.Title>
          
          <Card.Text className="text-muted mb-3 flex-grow-1">
            {truncateDescription(text)}
          </Card.Text>

          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <small className="text-muted">
                <strong>Năm:</strong> {year || "N/A"}
              </small>
              <small className="text-muted">
                <strong>Quốc gia:</strong> {country || "N/A"}
              </small>
            </div>
            <div className="mb-2">
              <small className="text-muted">
                <strong>Thời lượng:</strong> {duration || "N/A"} phút
              </small>
            </div>
            <div className="mb-3">
              {genre && Array.isArray(genre) ? (
                genre.map((g, index) => (
                  <Badge key={index} bg="secondary" className="me-1">
                    {g}
                  </Badge>
                ))
              ) : (
                <Badge bg="secondary">{genre}</Badge>
              )}
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
