const dateUtil = require('../../util/dateUtil')
const { addProject, write, read } = require('../../util/fileUtil')

const createFunc = (req, res) => {
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
    // const aPath = `${projectDir}/${req.query.fileName.replace(' ', '')}.json`
    const fileName = req.query.fileName.replace(' ', '')
    const aPath = `${projectDir}/${fileName}`
    write(aPath, aJSON).then(response => {
        // addProject(req.query.projectName, aPath, today)
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
}

const readFuncs = {
    allProjects: (req, res) => {
        const projects = read('backend/config/config.json').projects
        projects.sort((a, b) => {
            if(a.updatedDate > b.updatedDate) return -1
            if(a.updatedDate < b.updatedDate) return 1
            return 0
        })
        res.json({
            data: projects
        })
    },
    aProject: (req, res) => {
        // const projects = read('backend/config/config.json').projects
        // projects.sort((a, b) => {
        //     if(a.updatedDate > b.updatedDate) return -1
        //     if(a.updatedDate < b.updatedDate) return 1
        //     return 0
        // })
        // res.json({
        //     data: projects
        // })
    },
}

const modules = {
    create: createFunc,
    read: readFuncs,
}

module.exports = modules