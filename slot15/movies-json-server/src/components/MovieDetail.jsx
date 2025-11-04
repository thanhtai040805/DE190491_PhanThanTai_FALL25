// src/components/MovieForm.jsx
import {
  Form,
  Row,
  Col,
  Image,
} from "react-bootstrap";

// Component con tái sử dụng cho các trường input
export const MovieDetail = ({
  currentMovie,
  handleInputChange,
  imagePreview,
  genres,
  errors = {},
  validated = false,
}) => (
  <>
    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formAvatar">
          <Form.Label>Ảnh Avatar Phim</Form.Label>
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                thumbnail
                style={{ maxWidth: "200px", maxHeight: "150px" }}
              />
            </div>
          )}
        </Form.Group>
      </Col>

      <Col md={8}>
        <Row className="mb-3">
          <Form.Group controlId="formTitle">
            <Form.Label>
              Tên Phim <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={currentMovie.title || ""}
              placeholder="Tên phim"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formDescription">
            <Form.Label>
              Mô tả <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={currentMovie.description || ""}
              placeholder="Mô tả phim"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="formGenre">
              <Form.Label>
                Thể loại <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="genreId"
                value={currentMovie.genreId || ""}
              >
                <option value="">Chọn thể loại</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formDuration">
              <Form.Label>
                Thời lượng (phút) <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={currentMovie.duration || ""}
                placeholder="Phút"
                min="1"
                max="600"
              />
              <Form.Control.Feedback type="invalid">
                {errors.duration}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formYear">
              <Form.Label>
                Năm <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={currentMovie.year || ""}
                onChange={handleInputChange}
                placeholder="Năm"
                required
                min="1900"
                max="2030"
                isInvalid={validated && errors.year}
                isValid={validated && !errors.year && currentMovie.year}
              />
              <Form.Control.Feedback type="invalid">
                {errors.year}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formCountry">
              <Form.Label>
                Quốc gia <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={currentMovie.country || ""}
                placeholder="Quốc gia"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Col>
    </Row>
  </>
);
