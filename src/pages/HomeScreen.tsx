import React from 'react';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { PRIMARY_COLOR, WHITE_COLOR } from '../contants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from '../components/TabBar';
import HomeTab from './HomeTab';
import SpendingTab from './SpendingTab';
import InvestTab from './InvestTab';
import ProifleTab from './ProifleTab';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <AntdIcon
              name="home"
              style={{
                fontSize: 18,
                color: WHITE_COLOR,
                opacity: focused ? 1 : 0.5,
                fontWeight: focused ? '500' : '400',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ManageTab"
        component={SpendingTab}
        options={{
          title: 'Spending',
          tabBarIcon: ({ focused }) => (
            <AntdIcon
              name="tago"
              style={{
                fontSize: 18,
                color: WHITE_COLOR,
                opacity: focused ? 1 : 0.5,
                fontWeight: focused ? '500' : '400',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="InvestTab"
        component={InvestTab}
        options={{
          title: 'Invest',
          tabBarIcon: ({ focused }) => (
            <AntdIcon
              name="linechart"
              style={{
                fontSize: 18,
                color: WHITE_COLOR,
                opacity: focused ? 1 : 0.5,
                fontWeight: focused ? '500' : '400',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OptionTab"
        component={ProifleTab}
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <AntdIcon
              name="user"
              style={{
                fontSize: 18,
                color: WHITE_COLOR,
                opacity: focused ? 1 : 0.5,
                fontWeight: focused ? '500' : '400',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
