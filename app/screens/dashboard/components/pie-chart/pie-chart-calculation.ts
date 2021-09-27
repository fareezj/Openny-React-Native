import { PieChartData } from "./pie-chart-view"

export const getPieChartRatioValues = (data) => {
  if (data) {
    var total = data?.reduce(function (x, y) {
      return x + y
    }, 0)
    return data?.map(function (x) {
      const a = (x / total) * 100
      if (parseFloat(a.toFixed(2)) > 1.0) {
        return (x / total) * 100
      } else {
        return 1.0
      }
    })
  }
}

export const getPieChartTotalValue = (data): number => {
  const a: number = data.reduce((acc, obj) => acc + obj.value, 0)
  return a
}
