const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

let eurodracmaUSD = {};
let eurodracmaARS = {};
let eurodracmaBRL = {};
let eurodracmaEUR = {};
const eurodracmaUrl = 'https://eurodracma.com/';

const eurodracmaQuotes = async() => {
    const {data} = await axios.get(eurodracmaUrl);
    const $ = cheerio.load(data);
    $('#top-bar-wrap').each(function () {
        $('.top-bar-centered').each(function () {
            const source = "Eurodracma";
            const url = eurodracmaUrl;
            const currency = "USD";
            const buy = $('strong:nth-child(2)', this).text();
            const sell = $('strong:nth-child(2)', this).text();
            const timestamp = new Date();
            eurodracmaUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.top-bar-centered').each(function () {
            const source = "Eurodracma";
            const url = eurodracmaUrl;
            const currency = "ARS";
            const buy = $('strong:nth-child(2)', this).text();
            const sell = $('strong:nth-child(2)', this).text();
            const timestamp = new Date();
            eurodracmaARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.top-bar-centered').each(function () {
            const source = "Eurodracma";
            const url = eurodracmaUrl;
            const currency = "BRL";
            const buy = $('strong:nth-child(2)', this).text();
            const sell = $('strong:nth-child(2)', this).text();
            const timestamp = new Date();
            eurodracmaBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.top-bar-centered').each(function () {
            const source = "Eurodracma";
            const url = eurodracmaUrl;
            const currency = "EUR";
            const buy = $('strong:nth-child(2)', this).text();
            const sell = $('strong:nth-child(2)', this).text();
            const timestamp = new Date();
            eurodracmaEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_eurodracma/', 'eurodracmaUSD.json'), JSON.stringify(eurodracmaUSD, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for eurodracmaUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_eurodracma/', 'eurodracmaARS.json'), JSON.stringify(eurodracmaARS, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for eurodracmaARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_eurodracma/', 'eurodracmaBRL.json'), JSON.stringify(eurodracmaBRL, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for eurodracmaBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_eurodracma/', 'eurodracmaEUR.json'), JSON.stringify(eurodracmaEUR, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for eurodracmaEUR");
        }
    });
    eurodracmaUSD = {};
    eurodracmaARS = {};
    eurodracmaBRL = {};
    eurodracmaEUR = {};
}

module.exports = {eurodracmaQuotes};
