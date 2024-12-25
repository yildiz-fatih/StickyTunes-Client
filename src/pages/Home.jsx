import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import AddCommentForm from '../components/AddCommentForm';
import Comment from '../components/Comment';

const Home = () => {
  const [comments, setComments] = useState([]);
  const { auth } = useContext(AuthContext); // Access auth state
  const [error, setError] = useState('');

  // Fetch all comments on component mount
  useEffect(() => {
    fetchComments();
  }, []);

  // Function to fetch comments
  const fetchComments = async () => {
    setError('');
    try {
      const response = await axios.get('http://localhost:5129/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Add Comment Form */}
      {auth.token && (
        <AddCommentForm onCommentAdded={fetchComments} />
      )}

      {/* Error Message */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Comments List */}
        <div style={styles.commentsContainer}>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          )}
        </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  commentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default Home;
