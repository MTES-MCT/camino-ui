const numberFormat = number =>
  Intl.NumberFormat('FR-fr', {
    maximumSignificantDigits: 21
  }).format(number)

export default numberFormat
