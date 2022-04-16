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
import {
  ActivityIndicator,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux';
import LoginScreen from './src/pages/LoginScreen';
import WellcomeScreen from './src/pages/WellcomeScreen';
import SignUpScreen from './src/pages/SignUpScreen';
import HomeScreen from './src/pages/HomeScreen';
import AddTransactionScreen from './src/pages/AddTransactionScreen';
import AddInvestCoin from './src/pages/AddInvestCoin';
import OverviewSpending from './src/pages/OverviewSpending';
import OverviewInvest from './src/pages/OverviewInvest';
import AddInvestGold from './src/pages/AddInvestGold';
import AddInvestStock from './src/pages/AddInvestStock';
import MoneySource from './src/pages/MoneySource';
import AddMoneySource from './src/pages/AddMoneySource';
import { BACKGROUND_COLOR, SECONDARY_BG_COLOR } from './src/contants/Colors';
import Splash from './src/pages/Splash';
import { RootSiblingParent } from 'react-native-root-siblings';
import LoadingModal from './src/components/LoadingModal';
import { PersistGate } from 'redux-persist/integration/react';
import Test from './src/pages/Test';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <StatusBar backgroundColor={BACKGROUND_COLOR} hidden={false} />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}>
              <Stack.Screen name="Test" component={Test} />
              <Stack.Screen name="Splash" component={Splash} />
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
              <Stack.Screen
                name="AddInvestGold"
                component={AddInvestGold}
                options={{
                  animation: 'fade_from_bottom',
                }}
              />
              <Stack.Screen
                name="AddInvestStock"
                component={AddInvestStock}
                options={{
                  animation: 'fade_from_bottom',
                }}
              />
              <Stack.Screen
                name="MoneySource"
                component={MoneySource}
                options={{
                  animation: 'fade_from_bottom',
                }}
              />
              <Stack.Screen name="AddMoneySource" component={AddMoneySource} />
            </Stack.Navigator>
          </NavigationContainer>
          <LoadingModal />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};
export default App;
