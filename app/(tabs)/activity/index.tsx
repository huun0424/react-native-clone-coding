import NotFound from '@/app/+not-found';
import { AuthContext } from '@/app/_layout';
import SideMenu from '@/components/SideMenu';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const { user } = useContext(AuthContext);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const isLoggedIn = !!user;

  if (
    ![
      '/activity',
      '/activity/follows',
      '/activity/replies',
      '/activity/mentions',
      '/activity/quotes',
      '/activity/reposts',
      '/activity/verified',
    ].includes(pathname)
  ) {
    return <NotFound />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        {isLoggedIn && (
          <Pressable
            style={styles.menuButton}
            onPress={() => setIsSideMenuOpen((prev) => !prev)}
          >
            <Ionicons name="menu" size={24} color="black" />
          </Pressable>
        )}

        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </View>

      <View style={styles.tabBar}>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity`)}>
            <Text>All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/follows`)}>
            <Text>Follows</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/replies`)}>
            <Text>Replies</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/mentions`)}>
            <Text>Mentions</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/quotes`)}>
            <Text>Quotes</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/reposts`)}>
            <Text>Reposts</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/verified`)}>
            <Text>Verified</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    height: 50,
  },
  menuButton: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
