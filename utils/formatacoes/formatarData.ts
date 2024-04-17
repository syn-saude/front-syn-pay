import moment from "moment"

function formatarData(value: any) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY")
  }
}
function formatarDataHora(value: any) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY HH:mm")
  }
}

function formatarHora(value: any) {
  if (value) {
    return moment(String(value)).format("HH:mm")
  }
}

function formatarHoraLocal(value: any) {
  if (value) {
    return moment.utc(String(value)).local().format("HH:mm")
  }
}

function formatarDataLocal(value: any) {
  if (value) {
    return moment.utc(String(value)).local().format("DD/MM/YYYY")
  }
}
function formatarDataHoraLocal(value: any) {
  if (value) {
    return moment.utc(String(value)).local().format("DD/MM/YYYY HH:mm")
  } else {
    return ""
  }
}

function formatarDiferencaData(value: any) {
  const agora = Date.now()
  const dataModificacao = new Date(value).getTime() - 1000 * 60 * 60 * 3

  const diffMilissegundos = agora - dataModificacao
  const diffSegundos = Math.trunc(diffMilissegundos / 1000)
  const diffMinutos = Math.trunc(diffSegundos / 60)
  const diffHoras = Math.trunc(diffMinutos / 60)
  const diffDias = Math.trunc(diffHoras / 24)
  const diffMeses = Math.trunc(diffDias / 30)
  const diffAnos = Math.trunc(diffMeses / 12)

  if (diffAnos >= 1) {
    if (diffAnos === 1) {
      return "1 ano"
    } else {
      return `${diffAnos} anos`
    }
  } else {
    if (diffMeses >= 1) {
      if (diffMeses === 1) {
        return "1 mês"
      } else {
        return `${diffMeses} meses`
      }
    } else {
      if (diffDias >= 1) {
        if (diffDias === 1) {
          return "1 dia"
        } else {
          return `${diffDias} dias`
        }
      } else {
        if (diffHoras >= 1) {
          if (diffHoras === 1) {
            return "1 hora"
          } else {
            return `${diffHoras} horas`
          }
        } else {
          if (diffMinutos > 1) {
            return `${diffMinutos} minutos`
          } else {
            return "menos de 1 minuto"
          }
        }
      }
    }
  }
}

function formatarIdade(value: any) {
  const agora = new Date()
  const dataNascimento = new Date(value)

  var anos = +agora.getFullYear() - +dataNascimento.getFullYear()

  if (
    agora.getMonth() + 1 < dataNascimento.getMonth() ||
    (agora.getMonth() + 1 === dataNascimento.getMonth() &&
      agora.getDate() < dataNascimento.getDate())
  ) {
    anos--
  }

  return anos
}

export {
  formatarData,
  formatarDataHora,
  formatarDataLocal,
  formatarDataHoraLocal,
  formatarDiferencaData,
  formatarIdade,
  formatarHora,
  formatarHoraLocal,
}
