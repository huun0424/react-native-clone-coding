import { usePathname, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={{ color: pathname === '/' ? 'red' : 'gray' }}>
            For you
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push('/following')}>
          <Text style={{ color: pathname === '/following' ? 'red' : 'gray' }}>
            Following
          </Text>
        </TouchableOpacity>
      </View>

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
    </View>
  );
}
