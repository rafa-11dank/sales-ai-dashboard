function renderInsights(){

  const data =
  state.filteredData;

  if(!data.length) return;

  renderSetupCards(data);

  renderAnomalies(data);

  renderNarrative(data);

}

/* ==========================================
   BEST PERFORMING CATEGORY, TERRITORY & PRODUCT
========================================== */
function renderSetupCards(data){

  const container =
  document.getElementById(
    "setupGrid"
  );

  const categoryMap = {};
  const territoryMap = {};
  const productMap = {};

  data.forEach(row=>{

    categoryMap[row.Category] =
      (categoryMap[row.Category]||0)
      + row.Sales;

    territoryMap[row.Territory] =
      (territoryMap[row.Territory]||0)
      + row.Profit;

    productMap[row.ProductName] =
      (productMap[row.ProductName]||0)
      + row.Profit;

  });

  const bestCategory =
  Object.entries(categoryMap)
  .sort((a,b)=>b[1]-a[1])[0];

  const bestTerritory =
  Object.entries(territoryMap)
  .sort((a,b)=>b[1]-a[1])[0];

  const bestProduct =
  Object.entries(productMap)
  .sort((a,b)=>b[1]-a[1])[0];

  container.innerHTML = `

  <div class="insight-grid">

    <div class="insight-card">

      <div class="insight-title">
      Top Category
      </div>

      <div class="insight-value">
      ${bestCategory[0]}
      </div>

      <div class="insight-desc">
      ${currency(bestCategory[1])}
      sales generated
      </div>

    </div>

    <div class="insight-card">

      <div class="insight-title">
      Most Profitable Territory
      </div>

      <div class="insight-value">
      ${bestTerritory[0]}
      </div>

      <div class="insight-desc">
      ${currency(bestTerritory[1])}
      total profit
      </div>

    </div>

    <div class="insight-card">

      <div class="insight-title">
      Best Product
      </div>

      <div class="insight-value">
      ${bestProduct[0]}
      </div>

      <div class="insight-desc">
      ${currency(bestProduct[1])}
      profit generated
      </div>

    </div>

  </div>

  `;

}

/* ==========================================
   NEGATIVE PROFIT DETECTION
========================================== */
function renderAnomalies(data){

  const container =
  document.getElementById(
    "anomalyGrid"
  );

  const anomalies =
  data
  .filter(
    x=>x.Profit < 0
  )
  .slice(0,5);

  if(!anomalies.length){

    container.innerHTML = "";

    return;
  }

  container.innerHTML = `

  <div class="insight-card">

    <div class="insight-title">
    Profit Anomalies
    </div>

    <div class="insight-desc">

      ${anomalies.map(a=>`
        • ${a.ProductName}
        (${currency(a.Profit)})
      `).join("<br>")}

    </div>

  </div>

  `;

}

/* ==========================================
   AI NARRATIVE
========================================== */
function renderNarrative(data){

  const sales =
  data.reduce(
    (a,b)=>a+b.Sales,
    0
  );

  const profit =
  data.reduce(
    (a,b)=>a+b.Profit,
    0
  );

  const margin =
  sales
  ? ((profit/sales)*100)
  : 0;

  const container =
  document.getElementById(
    "narasi-grid"
  );

  container.innerHTML = `

  <div class="narrative-card">

  <h2>
  AI Business Narrative
  </h2>

  <br>

  During the selected period,
  the company generated
  <strong>${currency(sales)}</strong>
  in revenue and
  <strong>${currency(profit)}</strong>
  in profit.

  Overall profit margin reached
  <strong>${margin.toFixed(2)}%</strong>.

  Based on current data,
  the strongest business
  opportunity comes from
  high-performing categories
  and profitable territories,
  while several products still
  generate negative profit and
  should be reviewed for pricing
  or cost optimization.

  </div>

  `;

}