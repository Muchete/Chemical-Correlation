# DataViz

Chemical Correlation is a project from Michael Schönenberger, Katharina Durrer and Dyon Ruiter. It was developed in 2017 at the ZHdK, the University of the Arts in Zurich, during the module Interactive Data Visualization with Joël Gähwiler and Benjamin Wiederkehr.
The interactive web version is available [here](http://cc.michaelschoenenberger.ch/).

The visualization displays the correlation between popularity in music genres and drugs over the last 17 years. The goal was not to prove facts, but rather to let the viewer discover certain similarities and stimulate thoughts on what could have happened in a specific year. We chose two overlaying curves* to visualize the correlation.

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

### How to read
Green shows a certain drug, whereas red is a music genre. The X-axis represents time. Our visualization starts in 2000 and ends in 2017. The Y-axis shows the popularity in that specific year.

*Each popularity curve was normalized in order to display the correlation visually more clear.

We used a formula called the Pearson Correlation to calculate the similarities between our music genres and drugs.

Top 10 similar curves: 

1. Alternative/Indie & Meth
2. Blues & Cannabis
3. Hip Hop/Rap & Ketamine
4. Jazz & Cannabis
5. RnB/Soul & Meth
6. Christian/Gospel & Meth
7. Christian/Gospel & Mushrooms
8. Dance/Electronic & Heroin
9. Dance/Electronic & Cannabis
10. Country & Cannabis

Top 10 converse curves:

1. Christian/Gospel & LSD
2. Rock & Heroin
3. Blues & Meth
4. Jazz & Meth
5. Alternative/Indie & Cannabis
6. Classical & LSD
7. Pop & Meth
8. Rock & Ketamine
9. Blues & Cocaine
10. Jazz & Cocaine


Plugins used:
- [d3.js](https://d3js.org/)
- [jQuery](http://jquery.com/)

### Dataset

The data is stored in the [ULTIMATE_DATA.json](https://github.com/Muchete/DataViz/blob/master/website/data/ULTIMATE_DATA.json) file.
It is structured in music data, drug data and correlation data. 

#### Data Sources
Music Data: Google Music Timeline
Drug Data: erowid.org
Drug Data: Chemical Youth
Correlation Data: self-calculated using a Pearson Correlation formula

## Thanks to
Timo Grossenbacher, for inspirational lessons on data journalism.
Benjamin Wiederkehr, for helpful Inputs on interactive visualizations.
Joël Gähwiler, for mentoring and tech-support.
Chemical Youth, for sharing their data with us.
Matt West, for creating a Pearson Correlation formula in Javascript.