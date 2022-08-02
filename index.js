const PORT = process.env.PORT || 8000
const express = require('express');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const Aspen = require ('./scrapers/aspen');
const Avenida = require('./scrapers/avenida');
const Baluma = require('./scrapers/baluma');
const Brimar =require('./scrapers/brimar');
const Eurodracma = require('./scrapers/eurodracma');
const Indumex = require('./scrapers/indumex');
const Sir = require('./scrapers/sir');

const index = express()

index.get('/', (req, res) => {
    res.json('UYU.EXCHANGE API to get the current rates for the UYU (Peso) against other main currencies offered in Punta del Este - Uruguay in USD, ARS, BRL and EUR.' +
        'You can select the exchange and the currency by placing /api/exchange(from list below)/currency(from list below)/)' +
        'Exchanges available: aspen, avenida, baluma, eurodracma, brimar, indumex, sir' +
        'Currencies available: USD, ARS, BRL, EUR')
})

//GET request to obtain rate for a given exchange and currency
index.get('/api/:sourceId/:currencyId', async (req, res) => {
    let source = req.params.sourceId;
    let currency = req.params.currencyId;
    const filePath = path.join(__dirname,'./_data/_' + source + '/', source + currency + '.json');
    //Read file and displays the response
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            res.writeHead(200, {'Content-Type': 'json'});
            res.write(data);
            res.end();
        } else {
            console.error(Date() + " " + err);
        }
    });
})

//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Aspen.aspenQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Avenida.avenidaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Baluma.balumaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Brimar.brimarQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Eurodracma.eurodracmaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Indumex.indumexQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Sir.sirQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});


index.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

module.exports = index;