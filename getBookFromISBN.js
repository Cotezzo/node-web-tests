const axios = require('axios');

const headers = { headers: {                                                                    //With these headers the request is faster, for some reason
    "Referer": "https://www.books-by-isbn.com/",
    "Upgrade-Insecure-Requests": 1,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}};

const getBookFromISBN = async ISBN => {
    ISBN = ISBN.replace(/\D/g, "");                                                             //Removes all non-numerical characters from the string
    return new Promise((resolve, reject) => {                                                   //Resolves or Rejects the request
        axios.get(`https://www.books-by-isbn.com/cgi-bin/isbn-lookup.pl?isbn=${ISBN}`, headers) //Actual GET
            .then(response => response.data)                                                    //Data extraction from the response object
            .then(data => {
                schif = data.split(/<\/?title>/, 3);                                            //Temp variable with the HTML string
                const title = schif[1];                                                         //Extracts the title of the book
                const author = schif[2].split(/<\/?span.*">/, 2)[1].split("<", 1)[0];           //Extracts the author of the book
                resolve({ title, author });                                                     //Resolves the request with the result
            }).catch(err => {
                reject(err);                                                                    //Rejects the request with the error
            });
    })
}

/* -------------------- TEST -------------------- */
const ISBN = '9788826816111'//'9788849418859';
getBookFromISBN(ISBN).then(res => console.log(res));

/**
 * Expected output:
 * 
 * {
 *   title: 'book title',
 *   author: 'book author'
 * }
 */