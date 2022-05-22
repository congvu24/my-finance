import { Dimensions } from 'react-native';
import React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryArea,
} from 'victory-native';
import { GREEN_COLOR, PRIMARY_COLOR, RED_COLOR } from '../contants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

const width = Dimensions.get('window').width;

function LineChart({ coin = '1' }) {
  const price = useSelector<RootState>(state => state.coin.chartData[coin]);
  const priceList = price?.map(item => item.y) || [];
  const maxPrice = Math.max(...priceList);
  const minPrice = Math.min(...priceList);

  return (
    <VictoryChart
      height={250}
      width={width}
      theme={VictoryTheme.material}
      // maxDomain={{ x: 5, y: 100 }}
      maxDomain={{
        y: maxPrice,
      }}
      minDomain={{
        y: minPrice,
      }}
      padding={{ top: 0, bottom: 0, right: 0, left: 0 }}
      style={{
        parent: {
          width: '100%',
          height: 'auto',
          overflow: 'visible',
        },
      }}
      scale={{ x: 'time', y: 'linear' }}>
      <Defs>
        <LinearGradient id="gradientFill" x1="0%" x2="0%" y1="0%" y2="100%">
          <Stop offset="20%" stopColor={PRIMARY_COLOR} stopOpacity="0.3" />
          <Stop offset="80%" stopColor={'transparent'} stopOpacity="0.3" />
          <Stop offset="100%" stopColor={'transparent'} stopOpacity="0.1" />
        </LinearGradient>

        <LinearGradient id="gradientFillRed" x1="0%" x2="0%" y1="0%" y2="100%">
          <Stop offset="20%" stopColor={RED_COLOR} stopOpacity="0.3" />
          <Stop offset="80%" stopColor={'transparent'} stopOpacity="0.3" />
          <Stop offset="100%" stopColor={'transparent'} stopOpacity="0.1" />
        </LinearGradient>
      </Defs>

      <VictoryAxis
        style={{
          axis: { stroke: 'transparent' },
          ticks: { stroke: 'transparent' },
          tickLabels: { fill: 'transparent' },
          grid: { stroke: 'none' },
        }}
      />
      {/* {goldPrice.length > 0 && ( */}
      <VictoryArea
        data={price?.slice(300, price?.length) ?? []}
        style={{
          data: {
            stroke: PRIMARY_COLOR,
            fill: 'url(#gradientFill)',
            overflow: 'visible',
          },
        }}
        // animate={{
        //   duration: 2000,
        //   // onLoad: { duration: 6000 },
        // }}
        interpolation="linear"
      />
      {/* )} */}
    </VictoryChart>
  );
}

export default React.memo(LineChart);
