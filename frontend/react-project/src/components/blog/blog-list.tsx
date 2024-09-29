import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { getPosts, createPost, deletePost, Post } from './get-blog';
import { Card, CardContent, TextField, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BlogList: React.FC = () => {
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

  const handleTitleClick = (id: number) => {
    navigate(`posts/${id}`);
  };

  return (
    <div className="App" style={{ maxWidth: '950px', margin: '0 auto' }}>
      <h1>My Blog & Todo List</h1>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Blog Posts</h2>
        <Button variant="contained" color="primary" onClick={() => navigate('create')}>
          Create New Post
        </Button>
        <Grid container spacing={2}>
          {posts.map(post => (
            <Grid item xs={12} sm={6} md={3} key={post.id} style={{ display: 'flex' }}>
              <Card onClick={() => handleTitleClick(post.id!)} style={{ width: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" style={{ lineHeight: '1.2em', height: '2.4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {post.title.length > 50 
                      ? `${post.title.substring(0, 50)}...`
                      : post.title}
                  </Typography>
                  <Typography variant="body2" component="p" style={{ lineHeight: '1.5em', height: '4.5em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {post.content.length > 100 
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from firing
                    handleDelete(post.id!);
                  }}
                  style={{ marginTop: '1rem' }}
                >
                  Delete
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default BlogList;