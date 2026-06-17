window.addEventListener(
  "DOMContentLoaded",
  async()=>{

    await loadData();

initFilters();

renderKPIs();

renderCharts();

renderProductTable();

renderInsights();

initTableSearch();

initNavigation();

  }
);