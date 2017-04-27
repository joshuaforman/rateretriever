Hello, welcome to 'Rate Retriever'.

For setup instructions see the SETUP section below

This meets the following requirements:
Write a web app that will find out what the best exchanges would be for each of these trades. The app should talk to two exchange (some suggestions: BTC-E, Poloniex, Bittrex) api's to get real data.
The results should display what the exchange rate is at all the exchanges for each of the 3 trades Joe want do and highlight which is the best rate at each.
Other considerations:
For backend or full stack dev applicants:
    - Please complete the challenge using Nodejs.
    - Can simply print out results in console log.
    Extra points for:
        - using ES6/ES7
        - tracking results over time
        - integrating data from more exchanges
        - display how much more Joe will get when he makes each trade at exchange A vs exchange B
        - make results accessible via an api
        - display results in web page
        - ability to toggle if conversion shows bitcoin to altcoin or altcoin to bitcoin

***************
SETUP
***************

This is a pretty straightforward node backend / react frontend setup. Specific instructions:
1. Clone this repository
2. `cd` into project folder
3. `cd` to the `server` folder
4. run `npm i`
5. run `node server.js` (this will run a node server on port 8090, please make sure nothing else is using 8090. The server gets exchange data every 10 seconds and stores in memory).
6. `cd` into the `react` folder
7. run `npm i`
8. run `npm run dev` (this will serve the react app on port 8080, please make sure nothing else is using 8080)
9. Open a web browser and go to URL `localhost:8080`

***************
NOTES
***************

To ensure server is working you can copy this directly into a URL and make sure a response is returned: `http://localhost:8090/api/v1/getlatestrates`. Note that you won't get data until 10 seconds have passed after starting the node server.

There are a couple places in the code that I have signified what I would do next. But I wanted to get this over to you and think you can get a good enough idea of what I can do with what I have delivered.

