import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from "../screens/HomeScreen";
import { AddNewMember } from "../screens/AddNewMember";
import { MemberDetails } from "../screens/MemberDetails";

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='AddNewMember' component={AddNewMember} options={{title: ''}}  />
        <Stack.Screen name='MemberDetails' component={MemberDetails} options={{title: ''}}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}