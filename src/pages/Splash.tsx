import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';
import { LOGO, LOGO_WITH_NAME_BOTTOM } from '../contants/Images';
import {
  BACKGROUND_COLOR,
  GREEN_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { getCurrentProfile } from '../redux/reducer/user';

export default function Splash({ text = 'Loading', callback = null }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLogged = useSelector<RootState>(state => state.user.isLogged);

  useEffect(() => {
    if (callback) {
      callback(navigation);
    } else {
      setTimeout(() => {
        if (isLogged) {
          dispatch(
            getCurrentProfile({
              data: null,
              onSuccess: () => navigation.replace('Home'),
            }),
          );
        } else {
          navigation.replace('Wellcome');
        }
      }, 2000);
    }
  }, [isLogged]);

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.imageWrap}>
        <Image source={LOGO} style={styles.image} />
        <Text style={styles.appName}>My Finance</Text>
      </View>
      <ActivityIndicator color={PRIMARY_COLOR} size={30} />
      <Text style={styles.text}>{text}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
  },
  imageWrap: {
    height: 400,
    width: 150,
    margin: 'auto',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  text: {
    color: WHITE_COLOR,
    marginTop: 10,
  },
  appName: {
    textAlign: 'center',
    fontSize: 22,
    color: GREEN_COLOR,
    marginTop: 10,
  },
});
