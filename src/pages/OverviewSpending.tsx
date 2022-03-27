import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import BackArrow from '../components/BackArrow';
import { VictoryPie } from 'victory-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function OverviewSpending({ navigation }) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow />
        <Text style={styles.typeText}>Overview</Text>
        <TouchableOpacity style={styles.rangeBtn}>
          <Text style={styles.rangeBtnText}>Monthly</Text>
          <Icon style={styles.rangeBtnText} name="down" />
        </TouchableOpacity>
      </View>

      <View style={styles.tab}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>Thu 1000đ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Chi 9.200.000đ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.headerMonth}>
          <TouchableOpacity>
            <Icon name="left" style={{ ...styles.headerIcon, fontSize: 12 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerText}>May 2022</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="right" style={{ ...styles.headerIcon, fontSize: 12 }} />
          </TouchableOpacity>
        </View>
        <VictoryPie
          width={300}
          data={[
            { x: 'Cats', y: 35 },
            { x: 'Dogs', y: 40 },
            { x: 'Birds', y: 55 },
          ]}
        />
      </View>
      <View style={styles.list}>
        <View style={styles.item}>
          <Text style={styles.itemTag}>99%</Text>
          <Text style={styles.itemName}>Other</Text>
          <Text style={styles.itemValue}>4.500.000</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTag}>99%</Text>
          <Text style={styles.itemName}>Other</Text>
          <Text style={styles.itemValue}>4.500.000</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTag}>99%</Text>
          <Text style={styles.itemName}>Other</Text>
          <Text style={styles.itemValue}>4.500.000</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerMonth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    alignItems: 'center',
    marginRight: 'auto',
    marginTop: 10,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    marginHorizontal: 5,
  },

  rangeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  rangeBtnText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
  },

  list: {
    padding: 4,
  },

  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 15,
  },
  itemTag: {
    backgroundColor: 'red',
    paddingHorizontal: 4,
    fontSize: 12,
    borderRadius: 4,
    textAlign: 'center',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
  },
  itemValue: {
    marginLeft: 'auto',
    fontSize: 13,
    fontWeight: '500',
  },
  wrap: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    marginLeft: 10,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    marginTop: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    // backgroundColor: SECONDARY_COLOR,
  },
  tabTextActive: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
});
