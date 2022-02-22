const axios = require('axios');
function fakedata(count){
    const API_key = 'JfahHORL7Enl'
    const value = randomAround(32) 
    axios 
        .get(`http://localhost:4000/api/data?API_key=${API_key}&value=${value}`)
        .then(console.log(`oke ${count}`)) 
}
function randomAround(a){
    var random;
    do{
        random= Math.random()*120
    }while(random <= 90)
    return a*random/100
}
const sleep = m => new Promise(r => setTimeout(r, m))

const fake = (count)=>{
    return sleep(2000).then(fakedata(count))
}

for(let count = 0; count< 1000; count++)
fake(count).then(()=>{})