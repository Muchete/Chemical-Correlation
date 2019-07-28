// set the dimensions and margins of the graph
var margin = { top: 10, right: 15, bottom: 20, left: 15 },
  ultimateh = 280,
  ultimatew = 1000,
  width = ultimatew - margin.left - margin.right,
  height = ultimateh - margin.top - margin.bottom;

var corrNames = [
  "very converse curve",
  "slightly converse curve",
  "neutral correlation",
  "slightly similar curve",
  "very similar curve"
];
var allGenres = [
  "COUNTRY",
  "METAL",
  "R_B_SOUL",
  "NEW_AGE",
  "REGGAE_SKA",
  "HIP_HOP_RAP",
  "JAZZ",
  "ALTERNATIVE_INDIE",
  "FOLK",
  "CHRISTIAN_GOSPEL",
  "ROCK",
  "LATIN",
  "WORLD",
  "CLASSICAL",
  "DANCE_ELECTRONIC",
  "BLUES",
  "POP"
];
var allDrugs = [
  "Cannabis",
  "LSD",
  "MDMA",
  "Amphetamines",
  "Cocaine",
  "Heroin",
  "Ketamine",
  "Methamphetamine",
  "Mushrooms"
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// parse the date / time
var parseTime = d3.timeParse("%Y");

// parse cor Data
var parseCor = d3
  .scaleLinear()
  .domain([-1, 1])
  .range([0, corrNames.length]);

var svg = d3
  .select(".wrapper")
  .append("svg")
  // .attr("width", width + margin.left + margin.right)
  // .attr("height", height + margin.top + margin.bottom)
  .attr("id", "main-graph")
  .attr("viewBox", "0 0 " + ultimatew + " " + ultimateh)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var genreBox = d3.select("#genreDiv");
var drugBox = d3.select("#drugDiv");
var corBox = d3.select("#corDiv");
var curGBox = d3.select("#curG");
var curDBox = d3.select("#curD");

var drugNo = getRandomInt(0, allDrugs.length - 1);
var genreNo = getRandomInt(0, allGenres.length - 1);
var currentDrug = allDrugs[drugNo];
var currentGenre = allGenres[genreNo];

var lastCor;

// get the data
d3.json("data/ULTIMATE_DATA.json", function(error, data) {
  var currentDrugLabel = data.drugData[drugNo].label;
  var currentGenreLabel = data.musicData[genreNo].label;

  if (error) throw error;

  // format the popularity data
  formatPopData(data.drugData);
  formatPopData(data.musicData);

  //format the correlation data
  formatCorData(data.corData);

  // scale the range of the data
  var x = d3
    .scaleTime()
    .range([0, width])
    .domain(
      d3.extent(data.drugData[0].popularity, function(d) {
        return d.year;
      })
    );
  var y = d3
    .scaleLinear()
    .range([height, 0])
    // .domain([0, 1]);
    .domain([0, 1]);

  //generate genre and Drug div elements
  genreBox
    .selectAll(".genre")
    .data(data.musicData)
    .enter()
    .append("div")
    .attr("class", "genre")
    .text(function(d) {
      return d.label;
    })
    .on("click", function(d) {
      currentGenre = d.tag;
      currentGenreLabel = d.label;
      d3.select("#genreDiv .genre.active").classed("active", false);
      d3.select(this).classed("active", true);

      // update visualization
      update();
    });

  drugBox
    .selectAll(".drug")
    .data(data.drugData)
    .enter()
    .append("div")
    .attr("class", "drug")
    .text(function(d) {
      return d.label;
    })
    .on("click", function(d) {
      currentDrug = d.tag;
      currentDrugLabel = d.label;
      d3.select("#drugDiv .drug.active").classed("active", false);
      d3.select(this).classed("active", true);

      // update visualization
      update();
    });

  corBox
    .selectAll(".corVal")
    .data(
      data.corData
        .filter(function(d) {
          return d.genre == currentGenre;
        })
        .filter(function(d) {
          return d.drug == currentDrug;
        })
    )
    .enter()
    .append("div")
    .attr("class", "corVal")
    .text(function(d) {
      return d.corVal;
    });

  drawCurve(
    data.drugData.filter(function(d) {
      return d.tag == currentDrug;
    }),
    "drug"
  );
  drawCurve(
    data.musicData.filter(function(d) {
      return d.tag == currentGenre;
    }),
    "genre"
  );

  initActiveWords();
  drawAxis();
  update();

  //-----------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------functions-------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------

  function update() {
    var currentDrugData = data.drugData.filter(function(d) {
      return d.tag == currentDrug;
    });
    var currentMusicData = data.musicData.filter(function(d) {
      return d.tag == currentGenre;
    });

    updateCurve(currentDrugData, "drug");
    updateCurve(currentMusicData, "genre");

    //update correlation number
    updateCorNumber(
      data.corData
        .filter(function(d) {
          return d.genre == currentGenre;
        })
        .filter(function(d) {
          return d.drug == currentDrug;
        })
    );

    curDBox.text(currentDrugLabel + " & " + currentGenreLabel);
    curGBox.text();
  }

  //formats the dataset
  function formatPopData(ar) {
    ar.forEach(function(d) {
      var max = d3.max(d.popularity, function(l) {
        return l.val;
      });

      d.popularity.forEach(function(p) {
        p.year = parseTime(p.year);
        p.val = p.val / 2; //half of val, because of translation of graph center
        p.normVal = (1 / max) * p.val;
        p.max = max;
      });
    });
  }

  function formatCorData(ar) {
    ar.forEach(function(d) {
      d.corVal = corrNames[parseInt(parseCor(d.corVal))];
    });
  }

  function updateCorNumber(dataSet) {
    corBox
      .selectAll(".corVal")
      .datum(dataSet[0])
      .text(function(d) {
        return d.corVal;
      });
  }

  function updateCorNumberAnimated(dataSet) {
    var format = d3.format(",d");

    corBox
      .selectAll(".corVal")
      .datum(dataSet[0])
      .transition()
      .duration(700)
      .tween("text", function(d) {
        var that = d3.select(this),
          i = d3.interpolateNumber(that.text().replace(/,/g, ""), d.corVal);
        return function(t) {
          that.text(format(i(t)));
        };
      })
      .transition()
      .on("start");
  }

  function updateCurve(dataSet, genreOrDrug) {
    // define the area
    var area = d3
      .area()
      .x(function(d) {
        return x(d.year);
      })
      .y0(function(d) {
        return y(d.normVal * -1);
      })
      .y1(function(d) {
        return y(d.normVal);
      })
      .curve(d3.curveMonotoneX);

    svg
      .selectAll("g." + genreOrDrug + " path")
      .datum(dataSet[0].popularity)
      .attr("d", area);
  }

  function drawCurve(dataSet, genreOrDrug) {
    // define the area
    var area = d3
      .area()
      .x(function(d) {
        return x(d.year);
      })
      .y0(function(d) {
        return y(d.normVal * -1);
      })
      // .y0(function(d) { return y(d.val * -1); })
      .y1(function(d) {
        return y(d.normVal);
      })
      // .y1(function(d) { return y(d.val); })
      .curve(d3.curveMonotoneX);

    var group = svg.append("g").attr("class", genreOrDrug);

    // add the area
    group
      .append("path")
      .datum(dataSet[0].popularity)
      .attr("class", "area")
      .attr("mask", "url(#fadeHor)")
      .attr("transform", "translate(0," + height / -2 + ")")
      .attr("d", area);
  }

  function drawAxis() {
    // add the X Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height / 2 + ")")
      .attr("class", "axis xAxis")
      .call(d3.axisBottom(x).ticks(8));
  }

  function initActiveWords() {
    var drugI = drugNo + 1;
    var genreI = genreNo + 1;
    d3.select("#drugDiv .drug:nth-of-type(" + drugI + ")").classed(
      "active",
      true
    );
    d3.select("#genreDiv .genre:nth-of-type(" + genreI + ")").classed(
      "active",
      true
    );
  }

  //-----------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------jquery spaghetti code-------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------------------

  $("g.drug path").hover(
    function() {
      $("g.genre path")
        .add("#genreDiv .genre.active")
        .css("opacity", ".4");
    },
    function() {
      $("g.genre path")
        .add("#genreDiv .genre.active")
        .css("opacity", "1");
    }
  );

  $("g.genre path").hover(
    function() {
      $("g.drug path")
        .add("#drugDiv .drug.active")
        .css("opacity", ".4");
    },
    function() {
      $("g.drug path")
        .add("#drugDiv .drug.active")
        .css("opacity", "1");
    }
  );
});
