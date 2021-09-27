/*-------------------------------------------------------------INIT-------------------------------------------------------------*/
const path = require('path');
const express = require('express');
const products = require('./generic.json');
const cibi = require('./cibi.json');

const app = express();
const PORT = 5000;
app.set('json spaces', 4);                                                                  //Per indentare i JSON inviati (forse da togliere?)


/*----------------------------------------------------------MIDDLEWARE----------------------------------------------------------*/
const logger = require('./logger');
const authorize = require('./authorize');

app.use(express.static('./public'));                                                        //Sostituisce richieste di file se inseriti in './public'
app.use(express.urlencoded({ extended: true}));                                             //Middleware per fare parsing di body url-encoded (valido per tutti i path)
app.use(express.json());                                                                    //Middleware per fare parsing di body json        (valido per tutti i path)
app.use('/api', logger);                                                                    //Middleware per stampare info richieste          (valido per path con '/api')
app.use('/query', authorize);                                                               //Middleware per autorizzare. Cambiare con token  (valido per path con '/query')

/*---------------------------------------------------------GET RESPONSE---------------------------------------------------------*/
//app.get('/', (request, response) => {                                                     //GET su questo percorso
//    response.status(200)                                                                  //Commentato perché express.static è più comodo (fa lui)
//        .sendFile(path.resolve(__dirname, './html/index.html'));
//});

app.get('/api/products/:id?', (request, response) => {                                      //GET su questo percorso
    const {id} = request.params;                                                            //Prende il parametro ID messo nell'url (:id)

    let result = products;
    if(id) result = result.find((elem) => elem.id === id);                                  //Trova oggetto con ID inserito. FILTER: se non univoco. FIND: se univoco.
    
    response.json({success: true, data: result??null});
});

app.get('/query', (request, response) => {                                                  //GET su questo percorso
    //const params = request.params;                                                        //Mostra i parametri inseriti nell'url tra '/' (tipo .../:productID/... )
    //const query = request.query;                                                          //Mostra i parametri inseriti dopo il '?'

    //const result = products.filter(elem => Object.keys(query).every(key => query[key] === elem[key]));    //Ricerca tra prod quelli contutti parametri inseriti uguali

    const { search, limit=100 } = request.query;                                            //Prendo i parametri inseriti dopo il '?'
    let result = [...products];                                                             //Inizializzo l'array con tutti gli elementi

    if(search) result = result.filter(elem => elem.name.startsWith(search));                //Se il parametro è stato inserito, filtra
    if(limit) result = result.slice(0, Number(limit));                                      //Se il parametro è stato inserito, limita

    response.status(200).json({success: true, data: result});
});

app.post('/postHandler', (request, response) => {
    /*------------------------------BODY CHECK------------------------------*/
    const {scadenza, descrizione, ubicazione, quantita} = request.body;
    if(!scadenza || !descrizione || !ubicazione || !quantita) return response.status(400).json({success: false, info: 'Missing parameter'});

    const cibo = cibi.find(elem => {                                                        //Trova un cibo con caratteristiche inserite
        return  elem.scadenza === scadenza &&
                elem.descrizione === descrizione &&
                elem.ubicazione === ubicazione;
    });


    /*--------------------ROBA DA FARE POI NEL DATABASE--------------------*/
    if(cibo) cibo.quantita += +quantita;                                                    //Se esiste, aggiorna la quantità
    else cibi.push({scadenza, descrizione, ubicazione, quantita: +quantita});               //Altrimenti, crealo

    response.json({success: true})
})

/*-------------------------------------------------------DEFAULT RESPONSE-------------------------------------------------------*/
//app.all('*', (request, response) => {                                                     //Se non settata, di default dice 'Cannot <method> <path requested>'
//    response.status(404)
//        .send('<h1>The page you are looking for does not exist.</h1>');
//});

/*---------------------------------------------------------SERVER START---------------------------------------------------------*/
app.listen(PORT, () => console.log('Server successfully started. Listening on port 5000...'));

//get, post, put, delete, all, use, listen

