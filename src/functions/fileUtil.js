import request from 'superagent'
import 'babel-polyfill'

import { callApiThenGetBody } from './apiUtil'

export const fileUtil = {
    // configファイルのあるディレクトリのパス
    // getConfig: () => 'backend/config/config.json',
    // プロジェクトのjsonのあるディレクトリのパス
    // getProjectPath: () => 'backend/config/projects/',
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
        },
        read: {
            byName: async ({fileName}) => {
                // 特定のプロジェクトを読み込む(取得する)
                const response = callApiThenGetBody(`api/file/read/project?fileName=${fileName}`)
                .then(resp => resp.data)
                .catch(e => {
                    console.log(e)
                })
                return response
            },
            all: async () => {
                // 全てのプロジェクトを読み込む。backend/config/config.jsonより降順ソートして。
                const response = callApiThenGetBody(`api/file/read/all-projects`)
                .then(resp => resp.data)
                .catch(e => {
                    console.log(e)
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