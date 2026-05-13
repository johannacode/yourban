import express from 'express'
import cors from 'cors'
import moviesRouter from './routes/movies.routes'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/movies', moviesRouter)

// Route de santé — permet de vérifier que le serveur tourne
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`🎬 Serveur démarré sur http://localhost:${PORT}`)
})