function formatarTelefone(value: any) {
  if (!value) return

  if (value) {
    value = value.replace(/[^\d]/g, "")

    var ddd = value.substr(0, 2)
    var numPart1 = value.substr(2, value.length - 6)
    var numPart2 = value.substr(value.length - 4)
    return `(${ddd}) ${numPart1}-${numPart2}`
  }
}

export default formatarTelefone
