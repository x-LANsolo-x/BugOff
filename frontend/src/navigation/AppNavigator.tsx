import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CookScreen from '../screens/CookScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import LiveCookingScreen from '../screens/LiveCookingScreen';
import AnalyzeScreen from '../screens/AnalyzeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Cook" component={CookScreen} />
      <Tab.Screen name="Analyze" component={AnalyzeScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ headerShown: true, title: 'Recipe' }} />
        <Stack.Screen name="LiveCooking" component={LiveCookingScreen} options={{ headerShown: true, title: 'Live Mode' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
