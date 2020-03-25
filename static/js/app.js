// from data.js select the table
var tbody = d3.select("tbody");

// BUTTON TO LOAD DATA
d3.select("#LoadData-btn").on("click",function(){
  //alert("Loading Data...");
  showData();
  console.log("<<--- Data should have been loaded");
});
// GET ALL DATA
function showData() {
    data.forEach((item) => {
      var row = tbody.append("tr");
      Object.entries(item).forEach(function ([key, value]) {
        var td = row.append("td");
        td.text(value);
      });
    });
  }

// FILTER THE TABLE USING DATETIME FIELD
  d3.select("#filter-btn").on("click",function(){
  d3.select("tbody").remove();
  var finddate=d3.select("#datetime").property('value');
  alert(finddate);
  var newtable = [];
  Eureka();
  var table = d3.select("table");
  tbody=table.append("tbody");
  //console.log(newtable);
  for (i=0;i<newtable.length;i++){
    row = tbody.append("tr")
    Object.values(newtable[i]).forEach((value) => {
      var td = row.append("td");
      td.text(value);
  });
}

//Function to get the value entered by the user
function Eureka() {
    data.forEach( (item) => {
      Object.entries(item).forEach(function ([key, value]) {
        if  (key == 'datetime')
        {
        if (value == finddate.trim()){
          newtable.push(item);
        }}
      });
    });
  }
});

var datetimeList = [];
var cityList = [];
var stateList = [];
var countryList = [];
var shapeList = [];
var commentsList = [];
datetimeList.push("Available Dates");
cityList.push("Available Cities");
stateList.push("Available States");
countryList.push("Available Countries");
shapeList.push("Available Shapes");
commentsList.push("Available Comments");

data.forEach( (item) => {
  Object.entries(item).forEach(function ([key, value]) {
    if  (key == 'datetime')
    {
      datetimeList.push(value);
    }
    if  (key == 'city')
    {
      cityList.push(value);
    }
    if  (key == 'state')
    {
      stateList.push(value);
    }
    if  (key == 'country')
    {
      countryList.push(value);
    }
    if  (key == 'shape')
    {
      shapeList.push(value);
    }
    if  (key == 'comments')
    {
      commentsList.push(value);
    }
  });
});

var datetimeList = d3.map(datetimeList, function(d){return d;}).keys();
var cityList = d3.map(cityList, function(d){return d;}).keys();
var stateList = d3.map(stateList, function(d){return d;}).keys();
var countryList = d3.map(countryList, function(d){return d;}).keys();
var shapeList = d3.map(shapeList, function(d){return d;}).keys();


// console.log(datetimeList);
// console.log(cityList);
// console.log(stateList);
// console.log(countryList);
// console.log(shapeList);
// console.log(commentsList);

var selectdate = d3.select("#datedd")
selectdate.on('change',onchange);
var selectcity = d3.select("#citydd").on('change',onchange);
var selectstate = d3.select("#statedd").on('change',onchange);
var selectcountry = d3.select("#countrydd").on('change',onchange);
var selectshape = d3.select("#shapedd").on('change',onchange);
var selectcomment = d3.select("#commentdd").on('change',onchange);

var dateOptions = selectdate.selectAll('option').data(datetimeList).enter().append('option').attr("value",d=>{return d}).text(function (d) { return d; });
var cityOptions = selectcity.selectAll('option').data(cityList).enter().append('option').attr("value",d=>{return d}).text(function (d) { return d; });
var stateOptions = selectstate.selectAll('option').data(stateList).enter().append('option').attr("value",d=>{return d}).text(function (d) { return d; });
var countryOptions = selectcountry.selectAll('option').data(countryList).enter().append('option').attr("value",d=>{return d}).text(function (d) { return d; });
var shapeOptions = selectshape.selectAll('option').data(shapeList).enter().append('option').attr("value",d=>{return d}).text(function (d) { return d; });
var commentsOptions = selectcomment.selectAll('option').data(commentsList).enter().append('option').attr("value",d=>{return d}).text(function (d) { return d; });

selectedItems = {};
var newtable=[];
function GEureka(newdata,findkey,findvalue) {
  newdata.forEach( (item) => {
    Object.entries(item).forEach(function ([key, value]) {
      if  (key == findkey)
      {
      if (value == findvalue){
        newtable.push(item);
      }}
    });
  });
};
var selectedItems=[];

// Function to have multiple conditions based on the selections user makes
function onchange() {
  selectedDate = d3.select('#datedd').property('value');
  selectedCity = d3.select('#citydd').property('value');
  selectedState = d3.select('#statedd').property('value');
  selectedCountry = d3.select('#countrydd').property('value');
  selectedShape = d3.select('#shapedd').property('value');
  selectedComment = d3.select('#commentdd').property('value');
  //selectedItems = [{"datetime": selectedDate, "city": selectedCity, "state": selectedState, "country": selectedCountry, "shape": selectedShape, "comment": selectedComment}];
  selectedItems =[]
  
  selectedItems.push("datetime" + ":" + selectedDate)
  selectedItems.push("city" + ":" + selectedCity)
  selectedItems.push("state" + ":" + selectedState)
  selectedItems.push("country" + ":" + selectedCountry)
  selectedItems.push("shape" + ":" + selectedShape)
  selectedItems.push("comment" + ":" + selectedComment)
  
  d3.select("tbody").remove();
  newtable = data;
  //console.log(selectedItems);
  for(i=0;i<selectedItems.length;i++){
    findkey = selectedItems[i].split(":")[0];
    findvalue = selectedItems[i].split(":")[1];
    if (!/^Available/.test(findvalue)){
      getTable=newtable;
      newtable=[]
      GEureka(getTable,findkey,findvalue);
      }
  }
  var table = d3.select("table");
  tbody=table.append("tbody");
  //console.log(newtable);
  for (i=0;i<newtable.length;i++){
    row = tbody.append("tr")
    Object.values(newtable[i]).forEach((value) => {
      var td = row.append("td");
      td.text(value);
  });}
};