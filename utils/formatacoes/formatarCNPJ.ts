function formatarCNPJ(value: any) {
  if (!value) return
  var onlyNumber = value.replace(/\D/g, "")
  return onlyNumber.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    "$1.$2.$3/$4-$5"
  )
}

export default formatarCNPJ
