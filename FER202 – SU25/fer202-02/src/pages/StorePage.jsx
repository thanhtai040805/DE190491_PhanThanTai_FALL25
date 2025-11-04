import { useStoreState } from "../context/storeContex";
import { Row, Col } from "react-bootstrap";
import FoodDetail from "../components/FoodDetail";

export default function StorePage() {   
    const { store } = useStoreState();
    console.log("store", store);
    return (
        <div className="container mt-4 mb-4">
            <Row>
                {Array.isArray(store.products) && store.products.map((product) => (
                    <Col key={product.id}>
                        <FoodDetail product={product} />
                    </Col>
                ))}
            </Row>
        </div>
  );
}