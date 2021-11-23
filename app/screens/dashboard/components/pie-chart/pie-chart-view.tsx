import React, { useEffect } from "react"
import {
  View,
  StyleSheet,
  Text as TextComp,
  Image as ImageComp,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native"
import { PieChart } from "react-native-svg-charts"
import { Circle, G, Line, Text, Image } from "react-native-svg"
import { getPieChartRatioValues } from "./pie-chart-calculation"
import { CurrencyFormatter } from "../../../../utils/currency"
import { useTheme } from "../../../../hooks/useTheme"
const deviceWidth = Dimensions.get("window").width
const deviceHeight = Dimensions.get("window").height
export interface PieChartData {
  category: number
  value: number
  color: string
}
export interface PieChartCardProps extends React.PropsWithChildren<any> {
  data: PieChartData[]
  innerRadius: number
  outerRadius: number
  totalValue: number
  type: string
}

export const PieChartView = (props: PieChartCardProps) => {
  const { data, innerRadius, outerRadius, type, totalValue } = props
  const { darkMode } = useTheme()

  useEffect(() => {}, [darkMode])

  const datas = [50, 10, 40, 95, -4, -24, 85, 91, 23, 34]
  const tempVal = []

  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(0, 7)

  const pieData = data
    .filter((data) => data.value > 0)
    .map((data, index) => ({
      value: data.value,
      svg: { fill: data.color },
      key: `pie-${index}`,
    }))

  if (pieData) {
    pieData.forEach((val) => tempVal.push(val.value))
    if (tempVal) {
      const tempRes = getPieChartRatioValues(tempVal)
      pieData.map((val, index) => (val.value = tempRes[index]))
    }
  }

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
        style={{ width: deviceWidth, height: deviceHeight / 5 }}
        data={pieData}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        labelRadius={8}
        padAngle={0.02}
      >
        {type !== "simple" ? <Labels /> : null}
        <View>
          <TextComp style={[PieChartStyle.TOTAL_TEXT, { color: darkMode ? "white" : "black" }]}>
            {CurrencyFormatter(totalValue)}
          </TextComp>
        </View>
      </PieChart>
    </View>
  )
}

export const PieChartStyle = StyleSheet.create({
  TOTAL_TEXT: {
    position: "absolute",
    left: deviceWidth / 3,
    top: deviceHeight / 12,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    maxWidth: 140,
    minWidth: 140,
    minHeight: 70,
    maxHeight: 70,
    borderWidth: 0,
  },
})
