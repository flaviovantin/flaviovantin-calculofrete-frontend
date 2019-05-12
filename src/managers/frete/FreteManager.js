import { responseHandle } from '../ResponseHandler'

export const getTabelaFretes = () => {
    return fetch('https://883fa7shzh.execute-api.us-east-1.amazonaws.com/v1/fretes')
    .then(responseHandle)
}

export const postCalcularFrete = (parametrosCalculo) => {
    return fetch('https://883fa7shzh.execute-api.us-east-1.amazonaws.com/v1/fretes', {
        method: 'POST',
        body: JSON.stringify(parametrosCalculo)
    })
    .then(responseHandle)
}