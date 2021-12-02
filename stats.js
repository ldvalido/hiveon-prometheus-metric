const httphelper = require('./httphelper.js')


const getWorkCount = async (address) => {
    const url = `https://hiveon.net/api/v1/stats/workers-count?minerAddress=${address}&coin=ETH&window=10m&limit=144&offset=0`; 
    const res =  httphelper.get(url);
    return res;
}
const getShares = async (address) => {
    const url = `https://hiveon.net/api/v1/stats/shares?minerAddress=${address}&coin=ETH&window=10m&limit=144&offset=0&worker=`; 
    const res =  httphelper.get(url);
    return res;
}
const getHashrate = async (address) => {
    const url = `https://hiveon.net/api/v1/stats/hashrates?minerAddress=${address}&coin=ETH&window=10m&limit=144&offset=0&worker='`; 
    const res =  httphelper.get(url);
    return res;
}
const getBilling = async (address) => {
    const url = `https://hiveon.net/api/v1/stats/miner/${address}/ETH/billing-acc`; 
    const res =  httphelper.get(url);
    return res;
}

const getOverview = async (address) => {
    const url = `https://hiveon.net/api/v1/stats/miner/${address}/ETH`; 
    const res =  httphelper.get(url);
    return res;
}

const getWorkers = async (address) => {
    const url = `https://hiveon.net/api/v1/stats/miner/${address}/ETH/workers`;
    const res = httphelper.get(url);
    return res;
    
}

const getAll = async (address) => {    
    address = address.toLowerCase()
    return {
        hashRate: await getHashrate(address),
        billing: await getBilling(address),
        workers: await getWorkers(address),
        overview: await getOverview(address),
        shares: await getShares(address),
        workersCount: await getWorkCount(address)
    } 
} 
 

module.exports = {
    getAll : getAll
}