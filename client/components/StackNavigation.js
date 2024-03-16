import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen } from 'react-native-screens'; 
import Register from './Register';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                 name="TabNavigation"
                 component={TabNavigation}
                 options={{ headerShown: false }}
                 />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigation;
