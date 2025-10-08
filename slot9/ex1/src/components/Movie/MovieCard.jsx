import React, { useState } from "react";
import { Button, Card, Badge, Modal, Toast, ToastContainer, Row, Col } from "react-bootstrap";
import movies from "../../data/movie";

function MovieCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });

  const handleToggleFavourites = (movie) => {
    const isAlreadyFavourite = favourites.some(fav => fav.id === movie.id);
    
    if (!isAlreadyFavourite) {
      // Add to favourites
      const newFavourites = [...favourites, movie];
      setFavourites(newFavourites);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
      setShowToast(true);
      console.log('Added to favourites:', movie.title);
    } else {
      // Remove from favourites
      const newFavourites = favourites.filter(fav => fav.id !== movie.id);
      setFavourites(newFavourites);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
      console.log('Removed from favourites:', movie.title);
    }
  };

  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <>
      <Row className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} md={6} lg={4}>
            <Card 
              className="shadow-sm" 
            >
              <Card.Img 
                variant="top" 
                src={movie.poster} 
                alt={movie.title}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h5 mb-3">{movie.title}</Card.Title>
                
                <Card.Text className="text-muted mb-3 flex-grow-1">
                  {truncateDescription(movie.shortDescription)}
                </Card.Text>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted">
                      <strong>Năm:</strong> {movie.year}
                    </small>
                    <small className="text-muted">
                      <strong>Quốc gia:</strong> {movie.country}
                    </small>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">
                      <strong>Thời lượng:</strong> {movie.duration} phút
                    </small>
                  </div>
                  <div className="mb-3">
                    {movie.genre.map((genre, index) => (
                      <Badge key={index} bg="secondary" className="me-1">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    variant={favourites.some(fav => fav.id === movie.id) ? "success" : "outline-primary"}
                    size="sm"
                    onClick={() => handleToggleFavourites(movie)}
                  >
                    {favourites.some(fav => fav.id === movie.id) ? "✓ Added to Favourites" : "Add to Favourites"}
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleViewDetails(movie)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for movie details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMovie && (
            <>
              <Row>
                <Col md={4}>
                  <img 
                    src={selectedMovie.poster} 
                    alt={selectedMovie.title}
                    className="img-fluid rounded"
                  />
                </Col>
                <Col md={8}>
                  <h5>Thông tin phim</h5>
                  <p><strong>Năm:</strong> {selectedMovie.year}</p>
                  <p><strong>Quốc gia:</strong> {selectedMovie.country}</p>
                  <p><strong>Thời lượng:</strong> {selectedMovie.duration} phút</p>
                  <p><strong>Thể loại:</strong> {selectedMovie.genre.join(', ')}</p>
                  
                  <h5 className="mt-4">Mô tả đầy đủ</h5>
                  <p>{selectedMovie.fullDescription}</p>
                  
                  <h5 className="mt-4">Lịch chiếu</h5>
                  <div className="list-group">
                    {selectedMovie.showtimes.map((showtime, index) => (
                      <div key={index} className="list-group-item">
                        <div className="d-flex justify-content-between">
                          <strong>{showtime.cinema}</strong>
                          <span className="text-muted">
                            {formatDateTime(showtime.datetime)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast notification */}
      <ToastContainer 
        position="top-end" 
        className="p-3" 
        style={{ 
          zIndex: 9999,
          position: 'fixed',
          top: '20px',
          right: '20px'
        }}
      >
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-success">✓ Thành công</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Added to favourites!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default MovieCard;
