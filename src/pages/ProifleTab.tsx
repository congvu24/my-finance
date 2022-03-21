import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { LOGO } from '../contants/Images';
import Icon from 'react-native-vector-icons/AntDesign';
import { PRIMARY_COLOR } from '../contants/Colors';

export default function ProifleTab() {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.user}>
        <View style={styles.userAvatar}>
          <Image source={LOGO} style={styles.userAvatarImage} />
        </View>
        <Text style={styles.userName}>Cong Vu</Text>
      </View>

      <View style={styles.promote}>
        <View style={styles.addFriend}>
          <Icon name="adduser" style={styles.addFriendIcon} />
        </View>
        <View style={styles.promoteInfo}>
          <Text style={styles.promoteTitle}>Invite your friend</Text>
          <Text style={styles.promoteSubTitle}>Get more benefits</Text>
        </View>
        <Icon name="right" style={styles.promoteRight} />
      </View>

      <View style={styles.list}>
        <Text style={styles.listTitle}>Account settings</Text>
        <View style={styles.item}>
          <Icon name="user" style={styles.itemIcon} />
          <Text style={styles.itemTitle}>Personal Information</Text>
          <Icon name="right" style={styles.itemRight} />
        </View>

        <View style={styles.item}>
          <Icon name="wallet" style={styles.itemIcon} />
          <Text style={styles.itemTitle}>Wallets</Text>
          <Icon name="right" style={styles.itemRight} />
        </View>

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
      <TouchableOpacity style={styles.logoutBtn}>
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
    color: 'black',
    fontSize: 14,
  },
  promoteSubTitle: {
    fontSize: 12,
  },
  promoteRight: { marginLeft: 'auto', fontSize: 14, color: PRIMARY_COLOR },

  wrap: {
    padding: 10,
    backgroundColor: 'white',
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
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  list: {
    padding: 10,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    marginTop: 5,
  },
  itemIcon: {
    fontWeight: '500',
    fontSize: 14,
    marginRight: 10,
  },
  itemTitle: {
    fontWeight: '500',
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
  },
  logoutBtn: {
    textAlign: 'center',
    alignSelf: 'center',
    margin: 10,
    padding: 10,
  },
  logoutText: {
    color: 'red',
  },
});
