import React, { useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
  Image as ImageComp,
  TouchableOpacity,
} from "react-native"
import { PieChart } from "react-native-svg-charts"
import { Circle, G, Line, Text, Image } from "react-native-svg"

export interface PieChartData {
  value: number
  color: string
}

export interface PieChartCardProps extends React.PropsWithChildren<any> {
  data: PieChartData[]
  innerRadius: number
  outerRadius: number
  type: string
}

export const PieChartView = (props: PieChartCardProps) => {
  const { data, innerRadius, outerRadius, type } = props

  const datas = [50, 10, 40, 95, -4, -24, 85, 91, 23, 34]

  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(0, 7)

  const pieData = data
    .filter((data) => data.value > 0)
    .map((data, index) => ({
      value: data.value,
      svg: { fill: data.color },
      key: `pie-${index}`,
    }))

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice
      return (
        <G key={index}>
          <Line
            x1={labelCentroid[0] * 1.6}
            y1={labelCentroid[1] * 1.6}
            x2={pieCentroid[0]}
            y2={pieCentroid[1]}
            stroke={data.svg.fill}
          />
          <Circle
            cx={labelCentroid[0] * 1.6}
            cy={labelCentroid[1] * 1.6}
            r={25}
            fill={data.svg.fill}
          />
          <Text
            stroke="white"
            fontSize="8"
            x={labelCentroid[0] * 1.6}
            y={labelCentroid[1] * 1.6}
            textAnchor="middle"
          >
            asda
          </Text>
          <Image
            x={labelCentroid[0] * 1.6}
            y={labelCentroid[1] * 1.6}
            width={30}
            height={22}
            href={require("../../../../../assets/trash.png")}
          />
        </G>
      )
    })
  }
  return (
    <View>
      <PieChart
        style={{ width: 350, height: 250, borderWidth: 1 }}
        data={pieData}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        labelRadius={8}
      >
        {type !== "simple" ? <Labels /> : null}
      </PieChart>
    </View>
  )
}
