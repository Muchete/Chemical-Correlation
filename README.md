# DataViz

Chemical Correlation is a project from Michael Schönenberger, Katharina Durrer and Dyon Ruiter. It was developed in 2017 at the ZHdK, the University of the Arts in Zurich, during the module Interactive Data Visualization with Joël Gähwiler and Benjamin Wiederkehr.
The interactive web version is available [here](http://cc.michaelschoenenberger.ch/).

The visualization displays the correlation between popularity in music genres and drugs over the last 17 years. The goal was not to prove facts, but rather to let the viewer discover certain similarities and stimulate thoughts on what could have happened in a specific year. We chose two overlaying curves\* to visualize the correlation.  

![Final poster](https://user-images.githubusercontent.com/29760709/33677649-c7200f9a-dab9-11e7-8cd1-7792bdc91a00.jpg)  
_\*Each popularity curve was normalized in order to display the correlation visually more clear._

## Erowid Scraper

We scraped [erowid.org](https://www.erowid.org/experiences/exp_front.shtml) in order to get the popularity of certain drugs.  
To use the scraper, follow these instructions:

1.  Link the path of the node jQuery extension (line 37):

```javascript
.inject('js', '/Users/michaelschonenberger/scraping-project/node_modules/jquery/dist/jquery.js')
```

2.  Specify the drugs to scrape (line 9):

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

3.  Configure the filename, or log the result to your console to test (line 68):

```javascript
console.dir(JSON.stringify(results));
fs.writeFileSync("erowidData.json", JSON.stringify(results));
```

4.  Run the script using node.js.

## Website

![Website](https://user-images.githubusercontent.com/29760709/33673700-d4deaf4e-daad-11e7-8c91-d0a0a35f3e6e.png)
The website can be seen in action on [Chemical Correlation](http://cc.michaelschoenenberger.ch/).

### How to read

Green shows a certain drug, whereas red is a music genre. The X-axis represents time. Our visualization starts in 2000 and ends in 2017. The Y-axis shows the popularity in that specific year.

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

Plugins used on the website:

-   [d3.js](https://d3js.org/)
-   [jQuery](http://jquery.com/)

### Dataset

The data is stored in the [ULTIMATE_DATA.json](https://github.com/Muchete/DataViz/blob/master/website/data/ULTIMATE_DATA.json) file.
It is structured in music data, drug data and correlation data.

#### Data Sources

Music Data: Google Music Timeline  
Drug Data: erowid.org  
Drug Data: Chemical Youth  
Correlation Data: self-calculated using a Pearson Correlation formula.

## Thanks to

[Timo Grossenbacher](https://github.com/grssnbchr), for inspirational lessons on data journalism.  
[Benjamin Wiederkehr](https://github.com/wiederkehr), for helpful Inputs on interactive visualizations.  
[Joël Gähwiler](https://github.com/256dpi), for mentoring and tech-support.  
[Chemical Youth](https://chemicalyouth.org/), for sharing their data with us.  
[Matt West](https://github.com/matt-west), for creating a [Pearson Correlation](https://gist.github.com/matt-west/6500993) formula in Javascript.  
