import request from 'superagent'
import 'babel-polyfill'

export const callApiThenGetBody = async (anURL) => {
    const response = await request.get(anURL)
    .then(res => {
        return res.body
    })
    .catch(err => {
        if(err) {
            console.log(err)
            throw err
        }
    })
    return response
}