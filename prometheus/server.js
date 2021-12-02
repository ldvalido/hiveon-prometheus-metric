'use strict'
const stdio = require('stdio');

const ops = stdio.getopt({
    'addr': {key: 'a', args: 1, description: 'Eth Address'}
    });

const promclient = require('prom-client');
const Gauge = promclient.Gauge;
const Histogram = promclient.Histogram;

const express = require('express');
const app = express();

const statsHandler =  require ("../stats.js");

let totalEth = new Gauge({
    name:'overwatch_total_eth', 
    help:'Your total count of ethereum'});

const addr = ops.addr;

app.get("/metrics", (req, res) => {
    console.log(".");
    statsHandler.getAll(addr).then(r => {
        let n = Number(r.billing.totalUnpaid);
        console.log(n);
        totalEth.set(n);
    });
});

app.listen(process.env.port || 9010, () => {
    console.log("Listening");
    console.log(ops.addr);
});
