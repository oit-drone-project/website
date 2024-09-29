import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { getPosts, createPost, deletePost, Post } from './get-blog';
import { Card, CardContent, TextField, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const CreateBlog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Partial<Post>>({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      await createPost(newPost as Post);
      fetchPosts();
      setNewPost({ title: '', content: '' });
    }
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    fetchPosts();
  };

  return (
    <div className="App" style={{ maxWidth: '950px', margin: '0 auto'}}>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          戻る
        </Button>
      <h1>My Blog & Todo List</h1>
      <div style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="title"
            label="Title"
            value={newPost.title || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="content"
            label="Content"
            value={newPost.content || ''}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" onClick={() => navigate(-1)}>
            Create Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;