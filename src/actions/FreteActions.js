import { getTabelaFretes, postCalcularFrete } from '../managers/frete/FreteManager'

// Actions

export const GET_TABELAS_FRETE = 'GET_TABELAS_FRETE'
export const POST_CALCULAR_FRETE = 'POST_CALCULAR_FRETE'
export const FECHAR_MODAL_ERRO = 'FECHAR_MODAL_ERRO'
export const LOADING = 'LOADING'

// Action methods

export const obterFretes = () => {
  return dispatch => {
    getTabelaFretes()
      .then(response => {
        dispatch({
          type: GET_TABELAS_FRETE,
          payload: response
        })
        dispatch({
          type: LOADING,
          payload: false
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const calcularFrete = (parametrosCalculo) => {
  return dispatch => {
    postCalcularFrete(parametrosCalculo)
      .then(response => {
        dispatch({
          type: POST_CALCULAR_FRETE,
          payload: response
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const fecharModalErro = () => ({
  type: FECHAR_MODAL_ERRO
})

export const screenLoading = (isLoading) => ({
  type: LOADING,
  payload: isLoading
})
