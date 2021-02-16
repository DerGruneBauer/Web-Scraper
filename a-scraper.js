const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_best-selling_albums';

// will print out list of best selling albums of all time from wiki page 
axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const statsTable = $('table.wikitable.sortable tr');
    const albums = [];
    
    for (let i=1; i < 10; i++){
      const albumName = $(statsTable[i]).find('td:nth-child(2)').text().replace("\n", "");
      const artistName = $(statsTable[i]).find('td:nth-child(1)').text().replace("\n", "");
      const totalSales = $(statsTable[i]).find('td:nth-child(6)').text().replace("\n", "") + " million";

      albums.push({
        Name: albumName, Artist: artistName, Sales: totalSales
      })
    }

    console.log(albums);

  })
  .catch(console.error);