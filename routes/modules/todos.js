const express = require('express')
const router = express.Router()

// 資料庫設定
const db = require('../../models')
const Todo = db.Todo
const User = db.User

// 新增頁
router.get('/new', (req, res) => {
  res.render('new')
})
// 寫進資料庫
router.post('/', (req, res) => {
  console.log(req.user.id)
})

// edit頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findOne({ where: { id } })
    .then(todo => {
      res.render('edit', { todo: todo.toJSON() })
    })
    .catch(err => console.log(err))
})

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch((error) => { return res.status(422).json(error) }) // 但我用這個才能顯示
    // .catch(error = console.log(error))  // 教案用這個
})



module.exports = router