import { useRouter } from 'expo-router';
import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();

  const { width, height } = Dimensions.get('window');
  console.log('화면 너비: ', width);
  console.log('화면 너비(px): ', width * PixelRatio.get(), 'px');
  console.log('화면 높이: ', height);
  console.log('화면 높이(px): ', height * PixelRatio.get(), 'px');

  return (
    <SafeAreaView style={styles.container}>
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
});
