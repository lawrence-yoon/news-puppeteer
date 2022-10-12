const puppeteer = require('puppeteer');
const dotenv = require('dotenv').config()
const path = require('path')
const _ = require('lodash')
const express = require('express')
const app = express()
let reportTunnel = {};

async function start() {
    console.log("scraper called")
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
        ]

    })

    reportTunnel = report;

    await browser.close()

    setTimeout(start, 21600000)
}
start()

app.get('/api', (req,res)=>{
    res.json(reportTunnel)
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}   else{
    app.get('/', (req, res) => res.send('Please set to NODE_ENV to production'))
}

app.listen(3001,()=>{
    console.log("scraper app back end listening port 3001")
})
