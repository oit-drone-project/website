import React from 'react';
import {Routes, Route } from 'react-router-dom';
import MediaMain from '../components/sky-view/main';
import MediaDetails from '../components/sky-view/detail';
import './css/Media.css';

const SkyView: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MediaMain />} />
      <Route path="/details/:title" element={<MediaDetails />} />
    </Routes>
  );
};

export default SkyView;