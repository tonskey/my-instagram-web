import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { onAuthStateChanged, User } from 'firebase/auth';

import { tokenSelector, emailSelector } from '@/features/Auth/store';

export const useAuth = () => {
  const email = useSelector(tokenSelector);
  const token = useSelector(emailSelector);

  return {
    isAuth: !!token,
    token,
    email,
  };
};
