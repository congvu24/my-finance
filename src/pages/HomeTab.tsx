import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { LOGO } from '../contants/Images';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import HomeShortList from '../components/HomeShortList';
import HomeOverview from '../components/HomeOverview';
import HomeShortcut from '../components/HomeShortcut';
import { removeLogin } from '../redux/reducer/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';

export default function HomeTab({ navigation }) {
  const dispatch = useDispatch();
  const signOut = () => dispatch(removeLogin());

  const isLogged = useSelector<RootState>(state => state.user.isLogged);

  useEffect(() => {
    if (!isLogged) {
      navigation.replace('Wellcome');
    }
  }, [isLogged]);

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <View>
          <Icon name="text" style={styles.drawerBtn} />
        </View>
        <TouchableOpacity style={styles.avatarWrap} onPress={signOut}>
          <Image source={LOGO} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <HomeOverview />
      <HomeShortcut />
      <View style={styles.history}>
        <Text style={styles.historyText}>Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.historyAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <HomeShortList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  drawerBtn: { fontSize: 20 },
  avatarWrap: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
  history: {
    // marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyText: {
    fontWeight: '500',
    fontSize: 15,
    color: WHITE_COLOR,
  },
  historyAll: {
    fontSize: 12,
    fontWeight: '400',
    color: WHITE_COLOR,
    opacity: 0.5,
  },
});
