const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

let avenidaUSD = {};
let avenidaARS = {};
let avenidaBRL = {};
let avenidaEUR = {};
const avenidaUrl = 'https://www.avenida.com.uy/';

const avenidaQuotes = async() => {
    const {data} = await axios.get(avenidaUrl);
    const $ = cheerio.load(data);
    $('.cotizaciones').each(function () {
        $('tbody > tr:nth-child(2) > td > span > span > iframe > html > body > div > div > div > table').each(function () {
            const source = "Avenida";
            const url = avenidaUrl;
            const currency = "USD";
            const buy = $('tr:contains("Dólar") > td:nth-child(3) > div > p', this).text();
            //body > div > div > div > table
            //#cotizaciones > table > tbody > tr:nth-child(2)
            const sell = $('tr:contains("Dólar") > td:nth-child(5) > div > p', this).text();
            const timestamp = new Date();
            avenidaUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('iframe').each(function () {
            const source = "Avenida";
            const url = avenidaUrl;
            const currency = "ARS";
            const buy = $('tr:contains("Dólar") > td:nth-child(3) > div > p', this).text();
            const sell = $('tr:contains("Dólar") > td:nth-child(5) > div > p', this).text();
            const timestamp = new Date();
            avenidaARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('iframe').each(function () {
            const source = "Avenida";
            const url = avenidaUrl;
            const currency = "BRL";
            const buy = $('tr:contains("Dólar") > td:nth-child(3) > div > p', this).text();
            const sell = $('tr:contains("Dólar") > td:nth-child(5) > div > p', this).text();
            const timestamp = new Date();
            avenidaBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('iframe').each(function () {
            const source = "Avenida";
            const url = avenidaUrl;
            const currency = "EUR";
            const buy = $('tr:contains("Dólar") > td:nth-child(3) > div > p', this).text();
            const sell = $('tr:contains("Dólar") > td:nth-child(5) > div > p', this).text();
            const timestamp = new Date();
            avenidaEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_avenida/', 'avenidaUSD.json'), JSON.stringify(avenidaUSD, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for avenidaUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_avenida/', 'avenidaARS.json'), JSON.stringify(avenidaARS, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for avenidaARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_avenida/', 'avenidaBRL.json'), JSON.stringify(avenidaBRL, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for avenidaBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_avenida/', 'avenidaEUR.json'), JSON.stringify(avenidaEUR, null, 2), err => {
        if (err) {
            console.log(Date() + " " + err);
        } else {
            console.log(Date() + " JSON file successfully created for avenidaEUR");
        }
    });
    avenidaUSD = {};
    avenidaARS = {};
    avenidaBRL = {};
    avenidaEUR = {};
}

module.exports = {avenidaQuotes};