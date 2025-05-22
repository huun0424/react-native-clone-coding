import { AuthContext } from '@/app/_layout';
import SideMenu from '@/components/SideMenu';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function Layout() {
  const { user } = useContext(AuthContext);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const insets = useSafeAreaInsets();

  const isLoggedIn = !!user;

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

      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: user?.profileImageUrl ?? 'https://picsum.photos/200/300',
            }}
            style={styles.profileImage}
          />
          <Text>{user?.name}</Text>
          <Text>{user?.id}</Text>
          <Text>{user?.description}</Text>
        </View>
      </View>

      <MaterialTopTabs
        screenOptions={{
          lazy: true,
          tabBarStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
            position: 'relative',
          },
          tabBarPressColor: 'transparent',
          tabBarActiveTintColor: '#555',
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
            height: 1,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: '#aaa',
            position: 'absolute',
            top: 49,
            height: 1,
          },
        }}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: 'Threads' }} />
        <MaterialTopTabs.Screen name="replies" options={{ title: 'Replies' }} />
        <MaterialTopTabs.Screen name="reposts" options={{ title: 'Reposts' }} />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  profile: {
    padding: 10,
  },
  profileHeader: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,
  },
});
