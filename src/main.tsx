import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { auth } from '@/firebase';
import { store } from '@/store';
import { App } from '@/App';
import { authUser, logout } from '@/features/Auth/store';
import { theme } from '@/theme';

const initApp = () => {
  const user = auth.currentUser;
  if (user) {
    store.dispatch(authUser({ token: user.accessToken, email: user.email || '' }));
  } else {
    store.dispatch(logout());
  }

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

if (auth.currentUser !== null) {
  initApp();
} else {
  onAuthStateChanged(auth, () => {
    initApp();
  });
}
