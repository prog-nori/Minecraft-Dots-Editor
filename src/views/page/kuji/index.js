import React, { useState } from 'react'
import request from 'superagent'

export const Kuji = () => {
    const [result, setResult] = useState('')
    const api = () => {
        request.get('api/kuji').end((err, res) => {
            if (err) {
                console.log(err)
                return
            }
            const result = res.body.result
            setResult(result)
        })
    }
    return (
        <div>
            <p>{result}</p>
            <button onClick={ e => api() }>ひくわー</button>
        </div>
    )
}

// class Kuji extends React.Component {
//   constructor(props) {
//     super(props)
//     // Set a default state
//     this.state = { result: '' }
//     // bind api()
//     this.api = this.api.bind(this)
//   }

//   // Feath ojikuji result via 'GET /api/kuji'
//   api () {
//     request.get('api/kuji').end((err, res) => {
//       if (err) {
//         console.log(err)
//         return
//       }
//       const result = res.body.result
//       this.setState({ result: result })
//     })        
//   }

//   render () {
//     return (
//       <div>
//         <p>{this.state.result}</p>
//         <button onClick={ e => this.api() }>ひくわー</button>
//      </div>
//     )
//   }
// }

// ReactDOM.render(
//   <Kuji />,
//   document.getElementById('root')
// )
