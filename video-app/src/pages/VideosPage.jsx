import { useVideoState } from "../context/videoContext";
import VideoCard from "../components/VideoCard";
import { Row, Col } from "react-bootstrap";

const VideosPage = () => {
    const { videos } = useVideoState();
    console.log("videos", videos);

    if (!Array.isArray(videos) || videos.length === 0) return null;
    return (
        <div>
            <Row className="justify-content-center">
                {videos.map((video) => (
                    <Col key={video.id} className="col-md-6 col-lg-6">
                        <VideoCard title={video.title} description={video.description} url={video.url} comments={video.comments} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default VideosPage;