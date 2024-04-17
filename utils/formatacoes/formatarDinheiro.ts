function formatarDinheiro(value) {
  try {
    if (!value) {
      return parseFloat('0.0').toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }

    return parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  } catch (error) {
    return 0
  }
}

export default formatarDinheiro
