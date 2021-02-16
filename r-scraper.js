//scrape news titles from Reddit r/news
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com/r/news/';

puppeteer
.launch()
.then(browser => browser.newPage())
.then(page => {
    return page.goto(url).then(function() {
        return page.content();
    });
})
.then(html => {
    const $ = cheerio.load(html);
    const story = $('a[href*="/r/news/comments/"] h3');
    const storyTitles = [];

    for (let i=0; i < story.length; i++){
        storyTitles.push({
            title: $(story[i]).text(),
        })
    }
    console.log(storyTitles);
})