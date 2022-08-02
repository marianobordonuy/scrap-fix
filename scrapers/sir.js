const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

let sirUSD = {};
let sirARS = {};
let sirBRL = {};
let sirEUR = {};
const sirUrl = 'https://www.cambiosir.com.uy/';

const sirQuotes = async() => {
    const {data} = await axios.get(sirUrl);
    const $ = cheerio.load(data);
    $('table#theTable').each(function () {
        $('table#theTable').each(function () {
            const source = "Sir";
            const url = sirUrl;
            const currency = "USD";
            const buy = $('body > tr:nth-child(1) > td:nth-child(2)', this).text();
            const sell = $('tr:nth-child(1) > td:nth-child(2)', this).next().text();
            const timestamp = new Date();
            sirUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.mod-cotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "ARS";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(3)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(3)', this).text();
            const timestamp = new Date();
            sirARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.mod-cotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "BRL";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(4)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(4)', this).text();
            const timestamp = new Date();
            sirBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.mod-cotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "EUR";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(5)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(5)', this).text();
            const timestamp = new Date();
            sirEUR = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
    })
    //Save data into fs
    fs.writeFile(path.join(__dirname, '../_data/_sir/', 'sirUSD.json'), JSON.stringify(sirUSD, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for sirUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_sir/', 'sirARS.json'), JSON.stringify(sirARS, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for sirARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_sir/', 'sirBRL.json'), JSON.stringify(sirBRL, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for sirBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_sir/', 'sirEUR.json'), JSON.stringify(sirEUR, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for sirEUR");
        }
    });
    sirUSD = {};
    sirARS = {};
    sirBRL = {};
    sirEUR = {};
}

module.exports = {sirQuotes};