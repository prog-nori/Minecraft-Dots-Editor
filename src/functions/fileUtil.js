import request from 'superagent'
import 'babel-polyfill'

export const fileUtil = {
    project: {
        create: async ({projectName, fileName}) => {
            // プロジェクトを作成する
            const response = await request.get(`api/file/create?projectName=${projectName}&fileName=${fileName}`)
                .then(res => {
                    return res.body.result
                })
                .catch(err => {
                    if (err) {
                        console.log(err)
                        return err
                    }
                })
            return response
            // return await request.get(`api/file/create?projectName=${projectName}&fileName=${fileName}`)
            //     .then(res => {
            //         return res.body.result
            //     })
            //     .catch(err => {
            //         if (err) {
            //             console.log(err)
            //             return err
            //         }
            //     })
        },
        read: {
            byName: () => {
                // 特定のプロジェクトを読み込む(取得する)
            },
            all: async () => {
                // 全てのプロジェクトを読み込む。backend/config/config.jsonより降順ソートして。
                const response = await request.get(`api/file/read/all-projects`)
                    .then(res => {
                        return res.body.data
                    })
                    .catch(err => {
                        if(err) {
                            console.log(err)
                            return err
                        }
                    })
                return response
            }
        },
        update: () => {
            // プロジェクトを更新する
        },
        delete: () => {
            // プロジェクトを削除する
        },
    },
    sheet: {
        create: () => {
            // シートを作成する
        },
        read: () => {
            // シートを読み込む(取得する)
        },
        update: () => {
            // シートを更新する
        },
        delete: () => {
            // シートを削除する
        },
    },
}