# DataViz
Code, used within the Data Visualisation module in 2017

## Erowid Scraper

1. Link the path of the node jQuery extension (line 37):
```javascript
.inject('js', '/Users/michaelschonenberger/scraping-project/node_modules/jquery/dist/jquery.js')
```
2. Specify the drugs to scrape (line 9):
```javascript
const drugList = [
  1, //Cannabis
  2, //LSD
  3, //MDMA 
  4, //Absinthe 
  6, //Amphetamine
  11, //Caffeine
  13, //Cocaine
  27, //Heroin
  31, //Ketamine
  37, //Meth
  39, //Mushrooms
  47, //Tobacco
  61, //Alcohol
  63, //Opium
  211 //Morphine
];
```

## Website

The website can be seen in action on [Chemical Correlation](http://cc.michaelschoenenberger.ch/).

Plugins used:
- [d3.js](https://d3js.org/)
- [jQuery](http://jquery.com/)

### Dataset