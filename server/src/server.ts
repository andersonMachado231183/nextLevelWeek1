import express from 'express';

const app = express();

app.get('/users',(request, response )=>{
    response.json([
        'Pitt',
        'Stella',
        'Teté',
        'Vovó',
        'Maninha'
    ]
)});

app.listen(3333);