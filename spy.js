const axios = require('axios');
const cheerio = require('cheerio');

const username = 'zletsu'

const url = "https://profile.codersrank.io/user/" + username;

fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);  
    const cards = $('.technology-card-grid.profile-languages > .technology-card > .technology-card-header');
    const name = $('.profile-head-details > .profile-head-name.profile-head-details-row > span').text();

    cards.each(function() {
        let tec = $(this).find('.technology-card-name').text();
        let xp = $(this).find('.technology-card-score > .technology-card-score-value').text();
        console.log('O usuario ' + name + ' tem ' + xp + ' de experiencia em ' + tec);
    });
})

async function fetchData(url){
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}