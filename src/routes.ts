import express from 'express'

import DocController from './controllers/DocControler'


const routes = express.Router();

//ESTOU CHAMANDO A MINHA CLASSE CRIANDO UM OBJRTO A PARTIR DISSO
const docController = new DocController();

routes.get('/',(req,res)=>{
    res.send('inicio...')
});

routes.get('/projetos',docController.search);//rota para listar tds os projetos funciona no navegador para testar
routes.post('/projetos',docController.create);//insere projetos com os dados enviados no corpo da requisição
routes.delete('/projetos/:id',docController.remove);
routes.get('/projetos/:id',docController.searchID);

export default routes;