import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { COIN_LIST } from '../contants/Coin';
import {
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';

const width = Dimensions.get('window').width;

export default function CoinSelect({
  renderChildren,
  data,
  show = false,
  onSelect,
}) {
  return (
    <View style={styles.wrap}>
      {renderChildren()}
      {show && (
        <View style={styles.selectWrap}>
          <FlatList
            data={data}
            style={{ maxHeight: 300 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                }}>
                <Text style={styles.itemName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  selectWrap: {
    width: width * 0.8,
    position: 'absolute',
    top: 30,
    left: width * 0.1,
    zIndex: 999,
    backgroundColor: SECONDARY_BG_COLOR,
  },
  itemName: {
    color: WHITE_COLOR,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomColor: THIRD_BG_COLOR,
    borderBottomWidth: 0.7,
  },
});
