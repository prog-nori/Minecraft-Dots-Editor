const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

const dateUtil = require('../util/dateUtil')

const FileType = {
  file: 'file',
  directory: 'directory'
}

// GET /api/file/create
router.get('/create', (req, res) => {
  /**
   * Todo: configからprojectName, fileNameの一覧を読み込み、
   * 重複があればそれぞれの名前を「<projectName>(n)」「<fileName>(n)」とする。
   * nは1から始まり、重複がある限り再帰処理で確認する。
   */
  const today = dateUtil.today()
  const aJSON = JSON.stringify({
    name: req.query.projectName,
    created: today,
    sheets: []
  }, null, 4)
  const projectDir = 'backend/config/projects'
  const fileName = `${projectDir}/${req.query.fileName.replace(' ', '')}.json`
  write(fileName, aJSON).then(response => {
    addProject(req.query.projectName, fileName, today)
    res.json({
      result: 'ファイル作りますね〜',
      status: response
    })
  }).catch(err => {
    res.json({
      result: 'ファイル作成失敗',
      status: err
    })
  })
})

// GET /api/file/read/all-projects
router.get('/read/all-projects', (req, res) => {
  const projects = read('backend/config/config.json').projects
  projects.sort((a, b) => {
    if(a.updatedDate > b.updatedDate) return -1
    if(a.updatedDate < b.updatedDate) return 1
    return 0
  })
  res.json({
    data: projects
  })
})

/**
 * 一覧に新しいプロジェクトを追加する。
 * @param {*} projectName 
 * @param {*} aFilePath 
 * @param {*} updatedDate
 */
const addProject = (projectName, aFilePath, updatedDate) => {
  // configファイルがあれば読み込む
  let data = { projects: [] }
  const configDir = 'backend/config'
  const configFilePath = `${configDir}/config.json`
  if(fs.existsSync(configFilePath)) {
    data = read(configFilePath)
  }
  data.projects.push({
    projectName: projectName,
    filePath: aFilePath,
    updatedDate: updatedDate
  })
  write(configFilePath, JSON.stringify(data, null, 4))
  .then(res => {
    console.log(res)
  })
}

/**
 * 指定された名前のJSONファイルを作成する。
 * @param {*} aPath 
 * @param {*} json 
 */
 const write = async (aPath, json, type=FileType.file) => {
  console.log('HELLO', aPath)
  const dir = aPath.substring(0, aPath.lastIndexOf('/'))
  if(!fs.existsSync(dir)) {
    console.log(1)
    mkdirp(dir)
  } else {
    console.log(4)
  }
  const res = await fs.writeFile(aPath, json, err => {
    if(err) {
      console.log('ERR:', err)
      return false
    } else {
      console.log('ファイル作成に成功')
      return true
    }
  })
  return res
}

/**
 * 指定された名前のJSONファイルを読み込む。
 * @param {*} aPath 
 * @param {*} json 
 */
 const read = (aPath) => {
  const jsonObject = JSON.parse(fs.readFileSync(aPath, 'utf8'))
  return jsonObject
}

/**
 * 再帰的にディレクトリを作成
 * @param {*} dir 
 * @returns 
 */
const mkdirp = dir => {
  console.log('hello world')
  if (fs.existsSync(dir)) { console.log(155, 'file exists.');return true }
  const dirname = path.dirname(dir)
  console.log(dir, dirname)
  mkdirp(dirname);
  fs.mkdirSync(dir);
}

module.exports = router
