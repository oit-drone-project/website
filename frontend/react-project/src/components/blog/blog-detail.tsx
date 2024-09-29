import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, Post } from './get-blog';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(Number(id)); // getPostById を使用
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!post) return <div>Post not found</div>;

  return (
    <Card style={{ maxWidth: '950px', margin: '0 auto', marginTop: '2rem' }}>
      <CardContent>
        <Typography variant="h4" component="h2">
          {post.title}
        </Typography>
        <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogDetail;