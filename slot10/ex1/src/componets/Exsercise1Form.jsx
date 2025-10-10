import { Form, InputGroup, Button, Row, Col, Alert } from "react-bootstrap";

export const Exercise1Form = () => {
  const formData = {
    fullName: "",
    address: "",
    from: "Hà nội",
    to: "Hà nội",
    tripType: "Đi",
  };


  return (
    <div className="container mt-4" style={{maxWidth: "600px"}}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Alert variant="warning" className="text-center">
            <strong>Thông báo:</strong> Vui lòng điền đầy đủ thông tin để đặt vé
          </Alert>
          
          <h1 className="text-center mb-4">Form đặt vé máy bay</h1>
          
          <Form>
            {/* Họ tên */}
            <Form.Group className="mb-3">
              <Form.Label>Họ tên</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  placeholder="Họ tên"
                  required
                />
              </InputGroup>
              <Form.Text className="text-muted">
                Phải nhập 5 ký tự, in hoa....
              </Form.Text>
            </Form.Group>

            {/* Địa chỉ */}
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                placeholder="Địa chỉ"
                required
              />
              <Form.Text className="text-muted">
                Phải nhập 5 ký tự, in hoa....
              </Form.Text>
            </Form.Group>

            {/* Đi từ và Đến */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Đi từ</Form.Label>
                  <Form.Select
                    name="from"
                    value={formData.from}
                  >
                    <option value="Hà nội">Hà nội</option>
                    <option value="TP.HCM">TP.HCM</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Nha Trang">Nha Trang</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Đến</Form.Label>
                  <Form.Select
                    name="to"
                    value={formData.to}
                  >
                    <option value="Hà nội">Hà nội</option>
                    <option value="TP.HCM">TP.HCM</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Nha Trang">Nha Trang</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Chọn chiều đi */}
            <Form.Group className="mb-4">
              <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Đi"
                  name="tripType"
                  value="Đi"
                  checked={formData.tripType === "Đi"}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Về"
                  name="tripType"
                  value="Về"
                  checked={formData.tripType === "Về"}
                />
              </div>
            </Form.Group>

            {/* Nút Đặt vé */}
            <div className="text-center">
              <Button variant="primary" type="submit" size="lg">
                Đặt vé
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
