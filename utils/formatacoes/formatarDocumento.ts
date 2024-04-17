import formatarCNPJ from "./formatarCNPJ"
import formatarCPF from "./formatarCPF"

function formatarDocumento(value: any) {
  if (!value) return

  var documento = value.length === 11 ? formatarCPF(value) : formatarCNPJ(value)

  return documento
}

export default formatarDocumento
