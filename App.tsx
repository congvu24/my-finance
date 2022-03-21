/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/redux';
import LoginScreen from './src/pages/LoginScreen';
import WellcomeScreen from './src/pages/WellcomeScreen';
import SignUpScreen from './src/pages/SignUpScreen';
import HomeScreen from './src/pages/HomeScreen';
import AddTransactionScreen from './src/pages/AddTransactionScreen';
import AddInvestCoin from './src/pages/AddInvestCoin';
import OverviewSpending from './src/pages/OverviewSpending';
import OverviewInvest from './src/pages/OverviewInvest';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <Stack.Screen name="Wellcome" component={WellcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransactionScreen}
            options={{
              animation: 'fade_from_bottom',
            }}
          />
          <Stack.Screen
            name="AddInvestCoin"
            component={AddInvestCoin}
            options={{
              animation: 'fade_from_bottom',
            }}
          />
          <Stack.Screen
            name="OverviewSpending"
            component={OverviewSpending}
            options={{
              animation: 'fade_from_bottom',
            }}
          />
          <Stack.Screen
            name="OverviewInvest"
            component={OverviewInvest}
            options={{
              animation: 'fade_from_bottom',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
