import React, { useEffect, useState } from 'react';
import { getPosts, deletePost, Post } from './get-blog';
import { Card, CardContent, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BlogListDeveloper: React.FC = () => {
/**
 * コンポーネント名: BlogListDeveloper
 *
 * 概要:
 * - 開発者向けのブログ管理コンポーネント。
 * - 投稿リストを表示し、新規投稿の作成や既存投稿の削除が可能。
 *
 * 機能:
 * - 投稿の取得 (`fetchPosts`)
 * - 投稿の削除 (`handleDelete`)
 * - 投稿詳細ページへのナビゲーション (`handleTitleClick`)
 * - 新規投稿ページへのナビゲーション
 *
 * 使用例:
 * <BlogListDeveloper />
 *
 * 備考:
 * - Material-UIを使用してスタイリングしています。
 * - `getPosts`と`deletePost`はAPIから投稿データを取得および削除する関数です。
 */
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    fetchPosts();
  };

  const handleTitleClick = (id: number) => {
    navigate(`posts/${id}`);
  };

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
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

export default BlogListDeveloper;