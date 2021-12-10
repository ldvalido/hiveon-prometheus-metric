'use strict'
const stdio = require('stdio');

const ops = stdio.getopt({
    'addr': {key: 'a', args: 1, description: 'Eth Address'}
    });

const promclient = require('prom-client');
const Gauge = promclient.Gauge;
const register = promclient.register;
const Histogram = promclient.Histogram;

const express = require('express');
const app = express();

const statsHandler =  require ("../stats.js");
/*
const metrics = {
    gauges: [
        {name:'overwatch_total_eth',help:'Your total count of ethereum',metric:(r)=>r.billing.totalUnpaid}
    ]
}*/
let totalEth = new Gauge({
    name:'overwatch_total_eth', 
    help:'Your total count of ethereum',
    });

let realTimeHashrate = new Gauge({
    name:'hashrate_realtime', 
    help:'Realtime Hashrate',
    });


let avgHashrate = new Gauge({
    name:'hashrate_avg', 
    help:'Avg. Hashrate over 24h',
    });

let reportedHashrate = new Gauge({
    name:'hashrate_reported', 
    help:'Reported Hashrate',
    });

let reportedHashrate24 = new Gauge({
    name:'hashrate_reported24', 
    help:'Reported Hashrate over 24h',
    });
            

const addr = ops.addr;

app.get("/metrics", (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        
        statsHandler.getAll(addr).then(r => {
            let n = Number(r.billing.totalUnpaid);
            totalEth.set(n);

            realTimeHashrate.set(Number(r.overview.hashrate))
            avgHashrate.set(Number(r.overview.hashrate24h))
            reportedHashrate.set(Number(r.overview.reportedHashrate))
            reportedHashrate24.set(Number(r.overview.reportedHashrate24h))
        });
		
        register.metrics().then(m => {
            console.log(m);
            res.end(m);
        });
	} catch (ex) {
		res.status(500).end(ex);
	}
});

app.listen(process.env.port || 9010, "0.0.0.0", () => {
    console.log("Listening");
    console.log(ops.addr);
});
