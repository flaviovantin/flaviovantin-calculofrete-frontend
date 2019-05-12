import { 
    GET_TABELAS_FRETE, POST_CALCULAR_FRETE, LOADING, FECHAR_MODAL_ERRO 
  } from '../actions/FreteActions'
  
  const initialState = {
    tabelasANTT: [],
    tipoCarga: undefined,
    totalFrete: 0,
    loading: false,
    mensagensErro: [],
  }
  
  /**
   * Frete Reducer
   */
  export default (state = initialState, { type, payload, error }) => {
  
    switch (type) {
      
      case GET_TABELAS_FRETE:
        return {
          ...state,
          tabelasANTT: payload
        }
  
      case POST_CALCULAR_FRETE:
        return {    
          ...state,
          totalFrete: payload.valorFreteCalculado ? payload.valorFreteCalculado : 0,
          mensagensErro: payload.erros.length > 0 ? payload.erros : [],
          loading: false
        }
    
      case FECHAR_MODAL_ERRO:
        return {
          ...state,
          mensagensErro: []
        }
  
      case LOADING:
        return {
          ...state,
          loading: payload
        }
  
      default:
        return state
    }
  }