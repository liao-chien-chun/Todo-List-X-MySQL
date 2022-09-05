const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// middleware
app.use(express.urlencoded({ extended: true })) // 使用body-parser
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})