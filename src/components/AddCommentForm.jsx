import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const AddCommentForm = ({ onCommentAdded }) => {
  const [newComment, setNewComment] = useState({
    spotifyTrackUrl: '',
    text: '',
  });
  const { auth } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleAddComment = async (e) => {
    e.preventDefault();
    setError('');

    const { spotifyTrackUrl, text } = newComment;

    if (!spotifyTrackUrl.trim() || !text.trim()) {
      setError('Please provide both Spotify Track URL and comment text.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5129/api/comments',
        {
          spotifyTrackUrl: spotifyTrackUrl.trim(),
          text: text.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 201) {
        setNewComment({ spotifyTrackUrl: '', text: '' });
        onCommentAdded(); // Notify parent to refresh comments
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors.join(' '));
      } else {
        setError('Failed to add comment. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleAddComment} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="spotifyTrackUrl">Spotify Song Link:</label><br />
        <input
          type="url"
          id="spotifyTrackUrl"
          placeholder="https://open.spotify.com/track/..."
          value={newComment.spotifyTrackUrl}
          onChange={(e) => setNewComment({ ...newComment, spotifyTrackUrl: e.target.value })}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="text">Comment:</label><br />
        <textarea
          id="text"
          placeholder="..."
          value={newComment.text}
          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
          style={styles.textarea}
          required
        />
      </div>
      <button type="submit" style={styles.button}>Add Comment</button>
      {error && <div style={styles.error}>{error}</div>}
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.5rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    resize: 'vertical',
  },
  button: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
  },
};

export default AddCommentForm;
