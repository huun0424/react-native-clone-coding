import { AuthContext } from '@/app/_layout';
import { BlurView } from 'expo-blur';
import { usePathname, useRouter } from 'expo-router';
import { useContext } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = !!user;

  const { width, height } = Dimensions.get('window');
  console.log('화면 너비: ', width);
  console.log('화면 너비(px): ', width * PixelRatio.get(), 'px');
  console.log('화면 높이: ', height);
  console.log('화면 높이(px): ', height * PixelRatio.get(), 'px');

  return (
    <SafeAreaView style={styles.container}>
      <BlurView intensity={70} style={styles.header}>
        <Image
          source={require('../../../assets/images/react-logo.png')}
          style={styles.headerLogo}
        />
        {!isLoggedIn && (
          <TouchableOpacity
            style={styles.headerLoginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.headerLoginButtonText}>로그인</Text>
          </TouchableOpacity>
        )}
      </BlurView>

      {isLoggedIn && (
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.replace('/')}>
              <Text style={{ color: pathname === '/' ? 'red' : 'gray' }}>
                For you
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.replace('/following')}>
              <Text
                style={{ color: pathname === '/following' ? 'red' : 'gray' }}
              >
                Following
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View>
        <TouchableOpacity onPress={() => router.push('/@huun/post/1')}>
          <Text>게시글1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push('/@huun/post/2')}>
          <Text>게시글2</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push('/@huun/post/3')}>
          <Text>게시글3</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  headerLogo: {
    width: 42,
    height: 42,
  },
  headerLoginButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerLoginButtonText: {
    color: 'white',
  },
});
