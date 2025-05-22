import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export interface User {
  id: string;
  name: string;
  profileImageUrl: string;
  description: string;
  link?: string;
  showInstagramBadge?: boolean;
  isPrivate?: boolean;
}

export const AuthContext = createContext<{
  user: User | null;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = () => {
    console.log('onLogin');
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'huun',
        password: '123456',
      }),
    })
      .then((res) => {
        console.log('res', res, res.status);
        if (res.status === 401) {
          return Alert.alert('Invalid username or password');
        }
        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        setUser(data.user);
        return Promise.all([
          SecureStore.setItemAsync('accessToken', data.accessToken),
          SecureStore.setItemAsync('refreshToken', data.refreshToken),
          AsyncStorage.setItem('user', JSON.stringify(data.user)),
        ]);
      })
      .then(() => {
        router.replace('/(tabs)');
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  const logout = () => {
    setUser(null);
    return Promise.all([
      SecureStore.deleteItemAsync('accessToken'),
      SecureStore.deleteItemAsync('refreshToken'),
      AsyncStorage.removeItem('user'),
    ]);
  };

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      setUser(user ? JSON.parse(user) : null);
    });

    // TODO: check access token
  }, []);

  return (
    <AuthContext value={{ user, login, logout }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ presentation: 'modal' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </AuthContext>
  );
}
