import React from 'react';
import { Modal } from 'react-bootstrap';

const VideoModal = ({ show, handleClose, videoId }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered contentClassName="bg-dark border-0 p-0">
      <Modal.Body className="p-0 position-relative bg-dark">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '2rem',
            zIndex: 2,
            lineHeight: 1,
            cursor: 'pointer'
          }}
        >
          &times;
        </button>
        <div className="ratio ratio-16x9">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allowFullScreen
            className="w-100 h-100"
          ></iframe>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
