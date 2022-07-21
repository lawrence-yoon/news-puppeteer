const puppeteer = require('puppeteer');
const _ = require('lodash')
// const mongoose = require('mongoose');
// const {Schema} = mongoose;

// mongoose.connect('mongodb://localhost:27017/apnews-scraper')

// const articleSchema = new Schema({
//     title: String,
//     author: String,
//     summary: String,
//     date: {type: Date, default:Date.now}
// })

async function start() {
    const titleArray = [];
    const authorArray = [];
    const summaryArray = [];
    const timeArray = [];
    const packageArray = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://apnews.com/hub/trending-news");
    
    const report = await page.evaluate(()=>{
        const now = new Date();


        // // dateArray = [...document.querySelectorAll(".Timestamp span")].map(z=>({"date":z.innerHTML}));
        // packageArray= _.zipWith(titleArray,authorArray,summaryArray, function(title,author,summary){
        //     return {
        //         title,
        //         author,
        //         summary
        //     }
        // })
        // const test = [...document.querySelectorAll("div.CardHeadline h2, div.CardHeadline span, div.content p")].map(t=>({[t.tagName]:t.innerHTML}));
        titleArray = [...document.querySelectorAll("div.CardHeadline h2")].map(x=>(x.textContent));
        timeArray = [...document.querySelectorAll("div.CardHeadline span.Timestamp")].map(t=>(t.getAttribute("title")));
        summaryArray = [...document.querySelectorAll("div.content p:first-child")].map(s=>(s.textContent));
        authorArray = [...document.querySelectorAll("div.CardHeadline span:first-child")].map(a=>a.textContent)
        packageArray = _.zipWith(titleArray,authorArray,summaryArray,timeArray, function(title,author,summary,article_timestamp){
            return {
                title,
                author,
                summary,
                article_timestamp
            }
        })

        return [
            packageArray,
            {"execute_timestamp":String(now)}
            // titleArray.length, authorArray.length, summaryArray.length
        ]
        // packageArray
            // author: authorString,
            // summary: summaryString,
            // date: dateString
        //i need to figure out a nice way to get info. maybe under 'article > div.FeedCard'

    })
    console.log(report)
    // await page.screenshot({path:"apnews.png", fullPage:true})
    await browser.close()
}

start()

//make a web scraper for apnews. 
//scrape apnews at 6am, the trending news, etc.
//make a script that text to speech headlines
//create an auto generating menu
//the menu is on default, trending news
//trending news stories are scraped, data put into json
//topics are the <a class="featured-link">
////APNEWS - TRENDING
////STORIES
////[1] story1
////[2] story2
////[...] story...
////
////TOPICS
////[1] topic1
////[2] topic2

////[r] replay, [s] [story#] select story ..., [c] [topic#] 
