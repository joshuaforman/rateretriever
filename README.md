Hello, welcome to 'Rate Retriever'.

For setup instructions see the SETUP section below

Thank you for the opportunity to submit this project for your review. This meets the following requirements:

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
5. run `node server.js` (this will run a node server on port 8090, please make sure nothing else is using 8090. The server gets exchange data every 10 seconds and stores in memory - so don't let it run forever).
6. in another tab/window, `cd` into the `react` folder inside the project folder
7. Open the file `react/src/index.html` in a browser.
8. Alternatively, if you want to be able to modify the code and see the changes, do the following:
9. From the `react` folder, run `npm i`
10. run `npm run dev` (this will serve the react app on port 8080, please make sure nothing else is using 8080)
11. Open a web browser and go to URL `localhost:8080`

***************
NOTES
***************

The front end is pretty plain. I did use flex, so it is a bit flex-y when sizing the window, however I did not go through the effort to make it mobile friendly.

To ensure server is working you can copy this directly into a URL and make sure a response is returned: `http://localhost:8090/api/v1/getlatestrates`. Note that you won't get data until 10 seconds have passed after starting the node server.

There are a couple places in the code that I have signified what I would do next. This is signified with a `// TODO` comment. I wanted to get this over to you and think you can get a good enough idea of what I can do with what I have delivered.  Please note that these comments are not meant to be an exhaustive list of everything else that needs to be done.

Please let me know what else you need from me and what questions I can answer for you. I would appreciate any feedback as you review my code.
