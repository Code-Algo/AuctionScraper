const axios = require('axios');
const cheerio = require('cheerio');

const fetchAuctions = async () => {
    try {
        const response = await axios.get('https://www.realtybid.com/search-results.cfm?q=CA&pmin=&pmax=&br=0&ba=0&st=')
        const html = response.data
        const $ = cheerio.load(html)
        const auctions = []
        base = 'https://www.realtybid.com'

        $('li.clear-floats').each((index, el) => {
            const auction = $(el)
            const html = auction.find('a').attr('href')
            auctions.push(base + html)
        })
        return auctions
    } catch (err) {
        console.error(err)
    }
}
fetchAuctions().then(auctions => console.log(auctions))