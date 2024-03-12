# Tempy - a Weather App by OrzCode

With this app, I furthered my knowledge of API usage and importance of promises/async functions.

I've taken the API data from a weather service, re-constructed and pruned it with various types of formatting as a bespoke object suited for this app, and displayed desired data accordingly.

One aim was to have all the data on one page at a glance, and for ease' sake only have forecasts for today and tomorrow (max was 3 days anyway, from the free tier API). Hourly data was easier to display at set intervals (12pm, 3pm, 6pm, 9pm).

It is of course curated for mobile displays too (or at least, my mobile).

As is my current trend, I tried hard to compartmentalize and abstractify the code. For the most part, this worked well.

PRO-TIP for mobile address bar:
````````````````````````````
If you do:

html, body {
    height: 100%;
}

.container {
    height: 100%;
}

this will result in the height of the viewport minus the url bar!
````````````````````````````
# Future additions would include:
a loading spinner
dynamic backgrounds based on weather w/frosted glass effect
average-out the hourly rain chance for 1hr either side
