const axios = require('axios');

// const sampleLink = "https://soundcloud.com/an-fillnote/algolic-confusion";
const sampleLink = "https://soundcloud.com/knuckles9-241774907/the-final-phase-by-darkmetroidomega";

/*
const getClientId = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://a-v2.sndcdn.com/assets/48-3ee59b01.js")
        .then(res => res.data)
        .then(data => {
            const clientId = data.match(/client_id:"[^"]+"/)[0].slice(11, -1);
            resolve(clientId);
        })
    })

}
*/

const get = async () => {
    return new Promise((resolve, reject) => {
        axios.get(sampleLink)
        .then(res => res.data)
        .then(data => {
            const initialData = JSON.parse(data.split("<script>window.__sc_hydration = ", 2)[1].split(";<", 1)[0]);
            const useful = initialData[initialData.length-1].data;
    
            const songUrl = useful.media.transcodings[0].url;
            const trackAuthorization = useful.track_authorization;
            const clientId = "US4P8VHRqazZTuv4RddkNN7cqCqUQkQy";    // getClientId();
    
            axios.get(`${songUrl}?client_id=${clientId}&track_authorization=${trackAuthorization}`).then(res => res.data.url)
            .then(async data => {
    
                axios.get(data).then(res => res.data).then(data => {
    
                    const i = data.lastIndexOf(",");
                    const j = data.lastIndexOf("#");
                    const stream = data.substring(i+1, j).replace(/media\/[^\/]+/, "media/0");
                    
                    // const stream = data.split(",", 2)[1].split("#", 1)[0];
                    
                    console.log(stream);
                    resolve(stream);
                })
            })
        })
    })
}

get();