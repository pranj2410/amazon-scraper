const express = require('express');
const request = require('request-promise');
 
const PORT = process.env.PORT||5000;
const app = express();

app.use(express.json());

const apiKey = '7ad1d17c2907dc8ceb58248514d8a367';

const returnScrapeUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
console.log(returnScrapeUrl(apiKey));



app.get('/', async(req,res) =>{
    res.send('Welcome to Amazon Scraper API!!');
});

// Route to fecth product details
app.get('/products/:productId', async (req,res) => {
    const {productId} = req.params;
     

    try{
        const response = await request(`${returnScrapeUrl(apiKey)}&url=https://www.amazon.in/dp/${productId}`);

        res.json(JSON.parse(response));

    }catch(error){
        res.json(error);
    }
})

// Route to get product reviews
app.get('/products/:productId/reviews', async (req,res) => {
    const {productId} = req.params;
    

    try{
        const response = await request(`${returnScrapeUrl(apiKey)}&url=https://www.amazon.in/product-reviews/${productId}`);

        res.json(JSON.parse(response));

    }catch(error){
        res.json(error);
    }
})

// Route to get product offers
app.get('/products/:productId/offers', async (req,res) => {
    const {productId} = req.params;
    

    try{
        const response = await request(`${returnScrapeUrl(apiKey)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));

    }catch(error){
        res.json(error);
    }
})

// Route to get search results
app.get('/search/:searchQuery', async (req,res) =>{
    const {searchQuery} = req.params;
    

    try{
        const response = await request(`${returnScrapeUrl(apiKey)}&url=https://www.amazon.in/s?k=${searchQuery}`);

        res.json(JSON.parse(response));

    }catch(error){
        res.json(error);
    }
})
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
 