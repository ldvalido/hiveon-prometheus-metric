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

let totalEth = new Gauge({
    name:'overwatch_total_eth', 
    help:'Your total count of ethereum',
    });

const addr = ops.addr;

app.get("/metrics", (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        
        statsHandler.getAll(addr).then(r => {
            let n = Number(r.billing.totalUnpaid);
            totalEth.set(n);
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
