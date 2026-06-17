/* ==========================================
   KPI ENGINE
========================================== */

function renderKPIs(){

  const data =
  state.filteredData;

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

  const qty =
  data.reduce(
    (a,b)=>a+b.Qty,
    0
  );

  const orders =
  new Set(
    data.map(
      d=>d.SalesOrderID
    )
  ).size;

  const customers =
  new Set(
    data.map(
      d=>d.CustomerID
    )
  ).size;

  const margin =
  sales
  ? (profit/sales)*100
  : 0;

  document.getElementById(
    "kpiSalesVal"
  ).textContent =
  currency(sales);

  document.getElementById(
    "kpiProfitVal"
  ).textContent =
  currency(profit);

  document.getElementById(
    "kpiMarginVal"
  ).textContent =
  percent(margin);

  document.getElementById(
    "kpiQtyVal"
  ).textContent =
  number(qty);

  document.getElementById(
    "kpiOrdersVal"
  ).textContent =
  number(orders);

  document.getElementById(
    "kpiCustomersVal"
  ).textContent =
  number(customers);

  document.getElementById(
    "kpiSalesSub"
  ).textContent =
  "Revenue Generated";

  document.getElementById(
    "kpiProfitSub"
  ).textContent =
  "Net Profit";

  document.getElementById(
    "kpiMarginSub"
  ).textContent =
  "Profit Margin";

  document.getElementById(
    "kpiQtySub"
  ).textContent =
  "Units Sold";

}