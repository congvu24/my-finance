import { View, Text } from 'react-native';
import React from 'react';

export default function HorizontalDivider({
  text = '',
  color = 'black',
  textColor = 'black',
  style = {},
}: {
  text: string;
  color: string;
  textColor: string;
  style: Object;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
      <View style={{ flex: 1, height: 1, backgroundColor: color }} />
      <View>
        <Text
          style={{
            marginHorizontal: 4,
            textAlign: 'center',
            color: textColor,
          }}>
          {text}
        </Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: color }} />
    </View>
  );
}
