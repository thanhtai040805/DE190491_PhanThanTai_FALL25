import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const VideoCard = ({title, description, url, comments}) => {

    return (
      <Card className="mb-3 p-0 bg-light gap-2 rounded-0">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <iframe
            width="100%"
            height="400px"
            src={url}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <Card.Title>Comments</Card.Title>
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>{comment.text}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    );
};

VideoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default VideoCard;