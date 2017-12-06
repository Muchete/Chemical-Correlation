var fs = require('fs');
var Nightmare = require('nightmare');

const nightmare = Nightmare({ show: false });
const dateSelector = '.exp-list-table td:nth-of-type(5)';
const drugSelector = 'u';


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

//create urls
var urls = [];
for (var i = 0; i < drugList.length; i++) {
  urls.push('https://www.erowid.org/experiences/exp.cgi?S1='+drugList[i]+'&ShowViews=0&Cellar=0&Start=0&Max=15000');
}

//loop through urls
urls.reduce(function(accumulator, url) {
  return accumulator.then(function(results) {
    return nightmare.goto(url)
      .inject('js', '/Users/michaelschonenberger/scraping-project/node_modules/jquery/dist/jquery.js')
      .wait('body')
      .evaluate((dateSelector, drugSelector) => {
        var drugData = {
        };

        var drug = document.querySelector(drugSelector).innerText;
        drug = drug.slice(17);
        drugData[drug]= {
          "years": {}
        };

        for (var y = 2000; y <= 2017; y++) {
          drugData[drug].years[y.toString()] = 0;
        }

        $(dateSelector).each(function() {
            var date =  $(this).text();
            date = date.substr(date.length - 4);
            drugData[drug].years[date]++;
        });

        return drugData;
        }, dateSelector, drugSelector)
      .then(function(result){
        results.push(result);
        // console.log('results: ' + results);
        return results;
      });
  });
}, Promise.resolve([])).then(function(results){
    console.dir(JSON.stringify(results));
    fs.writeFileSync("erowidData.json", JSON.stringify(results));
});