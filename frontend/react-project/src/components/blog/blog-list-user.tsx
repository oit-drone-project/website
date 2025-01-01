import React, { useEffect, useState } from 'react';
import { getPosts, Post } from './get-blog';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BlogListUser: React.FC = () => {
  /**
 * コンポーネント名: BlogListUser
 *
 * 概要:
 * - ユーザー向けのブログリストを表示するコンポーネント。
 * - 投稿の取得、作成、削除、詳細表示の操作が可能。
 *
 * 機能:
 * - 投稿リストの取得 (`fetchPosts`)
 * - 投稿の詳細ページへの移動 (`handleTitleClick`)
 *
 * 使用例:
 * <BlogListUser />
 *
 * 備考:
 * - Material-UIを使用してスタイリングしています。
 * - `getPosts`, `createPost`, `deletePost` などは別ファイルに定義されたAPI関数です。
 * - REACT_APP_DEVELOPER_MODEがfalseの場合のみ表示される
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

  const handleTitleClick = (id: number) => {
    navigate(`posts/${id}`);
  };

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      <h1>My Blog & Todo List</h1>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Blog Posts</h2>
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default BlogListUser;