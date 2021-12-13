import { FC } from 'react';
import { Container } from '@mui/material';

import { Routes } from '@/routing/Routes';

export const App = () => (
  <Container disableGutters={true} maxWidth={false}>
    <Routes />
  </Container>
);
