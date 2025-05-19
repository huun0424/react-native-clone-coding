import { Redirect, router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Login() {
  const isLoggedIn = false;

  const insets = useSafeAreaInsets();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  const onLogin = () => {
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
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>

      <Pressable style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
  },
});
