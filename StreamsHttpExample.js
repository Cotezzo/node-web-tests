const http = require('http');
const fs = require('fs');

//for(let i = 0; i < 10000; i++)
//    fs.writeFileSync('./files/big.txt', 'random text ', {flag: 'a'});

http.createServer((request, response) => {                              //Creo server, passo callbackFn per gestire richieste HTTP.
    //console.log(request.url);

    const ReadStream = fs.createReadStream('./files/big.txt', 'utf8');  //Creo uno stream di lettura di un file
    //const ReadStream = fs.createReadStream('./files/big.txt', {encoding: 'utf8', highWaterMark: 64000});  //highWaterMark: dimensione massima pacchetti, di default 64kB.

    ReadStream.on('data', (data) => console.log("Un pacchetto è stato inviato!"));
    
    ReadStream.on('open', () => ReadStream.pipe(response))              //EVENT - Apre stream lettura file, che viene reindirizzato in response (WriteStream)
    ReadStream.on('error', (error) => response.end(error))              //EVENT - In caso di errore durante il passaggio, stampalo

}).listen(5000);                                                        //Il server è in ascolto sulla porta 5000 (localhost)