import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './components/MapScreen';
import HomeScreen from './components/HomeScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Map') {
                iconName = 'gamepad';
              }
              else if (route.name === 'Home') {
                iconName = 'home';
              }
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            tabBarActiveTintColor: '#0088B4',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { ...styles.tabBarStyle },
            headerStyle: {
              backgroundColor: 'black',
              height: '6%',
            },
            headerTitleStyle: {
              color: '#0088B4',
            },
          })}

        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',

  },

  font: {
    color: 'white'
  },

  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'black',
    borderTopWidth: 1,
    borderTopColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    zIndex: 999,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default App;
