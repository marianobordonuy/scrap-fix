const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

let aspenUSD = {};
let aspenARS = {};
let aspenBRL = {};
let aspenEUR = {};
const aspenUrl = 'https://www.aspen.com.uy/sitio/';

const aspenQuotes = async() => {
    const {data} = await axios.get(aspenUrl);
    const $ = cheerio.load(data);
    //Scrap data from website
    $('.md-cotizaciones').each(function () {
        $('.md-cotizaciones .bd:contains("DÓLAR")').each(function () {
            const source = "Aspen";
            const url = aspenUrl;
            const currency = $('.moneda:contains("DÓLAR")', this).text().replace("DÓLAR", "USD");
            const buy = $('.bd .valor', this).first().text();
            const sell = $('.bd .valor', this).next().text();
            const timestamp = new Date();
            aspenUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.md-cotizaciones .bd:contains("ARGENTINO")').each(function () {
            const source = "Aspen";
            const url = aspenUrl;
            const currency = $('.moneda:contains("ARGENTINO")', this).text().replace("ARGENTINO", "ARS");
            const buy = $('.bd .valor', this).first().text();
            const sell = $('.bd .valor', this).next().text();
            const timestamp = new Date();
            aspenARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.md-cotizaciones .bd:contains("REAL")').each(function () {
            const source = "Aspen";
            const url = aspenUrl;
            const currency = $('.moneda:contains("REAL")', this).text().replace("REAL", "BRL");
            const buy = $('.bd .valor', this).first().text();
            const sell = $('.bd .valor', this).next().text();
            const timestamp = new Date();
            aspenBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.md-cotizaciones .bd:contains("EURO")').each(function () {
            const source = "Aspen";
            const url = aspenUrl;
            const currency = $('.moneda:contains("EURO")', this).text().replace("EURO", "EUR");
            const buy = $('.bd .valor', this).first().text();
            const sell = $('.bd .valor', this).next().text();
            const timestamp = new Date();
            aspenEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_aspen/', 'aspenUSD.json'), JSON.stringify(aspenUSD, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for aspenUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_aspen/', 'aspenARS.json'), JSON.stringify(aspenARS, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for aspenARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_aspen/', 'aspenBRL.json'), JSON.stringify(aspenBRL, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for aspenBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_aspen/', 'aspenEUR.json'), JSON.stringify(aspenEUR, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for aspenEUR");
        }
    });
    aspenUSD = {};
    aspenARS = {};
    aspenBRL = {};
    aspenEUR = {};
}

module.exports = {aspenQuotes};