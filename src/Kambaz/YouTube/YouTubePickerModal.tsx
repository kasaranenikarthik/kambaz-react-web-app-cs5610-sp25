// 1. YouTubePickerModal.tsx
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as youtubeClient from "./YTclient";

export default function YouTubePickerModal({
  show,
  onHide,
  onVideoSelect,
}: {
  show: boolean;
  onHide: () => void;
  onVideoSelect: (video: any) => void;
}) {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);

  const searchVideos = async () => {
    const result = await youtubeClient.searchYouTubeKeywords(query);
    setVideos(result);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Attach a YouTube Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex mb-3">
          <Form.Control
            type="text"
            placeholder="Search for a video"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchVideos} className="ms-2">
            Search
          </Button>
        </Form>
        <div className="row">
          {videos && videos.map((video) => (
            <div className="col-md-4 mb-3" key={video.id.videoId}>
              <div className="card">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  className="card-img-top"
                  alt={video.snippet.title}
                />
                <div className="card-body">
                  <h6 className="card-title text-truncate">
                    {video.snippet.title}
                  </h6>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => {
                      onVideoSelect(video);
                      onHide();
                    }}
                  >
                    Attach
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
