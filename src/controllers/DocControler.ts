import {Request, Response} from 'express'

//BUSCANDO A CONECXÃO COM O KNEX
import knex from '../database/conection'


class DocController {
    //lista todos os documentos
    async search(req: Request, res: Response){
        const docs = await knex('doc').select('doc.*')
        return res.json(docs)
    }

    //listar por id
    async searchID(req: Request, res: Response){
        const id= req.params.id
        const trx = await knex.transaction()
        const docExists = await  trx('doc').where('id',id).first();
        console.log(docExists)
        if(!docExists){ 
            await trx.rollback()
            return res.status(400).json({error:'documento não encontrado'});
        } 
        const doc = await  trx('doc').select('doc.*').where('id',id).first();
        return res.json(doc)  
    }  

    //insere documentos
    async create(req: Request, res: Response){
        const {url, title} = req.body;

      
        //inicia uma transação
        const trx = await knex.transaction()
        const docExists = await trx('doc').where('url', url).first()

        if(docExists){
            await trx.rollback()
            return res.json({erro:'Projeto ja existe'})
        }

        const doc = await trx('doc').insert({
            url,
            title 
        })
        //se chegou aki e pq deu tudo certo e salva no banco
        await trx.commit()
        return res.json({sucesso:'Projeto inserido com sucesso!'})
    }

    async change(req: Request, res: Response){
        const id_doc = req.params.id
        const trx = await knex.transaction()      

        const {url, title} = req.body

        const project = {
            url,
            title
        }
                  
        const doc = await  trx('doc').where('id', id_doc).update({url, title})
        if(doc === 0){
            return res.status(400).json({error:'arquivo não encontrado'})
        }
            
        const docExists = await  trx('doc').select('doc.*').where('id', id_doc)
        await trx.commit()
        return res.json(docExists)      

    }

    async remove(req:Request, res:Response){
        const id_doc = req.params.id
        const doc = await knex('doc').where('id', id_doc).del()
        if(doc === 0){
            return res.status(400).json({error:'documento deletado'})
        }
        return res.send('documento deletado')
    }

}

export default DocController