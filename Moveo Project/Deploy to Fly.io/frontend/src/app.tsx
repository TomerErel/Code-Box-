import React from 'react';
import { AppShell } from '@mantine/core';
import { Routing } from './components/routing/routing';
import { BrowserRouter } from 'react-router-dom';
import { LobbyPage } from './components/lobbyPage';

export const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <AppShell
          padding="md"
          styles={(theme) => ({
            main: { backgroundColor: theme.colors.indigo[2] },
          })}
        >
          <Routing />
        </AppShell>
      </BrowserRouter>
    </div>

  );
};
