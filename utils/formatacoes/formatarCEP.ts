function formatarCEP(value) {
  if (!value) return
  var onlyNumber = value.replace(/\D/g, '')
  return onlyNumber.replace(/(\d{5})(\d{3})/g, '$1-$2')
}

export default formatarCEP
