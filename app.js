const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const app = express()
const PORT = 3000

const routes = require('./routes') // 引用路由器

// 資料庫設定
const db = require('./models')
const Todo = db.Todo
const User = db.User

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
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)



app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})