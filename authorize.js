module.exports = (request, response, next) => {
    const { user } = request.query;

    if(user === "Croazia" ){
        console.log('Authorized');
        return next();
    }
    console.log('Unauthorized');
    response.status(401).send('Unauthorized');
}