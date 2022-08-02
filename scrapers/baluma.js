const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

let balumaUSD = {};
let balumaARS = {};
let balumaBRL = {};
let balumaEUR = {};
const balumaUrl = 'http://balumacambio.enjoypuntadeleste.com.uy/cotizacion.php';

const balumaQuotes = async() => {
    const {data} = await axios.get(balumaUrl);
    const $ = cheerio.load(data);
    $('body').each(function () {
        $('table').each(function () {
            const source = "Baluma";
            const url = balumaUrl;
            const currency = "USD";
            const buy = $('tr:contains("USA") > font', this).text();
            //body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            const sell = $('tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > font', this).text();
            const timestamp = new Date();
            balumaUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('table').each(function () {
            const source = "Baluma";
            const url = balumaUrl;
            const currency = "ARS";
            const buy = $('tr:contains("USA") > font', this).text();
            //body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            const sell = $('tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > font', this).text();
            const timestamp = new Date();
            balumaARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('table').each(function () {
            const source = "Baluma";
            const url = balumaUrl;
            const currency = "BRL";
            const buy = $('tr:contains("USA") > font', this).text();
            //body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            const sell = $('tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > font', this).text();
            const timestamp = new Date();
            balumaBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('table').each(function () {
            const source = "Baluma";
            const url = balumaUrl;
            const currency = "EUR";
            const buy = $('tr:contains("USA") > font', this).text();
            //body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            const sell = $('tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > font', this).text();
            const timestamp = new Date();
            balumaEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_baluma/', 'balumaUSD.json'), JSON.stringify(balumaUSD, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for balumaUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_baluma/', 'balumaARS.json'), JSON.stringify(balumaARS, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for balumaARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_baluma/', 'balumaBRL.json'), JSON.stringify(balumaBRL, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for balumaBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_baluma/', 'balumaEUR.json'), JSON.stringify(balumaEUR, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for balumaEUR");
        }
    });
    balumaUSD = {};
    balumaARS = {};
    balumaBRL = {};
    balumaEUR = {};
}

module.exports = {balumaQuotes};