function destroyChart(name){

  if(state.charts[name]){

    state.charts[name].destroy();

  }

}
/* ==========================================
   SALES DAN PROFIT TREND CHART
========================================== */
function renderTrendChart(){

  destroyChart("trend");

  const monthly = {};

  state.filteredData.forEach(row=>{

    const key =
    row.Year + "-" +
    String(
      row.OrderDateObj.getMonth()+1
    ).padStart(2,"0");

    if(!monthly[key]){

      monthly[key] = {
        sales:0,
        profit:0
      };

    }

    monthly[key].sales += row.Sales;
    monthly[key].profit += row.Profit;

  });

  const labels =
  Object.keys(monthly).sort();

  state.charts.trend =
  new Chart(
    document.getElementById(
      "chartTrend"
    ),
    {
      type:"line",
      data:{
        labels,
        datasets:[
          {
            label:"Sales",
            data:labels.map(
              l=>monthly[l].sales
            ),
            tension:.4
          },
          {
            label:"Profit",
            data:labels.map(
              l=>monthly[l].profit
            ),
            tension:.4
          }
        ]
      }
    }
  );

}

/* ==========================================
   CATEGORY CHART
========================================== */
function renderCategoryChart(){

  destroyChart("category");

  const map = {};

  state.filteredData.forEach(r=>{

    map[r.Category] =
    (map[r.Category]||0)
    + r.Sales;

  });

  state.charts.category =
  new Chart(
    document.getElementById(
      "chartCategory"
    ),
    {
      type:"doughnut",
      data:{
        labels:Object.keys(map),
        datasets:[
          {
            data:Object.values(map)
          }
        ]
      }
    }
  );

}

/* ==========================================
   TERRITORY CHART
========================================== */
function renderTerritoryChart(){

  destroyChart("territory");

  const map = {};

  state.filteredData.forEach(r=>{

    map[r.Territory] =
    (map[r.Territory]||0)
    + r.Sales;

  });

  state.charts.territory =
  new Chart(
    document.getElementById(
      "chartTerritory"
    ),
    {
      type:"bar",
      data:{
        labels:Object.keys(map),
        datasets:[
          {
            label:"Sales",
            data:Object.values(map)
          }
        ]
      }
    }
  );

}

/* ==========================================
SEGMENT CHART
========================================== */
function renderSegmentChart(){

  destroyChart("segment");

  const map = {};

  state.filteredData.forEach(r=>{

    map[r.Segment] =
    (map[r.Segment]||0)
    + r.Sales;

  });

  state.charts.segment =
  new Chart(
    document.getElementById(
      "chartSegment"
    ),
    {
      type:"pie",
      data:{
        labels:Object.keys(map),
        datasets:[
          {
            data:Object.values(map)
          }
        ]
      }
    }
  );

}

/* ==========================================
    SUB-CATEGORY CHART
========================================== */
function renderSubCategoryChart(){

  destroyChart("subCategory");

  const map = {};

  state.filteredData.forEach(row=>{

    map[row.SubCategory] =
      (map[row.SubCategory] || 0)
      + row.Sales;

  });

  const sorted =
    Object.entries(map)
      .sort((a,b)=>b[1]-a[1])
      .slice(0,15);

  state.charts.subCategory =
    new Chart(
      document.getElementById(
        "chartSubCategory"
      ),
      {
        type:"bar",

options:{
  indexAxis:"y",
  responsive:true,
  maintainAspectRatio:false
},
        data:{
          labels:sorted.map(
            x=>x[0]
          ),
          datasets:[
            {
              label:"Sales",
              data:sorted.map(
                x=>x[1]
              )
            }
          ]
        },
        options:{
          indexAxis:"y"
        }
      }
    );

}

/* ==========================================
    SCATTER CHART
========================================== */
function renderScatterChart(){

  destroyChart("scatter");

  const points =
  state.filteredData
    .slice(0,500)
    .map(row=>({

      x:row.Sales,
      y:row.Profit

    }));

  state.charts.scatter =
  new Chart(
    document.getElementById(
      "chartScatter"
    ),
    {
      type:"scatter",
      data:{
        datasets:[
          {
            label:"Products",
            data:points
          }
        ]
      }
    }
  );

}

/* ==========================================
    TERRITORY PROFIT CHART
========================================== */
function renderTerritoryProfitChart(){

  destroyChart(
    "territoryProfit"
  );

  const map = {};

  state.filteredData.forEach(r=>{

    if(!map[r.Territory]){

      map[r.Territory] = 0;

    }

    map[r.Territory] +=
      r.Profit;

  });

  state.charts.territoryProfit =
  new Chart(
    document.getElementById(
      "chartTerritoryProfit"
    ),
    {
      type:"bar",
      data:{
        labels:Object.keys(map),
        datasets:[
          {
            label:"Profit",
            data:Object.values(map)
          }
        ]
      }
    }
  );

}

/* ==========================================
    TOP 10 PROFIT PRODUCTS CHART
========================================== */
function renderTopProfitChart(){

  destroyChart("topProfit");

  const map = {};

  state.filteredData.forEach(r=>{

    map[r.ProductName] =
      (map[r.ProductName] || 0)
      + r.Profit;

  });

  const sorted =
  Object.entries(map)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,10);

  state.charts.topProfit =
  new Chart(
    document.getElementById(
      "chartTopProfit"
    ),
    {
      type:"bar",

options:{
  indexAxis:"y",
  responsive:true,
  maintainAspectRatio:false
},
      data:{
        labels:sorted.map(
          x=>x[0]
        ),
        datasets:[
          {
            label:"Profit",
            data:sorted.map(
              x=>x[1]
            )
          }
        ]
      }
    }
  );

}

/* ==========================================
    TOP PRODUCTS BY SALES CHART
========================================== */
function renderTopSalesChart(){

  destroyChart("topSales");

  const map = {};

  state.filteredData.forEach(r=>{

    map[r.ProductName] =
      (map[r.ProductName] || 0)
      + r.Sales;

  });

  const sorted =
  Object.entries(map)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,10);

  state.charts.topSales =
  new Chart(
    document.getElementById(
      "chartTopSales"
    ),
    {
      type:"bar",

options:{
  indexAxis:"y",
  responsive:true,
  maintainAspectRatio:false
},
      data:{
        labels:sorted.map(
          x=>x[0]
        ),
        datasets:[
          {
            label:"Sales",
            data:sorted.map(
              x=>x[1]
            )
          }
        ]
      }
    }
  );

}

/* ==========================================
    RENDER ALL CHARTS
========================================== */
function renderCharts(){

  renderTrendChart();

  renderCategoryChart();

  renderTerritoryChart();

  renderSegmentChart();

  renderSubCategoryChart();

  renderScatterChart();

  renderTerritoryProfitChart();

  renderTopProfitChart();

  renderTopSalesChart();

}