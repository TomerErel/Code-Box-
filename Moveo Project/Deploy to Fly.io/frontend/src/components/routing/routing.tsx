import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CodeBoxDetails } from '../codeBoxDetails';
import { LobbyPage } from '../lobbyPage';

export const Routing: React.FC = () => {
  return (
    <Routes>

      <Route path="/:title" element={<CodeBoxDetails />} />
      <Route path="/" element={<LobbyPage />} />
    </Routes>


  );
};
