import moment from "moment"

export function ExpenseDateSorter(data, month: string) {
  const res = data.filter((val) => moment(val.date, "DD MMM YYYY").format("M") === month)
  console.log("AYANNNN COMELL", month)
  return res
}
