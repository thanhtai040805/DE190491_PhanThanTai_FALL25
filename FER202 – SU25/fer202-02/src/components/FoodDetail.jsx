import React from "react";
import { Card, Button } from "react-bootstrap";
import { useStoreDispatch } from "../context/storeContex";


export default function FoodDetail( { product } ) {
    const { handleCreateOrUpdate } = useStoreDispatch();


    const handleBuy = () => {
        if (product.stock > 0) {
            const newProduct = { ...product, stock: product.stock - 1 };
            handleCreateOrUpdate(newProduct, true, newProduct.id);
        } else {
            alert("Sản phẩm đã hết hàng");
        }
    }

  return (
    <Card className="mb-3 p-0 align-items-center text-center bg-light gap-2 rounded-0">
        <Card.Img src={product.img} alt={product.name} className="card-img-top" style={{ width: "100%", height: "200px", objectFit: "cover" }}  />
        <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text> Giá: {product.price} VNĐ</Card.Text>
            <Card.Text> Số lượng: {product.stock}</Card.Text>
        </Card.Body>
        <Button variant="success" className="w-100 rounded-0" onClick={handleBuy}>Mua ngay</Button>
    </Card>
  );
}