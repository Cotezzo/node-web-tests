const http = require('http');
const fs = require('fs');

const homePage = fs.readFileSync('./html/index.html');

/*const server = */http.createServer((request, response) => {                   //Creo server, passo callbackFn per gestire richieste HTTP.
    console.log(request)

    switch (request.url) {                                                      //In base al percorso inserito, risponde qualcosa.
        case '/':
            respond(response, {status: 200, headers: { 'content-type': 'text/html' }}, homePage);
            break;
    
        default:                                                                //Se la pagina non esiste, ritorna 404.
            respond(response, {status: 404, headers: { 'content-type': 'text/html' }}, '<h1>The page you are looking for does not exist.</h1>');
            break;
    }
}).listen(5000)

const respond = (response, {status, headers}, data) => {                        //Funzione per scrivere ed inviare status, headers e data.
    response.writeHead(status, headers) 
    response.end(data);
}

//server.listen(5000);                                                      //Il server è in ascolto sulla porta 5000 (localhost)