import express from 'express';
import routes from './routes'
import cors from 'cors'

const app = express();
//informa que vai receber dados do tipo jason
app.use(express.json())
//rotas
app.use(routes)

app.use(cors())

app.listen('3000', () =>{
    console.log('Run On Server...')
})