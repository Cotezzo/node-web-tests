const axios = require("axios");
const conf = require('./conf.json');

const getURL = "https://www.youtube.com/channel/UCziqedAExmrJ6XsRZ6imPCw/videos";
axios.get(getURL).then(response => {

    const initData = JSON.parse(response.data.split('var ytInitialData =')[1]
    .split("</script>")[0]
    .slice(0, -1));

    const items = initData.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;

    console.log(items[0].gridVideoRenderer.videoId);
    //for (const item of items) {
    //    console.log(item)
    //}
});

/*--------------------------------------------------------------------------EventSub TESTING--------------------------------------------------------------------------*
const getAccessToken = async () => {                                            //Autoesplicativo.
    const link = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`;
    return (await axios.post(link)).data.access_token;
}

const getHeaders = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    return {headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Client-ID": process.env.CLIENT_ID,
        "Content-Type": "application/json"
    }}
}

const EventSubInit = async () => {
    const EventSubURL = `https://api.twitch.tv/helix/eventsub/subscriptions`;   //POST
    const headers = await getHeaders():
    const body = {
        "type": "channel.follow",
        "version": "1",
        "condition": {
            "broadcaster_user_id": "12826"
        },
        "transport": {
            "method": "webhook",
            "callback": "https://webhook.site/06e79382-2e71-45e6-ac24-adf6536b53a5",
            "secret": "s3cRe7"
        }
    }

    axios.post(EventSubURL, body, headers).then(response => {
        console.log(response.data);
    })
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------**/