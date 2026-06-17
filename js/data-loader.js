/* ==========================================
   CSV CONFIG
========================================== */

const CSV_PATH =
"./data/Sales_BY_Category_202606040914-1.csv";

/* ==========================================
   LOAD DATA
========================================== */

async function loadData(){

  showLoader();

  try{

    const response =
    await fetch(CSV_PATH);

    const csv =
    await response.text();

    const parsed =
    Papa.parse(csv,{
      header:true,
      dynamicTyping:true,
      skipEmptyLines:true
    });

    state.rawData =
    parsed.data.map(row=>{

      row.Sales =
      Number(row.Sales || 0);

      row.Profit =
      Number(row.Profit || 0);

      row.Qty =
      Number(row.Qty || 0);

      row.TotalCost =
      Number(row.TotalCost || 0);

      row.UnitPrice =
      Number(row.UnitPrice || 0);

      row.OrderDateObj =
      new Date(row.OrderDate);

      row.Year =
      row.OrderDateObj.getFullYear();

      row.Month =
      row.OrderDateObj
      .toLocaleString(
        "en-US",
        {
          month:"short"
        }
      );

      return row;

    });

    state.filteredData =
    [...state.rawData];

    console.log(
      "Rows Loaded:",
      state.rawData.length
    );

    console.log(
      state.rawData[0]
    );

  }

  catch(error){

    console.error(error);

  }

  hideLoader();

}