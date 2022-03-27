import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { LOGO } from '../contants/Images';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  RED_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { User } from '../models/User';
import { removeLogin } from '../redux/reducer/user';

export default function ProifleTab() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userData = useSelector<RootState>(state => state.user.data) as User;

  const gotoMoneySource = () => {
    navigation.navigate('MoneySource');
  };

  const confirmLogin = () =>
    Alert.alert('Logout', 'Do you agree to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(removeLogin()) },
    ]);

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.user}>
        <View style={styles.userAvatar}>
          <Image source={LOGO} style={styles.userAvatarImage} />
        </View>
        <Text style={styles.userName}>{userData.name}</Text>
      </View>

      <TouchableOpacity style={styles.promote} onPress={() => {}}>
        <View style={styles.addFriend}>
          <Icon name="adduser" style={styles.addFriendIcon} />
        </View>
        <View style={styles.promoteInfo}>
          <Text style={styles.promoteTitle}>Invite your friend</Text>
          <Text style={styles.promoteSubTitle}>Get more benefits</Text>
        </View>
        <Icon name="right" style={styles.promoteRight} />
      </TouchableOpacity>

      <View style={styles.list}>
        <Text style={styles.listTitle}>Account settings</Text>
        <View style={styles.item}>
          <Icon name="user" style={styles.itemIcon} />
          <Text style={styles.itemTitle}>Personal Information</Text>
          <Icon name="right" style={styles.itemRight} />
        </View>

        <TouchableOpacity style={styles.item} onPress={gotoMoneySource}>
          <Icon name="wallet" style={styles.itemIcon} />
          <Text style={styles.itemTitle}>Wallets</Text>
          <Icon name="right" style={styles.itemRight} />
        </TouchableOpacity>

        <Text style={styles.listTitle}>General</Text>
        <View style={styles.item}>
          <Icon name="questioncircleo" style={styles.itemIcon} />
          <Text style={styles.itemTitle}>Help</Text>
          <Icon name="right" style={styles.itemRight} />
        </View>
        <View style={styles.item}>
          <Icon name="filetext1" style={styles.itemIcon} />
          <Text style={styles.itemTitle}>License</Text>
          <Icon name="right" style={styles.itemRight} />
        </View>
        <View style={styles.item}>
          <Icon name="antdesign" style={styles.itemIcon} />
          <Text style={styles.itemTitle}>About us</Text>
          <Icon name="right" style={styles.itemRight} />
        </View>
      </View>

      <Text style={styles.version}>Version 1.1.0</Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={confirmLogin}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  promote: {
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THIRD_BG_COLOR,
  },
  addFriend: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5,
    marginRight: 5,
  },
  addFriendIcon: {
    fontSize: 20,
    color: 'white',
  },
  promoteInfo: {
    justifyContent: 'space-between',
  },
  promoteTitle: {
    fontWeight: '600',
    color: WHITE_COLOR,
    fontSize: 14,
  },
  promoteSubTitle: {
    fontSize: 12,
    color: WHITE_COLOR,
    opacity: 0.7,
  },
  promoteRight: { marginLeft: 'auto', fontSize: 14, color: PRIMARY_COLOR },

  wrap: {
    padding: 10,
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  user: {
    alignItems: 'center',
    marginTop: 20,
  },
  userAvatar: {
    width: 50,
    height: 50,
    margin: 'auto',
  },
  userAvatarImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: WHITE_COLOR,
  },
  list: {
    padding: 10,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
    color: WHITE_COLOR,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    marginTop: 5,
    borderBottomColor: THIRD_BG_COLOR,
  },
  itemIcon: {
    fontWeight: '500',
    fontSize: 14,
    marginRight: 10,
    color: WHITE_COLOR,
  },
  itemTitle: {
    fontWeight: '500',
    color: WHITE_COLOR,
  },
  itemRight: {
    marginLeft: 'auto',
    color: PRIMARY_COLOR,
    fontSize: 14,
  },

  version: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: 12,
    color: WHITE_COLOR,
    opacity: 0.7,
  },
  logoutBtn: {
    textAlign: 'center',
    alignSelf: 'center',
    margin: 10,
    padding: 10,
  },
  logoutText: {
    color: RED_COLOR,
  },
});
