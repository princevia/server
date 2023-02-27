const express = require('express');
const puppeteer = require('puppeteer');
const absolutify = require('absolutify');
require('dotenv').config()

const port = process.env.PORT
const app = express();

app.get('/', async (req, res) => {
    const { url } = req.query
    try {
        if (!url) {
            res.send('No Url found')
        } else {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto(`https://${url}`)

            let document = await page.evaluate(() =>document.documentElement.outerHTML)
            document = absolutify(document, `/?url=${url.split('/')[0]}`)
            return res.send(document)
        }
    } catch (error) {
        return res.send(error)
    }
})

app.listen(port, ()=>{
    console.log(`Serving running on: ${port}`)
})
