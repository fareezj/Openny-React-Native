export const CurrencyFormatter = (value) => {
  const res = Intl.NumberFormat("en-UK", { style: "currency", currency: "MYR" }).format(value)
  return res
}
