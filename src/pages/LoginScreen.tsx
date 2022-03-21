import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { LOGO } from '../contants/Images';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../contants/Colors';
import MyButton from '../components/Button';
import HorizontalDivider from '../components/HorizontalDivider';
import MyButtonWithIcon from '../components/ButtonWithIcon';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const passwordInputRef = useRef<TextInput>(null);

  const onBack = () => {
    navigation.goBack();
  };

  const goSignUp = () => {
    navigation.replace('Signup');
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <TouchableOpacity onPress={onBack}>
        <Icon name="arrowleft" size={20} />
      </TouchableOpacity>
      <View style={styles.logoWrap}>
        <Image source={LOGO} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </View>
      <View>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Số điện thoại"
            style={styles.input}
            keyboardType="phone-pad"
            onSubmitEditing={() => {
              console.log('he');
              passwordInputRef.current?.focus();
            }}
          />
          <TextInput
            ref={passwordInputRef}
            placeholder="Mật khẩu"
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <MyButton
          text={'ĐĂNG NHẬP'}
          style={{
            wrap: styles.loginBtn,
            text: {},
          }}
          onPress={() => {}}
        />
        <View style={styles.subTextWrap}>
          <TouchableOpacity onPress={goSignUp}>
            <Text style={styles.subText}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.subText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <HorizontalDivider
          text="hoặc"
          color={SECONDARY_COLOR}
          textColor={PRIMARY_COLOR}
          style={{ marginTop: 30 }}
        />
        <View style={styles.socialWrap}>
          <View style={styles.socialBtn}>
            <MyButtonWithIcon
              name="facebook"
              text="Kết nối với Facebook"
              style={{
                wrap: { backgroundColor: '#3b5998' },
                text: { fontSize: 12 },
              }}
              onPress={() => {}}
            />
          </View>
          <View style={styles.socialBtn}>
            <MyButtonWithIcon
              name="google"
              text="Kết nối với Google"
              style={{
                wrap: { backgroundColor: '#EA4335' },
                text: { fontSize: 12 },
              }}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
  },
  logoWrap: {
    width: 100,
    height: 100,
    display: 'flex',
    alignSelf: 'center',
    marginTop: 50,
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: PRIMARY_COLOR,
    marginTop: 20,
  },
  inputWrap: {
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: SECONDARY_COLOR,
    fontSize: 13,
  },
  loginBtn: { borderRadius: 5, marginTop: 20 },
  subTextWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subText: {
    fontSize: 12,
    fontWeight: '500',
    color: PRIMARY_COLOR,
  },
  socialWrap: {
    marginTop: 30,
  },
  socialBtn: {
    marginBottom: 10,
  },
});
