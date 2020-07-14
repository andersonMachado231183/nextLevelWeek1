import express, { request, response } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items',async(request, response)=>{ 
    const items = await knex('items').select('*');

    const serializeItems = items.map(items =>{
        return {
            id:items.id,
            title:items.title,
            img_url:`http://localhost:3333/uploads/${items.image}`,
        }
    });


    return response.json({ 
        serializeItems    
    });
});
  
routes.post('/points', async(request, response)=>{
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

   await knex('points').insert({
        image:'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,  
    });
    return response.json({
        success:true
    })
});
export default routes;