const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

// 資料庫設定
const db = require('./models')
const Todo = db.Todo
const User = db.User

const passport = require('passport')
const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// middleware
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true })) // 使用body-parser
app.use(methodOverride('_method'))
usePassport(app)  // 呼叫 Passport 函式並傳入 app，這條要寫在路由之前



app.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

// 新增頁
app.get('/todos/new', (req, res) => {
  res.render('new')
})
// 寫進資料庫
app.post('/todos', (req, res) => {
  console.log(req.user.id)
})

// edit頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findOne({ where: { id } })
    .then(todo => {
      res.render('edit', { todo: todo.toJSON() })
    })
    .catch(err => console.log(err))
})

// detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch((error) => { return res.status(422).json(error) }) // 但我用這個才能顯示
    // .catch(error = console.log(error))  // 教案用這個
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } })
    .then(user => {
      if(user) {
        console.log('User already exists')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
    })
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/users/login'))
      .catch(err => console.log(err))
})

app.get('/users/logout', (req, res) => {
  res.send('logout')
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})