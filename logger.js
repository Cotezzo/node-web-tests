module.exports = (request, response, next) => {
    const {hostname, method, url} = request;
    console.log(`Received request from ${hostname}: ${method}, ${url}, ${new Date(new Date().getTime()).toString()}`);
    next();
}