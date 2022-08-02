const puppeteer = require('puppeteer');
const _ = require('lodash')
const express = require('express')
const app = express()
let reportTunnel = {};
const cors = require('cors');

app.use(cors());
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
    await page.goto("https://apnews.com/hub/world-news");
    
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
    // console.log(report)
    reportTunnel = report;
    // await page.screenshot({path:"apnews.png", fullPage:true})
    await browser.close()
}

start()
//save url of scraper execution, save url for each story, offer redirect if clicked. iframe?
//need to make restful, along with front end. need to link this asap so that i can design front end. going to be very plain. 
//create buttons to be able to start a scrape? maybe for admin
//create an automated time to rescrape, shut down express server for that time
//
//link this to mongod server

app.get('/', (req,res)=>{
    res.json("web scraper")
})

app.get('/api', (req,res)=>{
    res.json(reportTunnel)
})

app.listen(3001,()=>{
    console.log("scraper app back end listening port 3001")
})

//is there a device driver for like scrolling led signs. can i pass it a json to display a message? looking into it right now.
//idea, maybe set up raspberry pi to display it. i want it to always get the feed. perhaps just add a bunch of console.logs during execution.
//split screen, other screen shows feed of json objects.
//perhaps sends get requests. maybe retrieveable through localhost, but is there a way to get a headless one? like not through a front end web browser,
//but just fetches the object through backend.

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
