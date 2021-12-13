import { initializeApp } from 'firebase/app';
import { getAuth, Auth, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCifSQngddgeVZLb28rwcAqFggAavwQsHQ',
  authDomain: 'hotel-5c234.firebaseapp.com',
  databaseURL: 'https://hotel-5c234.firebaseio.com',
  projectId: 'hotel-5c234',
  storageBucket: 'hotel-5c234.appspot.com',
  messagingSenderId: '375331153260',
  appId: '1:375331153260:web:e43e5eeed9dc5b0a12ff49',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) as Auth & {
  currentUser: (User & { accessToken: string }) | null;
};
