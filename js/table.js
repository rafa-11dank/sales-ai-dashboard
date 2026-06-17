/* ==========================================
   PRODUCT TABLE
========================================== */

function renderProductTable(){

  const tbody =
  document.getElementById(
    "productTableBody"
  );

  tbody.innerHTML = "";

  const map = {};

  state.filteredData.forEach(row=>{

    const key =
    row.ProductName;

    if(!map[key]){

      map[key] = {

        product:
        row.ProductName,

        category:
        row.Category,

        subCategory:
        row.SubCategory,

        sales:0,
        profit:0,
        qty:0

      };

    }

    map[key].sales += row.Sales;
    map[key].profit += row.Profit;
    map[key].qty += row.Qty;

  });

  const rows =
  Object.values(map)
  .sort(
    (a,b)=>b.sales-a.sales
  );

  rows.forEach((row,index)=>{

    const margin =
    row.sales
    ? (row.profit/row.sales)*100
    : 0;

    const tr =
    document.createElement("tr");

    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${row.product}</td>
      <td>${row.category}</td>
      <td>${row.subCategory}</td>
      <td>${currency(row.sales)}</td>
      <td>${currency(row.profit)}</td>
      <td>${margin.toFixed(1)}%</td>
      <td>${number(row.qty)}</td>
    `;

    tbody.appendChild(tr);

  });

}
function initTableSearch(){

  const input =
  document.getElementById(
    "tableSearch"
  );

  input.addEventListener(
    "input",
    e=>{

      const keyword =
      e.target.value
      .toLowerCase();

      const rows =
      document.querySelectorAll(
        "#productTableBody tr"
      );

      rows.forEach(row=>{

        row.style.display =
        row.textContent
        .toLowerCase()
        .includes(keyword)
        ? ""
        : "none";

      });

    }
  );

}