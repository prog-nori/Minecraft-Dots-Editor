const fs = require('fs')
const path = require('path')

const FileType = {
    file: 'file',
    directory: 'directory'
}

/**
 * 一覧に新しいプロジェクトを追加する。
 * @param {*} projectName 
 * @param {*} aFilePath 
 * @param {*} updatedDate
 */
const addProject = (projectName, aFilePath, updatedDate) => {
    // configファイルがあれば読み込む
    const configFilePath = `backend/config/config.json`
    const data = existsThenReadOrElse(configFilePath, { projects: []})
    data.projects.push({
        projectName: projectName,
        filePath: aFilePath,
        updatedDate: updatedDate
    })
    write(configFilePath, JSON.stringify(data, null, 4))
    .then(res => {
        // console.log(res)
    })
}

/**
 * 該当するプロジェクトを更新する。
 * @param {*} projectName 
 * @param {*} aFilePath 
 * @param {*} updatedDate
 */
 const updateProject = (projectName, aFilePath, updatedDate) => {
    // configファイルがあれば読み込む
    const configFilePath = `backend/config/config.json`
    const data = existsThenReadOrElse(configFilePath, { projects: []})
    const foundIndex = data.projects.findIndex(aProject => aProject.filePath === aFilePath)
    if(data.projects[foundIndex].projectName != projectName) { 
        data.projects[foundIndex].projectName = projectName
    }
    data.projects[foundIndex].updatedDate = updatedDate
    try {
        writeSync(configFilePath, JSON.stringify(data, null, 4))
    } catch(e) {
        console.log('更新エラー')
        console.log(e)
    }
}

/**
 * 指定された名前のJSONファイルを作成する。
 * @param {*} aPath 
 * @param {*} json 
 */
const write = async (aPath, json, type=FileType.file) => {
    const dir = aPath.substring(0, aPath.lastIndexOf('/'))
    if(!fs.existsSync(dir)) {
        mkdirp(dir)
    }
    const res = await fs.writeFile(aPath, json, err => {
    if(err) {
        console.log('ERR:', err)
        return false
    } else {
        return true
    }
    })
    return res
}

/**
 * 同期的に指定された名前のJSONファイルを作成する。
 * @param {*} aPath 
 * @param {*} json 
 */
 const writeSync = async (aPath, json, type=FileType.file) => {
    try {
        const dir = aPath.substring(0, aPath.lastIndexOf('/'))
        if(!fs.existsSync(dir)) {
            mkdirp(dir)
        }
        await fs.writeFileSync(aPath, json)
    } catch(e) {
        console.log('エラー [writeSync]')
        console.log(e)
    }
}

/**
 * 指定された名前のJSONファイルを読み込む。
 * @param {*} aPath 
 * @param {*} json 
 */
const read = (aPath) => {
    const aFile = fs.readFileSync(aPath, 'utf8')
    const jsonObject = JSON.parse(aFile)
    return jsonObject
}

/**
 * ファイルがあれば読み込んだデータを返す。
 * なければ、第二引数で与えられたオブジェクトを返す
 */
const existsThenReadOrElse = (aPath, orelse) => {
    if(fs.existsSync(aPath)) {
        return read(aPath)
    } else {
        return orelse
    }
}

/**
 * 再帰的にディレクトリを作成
 * @param {*} dir 
 * @returns 
 */
const mkdirp = dir => {
    if (fs.existsSync(dir)) { return true }
    const dirname = path.dirname(dir)
    mkdirp(dirname);
    fs.mkdirSync(dir);
}

const modules = {
    addProject,
    updateProject,
    write,
    read,
    mkdirp
}

module.exports = modules