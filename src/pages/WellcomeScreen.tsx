import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import React from 'react';
import MyButton from '../components/Button';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../contants/Colors';
import { LOGO } from '../contants/Images';
import WellcomeCarousel from '../components/WellcomeCarousel';

export default function WellcomeScreen({ navigation }: { navigation: any }) {
  const goLogin = () => {
    navigation.navigate('Login');
  };

  const goSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.container}>
        <View style={styles.logoWrap}>
          <Image source={LOGO} style={styles.logo} />
        </View>
        <WellcomeCarousel />
      </View>
      <View style={styles.buttonWrap}>
        <MyButton text={'ĐĂNG KÝ MIỄN PHÍ'} onPress={goSignUp} />
        <MyButton
          text={'ĐĂNG NHẬP'}
          style={{
            text: { color: PRIMARY_COLOR },
            wrap: { backgroundColor: SECONDARY_COLOR },
          }}
          onPress={goLogin}
        />
        <Text style={styles.versionText}>Phiên bản 1.1.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: 'white' },
  container: {
    flex: 1,
  },
  buttonWrap: {
    padding: 10,
    justifyContent: 'space-between',
    height: 150,
  },
  versionText: {
    textAlign: 'center',
    alignSelf: 'center',
    margin: 'auto',
    fontSize: 11,
  },
  logoWrap: {
    height: 50,
    display: 'flex',
    margin: 10,
  },
  logo: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
  },
});
