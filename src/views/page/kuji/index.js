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