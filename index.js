const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = process.env.PORT || 5500

app.use(express.static('public'))
app.set('views', 'views/')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  let { data } = await (await fetch('https://playentry.org/api/discuss/find?category=free')).json()
  res.render('index', { posts: data })
})

app.get('/post/:id', async (req, res) => {
  let data = await (await fetch(`https://playentry.org/api/discuss/${req.params.id}`)).json()
  let comments = await (await fetch(`https://playentry.org/api/comment/discuss/list/${req.params.id}/?targetType=individual`)).json()
  res.render('read', { post: data, comments })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})