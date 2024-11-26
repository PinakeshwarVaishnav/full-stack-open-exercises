import express from 'express'

const app = express()
const port = process.env.port || 3000

app.get('/hello', (req, res) => {
	console.log('http request method is', req.method)
	res.send('Hello Full Stack!')
})

app.listen(port, () => {
	console.log(`server is running at http://localhost:${port}`)
})


