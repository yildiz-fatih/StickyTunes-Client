import React from 'react';

const Comment = ({ comment }) => {
  // Function to format the date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Use spotifyTrackId directly as provided by the API
  const spotifyTrackId = comment.spotifyTrackId;

  return (
    <div style={styles.comment}>
      <p style={styles.commentContent}>{comment.text}</p>
      <p style={styles.commentDate}>Posted on: {formatDate(comment.datePosted)}</p>

      {/* Embedded Spotify Player */}
      {spotifyTrackId ? (
        <div style={styles.spotifyPlayer}>
          <iframe
            src={`https://open.spotify.com/embed/track/${spotifyTrackId}`}
            width="300"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Player"
          ></iframe>
        </div>
      ) : (
        <p style={styles.error}>Invalid Spotify Track ID.</p>
      )}
    </div>
  );
};

const styles = {
  comment: {
    padding: '1rem',
    backgroundColor: '#fffae6',
    border: '1px solid #ffe58f',
    borderRadius: '8px',
    position: 'relative',
  },
  commentContent: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  commentDate: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.9rem',
    color: '#555',
  },
  spotifyPlayer: {
    marginBottom: '0.5rem',
  },
  error: {
    color: 'red',
    marginBottom: '0.5rem',
  },
};

export default Comment;
