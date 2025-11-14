import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <Alert variant="danger" className="p-5">
        <Alert.Heading className="display-1">404</Alert.Heading>
        <Alert.Heading>Page not found</Alert.Heading>
        <p className="mt-3">
          The page you are looking for does not exist or has been deleted.
        </p>
        <div className="mt-4">
          <Button 
            variant="primary" 
            onClick={() => navigate("/products")}
            className="me-2"
          >
            Back to Products
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default NotFoundPage;

