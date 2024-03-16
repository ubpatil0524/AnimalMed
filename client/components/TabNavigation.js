import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UpcomingDetails from './UpcomingDetials';
import MainDetails from './MainDetails';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => {
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="MainDetails"
                component={MainDetails}
                options={{
                    tabBarLabel: 'MainDetails',
                    tabBarIcon: ({ color, size }) => ( 
                        <MaterialIcons name="details" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="UpcomingDetails"
                component={UpcomingDetails}
                options={{
                    tabBarLabel: 'Upcoming',
                    tabBarIcon: ({ color, size }) => ( 
                        <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            
        </Tab.Navigator>
    );
};

export default TabNavigation;