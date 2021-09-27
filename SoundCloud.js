const axios = require('axios');

const sampleLink = "https://soundcloud.com/an-fillnote/algolic-confusion";

const get = async () => {
    axios.get(sampleLink)
    .then(res => res.data)
    .then(data => {
        const initialData = JSON.parse(data.split("<script>window.__sc_hydration = ", 2)[1].split(";<", 1)[0]);
        const useful = initialData[initialData.length-1].data;

        const duration = useful.duration;   // 315536

        const songUrl = useful.media.transcodings[0].url;
        const trackAuthorization = useful.track_authorization;
        const clientId = "US4P8VHRqazZTuv4RddkNN7cqCqUQkQy";
        
        /* == IF GENERATED == *
        axios.get("https://a-v2.sndcdn.com/assets/48-3ee59b01.js")
        .then(res => res.data)
        .then(data => {
            var lientId = data.match(/client_id:"[^"]+"/)[0].slice(11, -1);
            console.log(lientId)
        })
        /* ================== */

        const playlistUrl = `${songUrl}?client_id=${clientId}&track_authorization=${trackAuthorization}`;
        axios.get(playlistUrl).then(res => res.data.url)
        .then(data => {

            console.log(data);
            axios.get(data).then(res => res.data).then(data => console.log(data))   // TODO: PRENDERE SIGNATURE DA QUA

            console.log("\n");
            const stream = data.replace("playlist", `media/0/5048109`).replace("/playlist.m3u8", "").split("&track", 1)[0];
            console.log(stream);

        })

        // V0HUUJqOaa5OJase7htgSJRmOwQshxtEdiwl68~CRAQRsQA3dL81A~WP1A599cpfCWDmT6rMO1BGpmv6ZlyRiE6zWq5bcvk3YiQnl72fo3BVjZNn5Xrs80WtifjDBUNWOGVc4YszR5VE97IxVJUtYFzmSewmxWk3akM3BNemE9sbsh5UrY2xz69mADNi6xm8n1e1-DGTMrYAhLqQYyDMV1RqMgJbjqb7dqjfktYBpyopZisg9fIZAZl2wjHwiGWKtVvBU-UMfzAA84LTTCi8ohDGGPPuLefGETRLX8tCbud1Txm6W-n7TacaXdY8OWo6dSAdaXfvNOBteF9ZTUWGrQ__
        // L8N21wjxe4Xord6Qs1L6OhluRFs~mhtoNZJZzmXdSmETOq7RgN~jaFucM-k32kS9eDjo0NAaYFgVBBknwwWKoZ6EZqiAzb1-98Ji8WvEL6tRhW~35mdUf5O8lGKd5PEBgC6zOUvgcJg2uZ2off0I6AUmiY2GrcQhfomJ34oqapTWKJPAUocd8RAt6j9dh4rt5Dp5hknLem1-8MDnD5CYrKNSP2sqUx0ZUBvrGMA41dlEBCumDWktJfywNABVbjDHHul62toAtz7GS9lAQAAlFqDNhs6Z8x0Y-PPfEi8tGasY1mT-nBjYRLbIeHTyeSRHQmIjoZ5a6I7e56LycdGIlA__
        // https://cf-hls-media.sndcdn.com/media/0/31762/Vadr2GJ2g1ix.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLyovKi9WYWRyMkdKMmcxaXguMTI4Lm1wMyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYzMjY4OTc4Nn19fV19&Signature=V0HUUJqOaa5OJase7htgSJRmOwQshxtEdiwl68~CRAQRsQA3dL81A~WP1A599cpfCWDmT6rMO1BGpmv6ZlyRiE6zWq5bcvk3YiQnl72fo3BVjZNn5Xrs80WtifjDBUNWOGVc4YszR5VE97IxVJUtYFzmSewmxWk3akM3BNemE9sbsh5UrY2xz69mADNi6xm8n1e1-DGTMrYAhLqQYyDMV1RqMgJbjqb7dqjfktYBpyopZisg9fIZAZl2wjHwiGWKtVvBU-UMfzAA84LTTCi8ohDGGPPuLefGETRLX8tCbud1Txm6W-n7TacaXdY8OWo6dSAdaXfvNOBteF9ZTUWGrQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
        // https://cf-hls-media.sndcdn.com/media/0/79410/Vadr2GJ2g1ix.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLyovKi9WYWRyMkdKMmcxaXguMTI4Lm1wMyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYzMjY4OTc4Nn19fV19&Signature=V0HUUJqOaa5OJase7htgSJRmOwQshxtEdiwl68~CRAQRsQA3dL81A~WP1A599cpfCWDmT6rMO1BGpmv6ZlyRiE6zWq5bcvk3YiQnl72fo3BVjZNn5Xrs80WtifjDBUNWOGVc4YszR5VE97IxVJUtYFzmSewmxWk3akM3BNemE9sbsh5UrY2xz69mADNi6xm8n1e1-DGTMrYAhLqQYyDMV1RqMgJbjqb7dqjfktYBpyopZisg9fIZAZl2wjHwiGWKtVvBU-UMfzAA84LTTCi8ohDGGPPuLefGETRLX8tCbud1Txm6W-n7TacaXdY8OWo6dSAdaXfvNOBteF9ZTUWGrQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
    
    })
}
get();