import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlogList from '../components/blog/blog-list';
import CreateBlog from '../components/blog/create-blog';
import BlogDetail from '../components/blog/blog-detail';


const Blog: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/posts/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
};

export default Blog;