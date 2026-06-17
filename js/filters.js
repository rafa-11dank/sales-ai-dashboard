/* ==========================================
   FILTER OPTIONS
========================================== */

function initFilters(){

  renderYearFilter();
  renderCategoryFilter();
  renderSegmentFilter();
  renderSubCategoryFilter();
  renderTerritoryFilter();

}

/* ==========================================
   CHIP BUILDER
========================================== */

function createChip(
  label,
  value,
  filterKey,
  container
){

  const chip =
  document.createElement("button");

  chip.className =
  "filter-chip";

  chip.textContent =
  label;

  chip.addEventListener(
    "click",
    ()=>{

      chip.classList.toggle(
        "active"
      );

      const arr =
      state.filters[
        filterKey
      ];

      const exists =
      arr.includes(value);

      if(exists){

        state.filters[
          filterKey
        ] =
        arr.filter(
          item=>item!==value
        );

      }else{

        arr.push(value);

      }

      applyFilters();

    }
  );

  container.appendChild(chip);

}

/* ==========================================
   YEAR
========================================== */

function renderYearFilter(){

  const container =
  document.getElementById(
    "filterYear"
  );

  container.innerHTML = "";

  unique(
    state.rawData,
    "Year"
  )
  .sort()
  .forEach(year=>{

    createChip(
      year,
      String(year),
      "year",
      container
    );

  });

}

/* ==========================================
   CATEGORY
========================================== */

function renderCategoryFilter(){

  const container =
  document.getElementById(
    "filterCategory"
  );

  container.innerHTML = "";

  unique(
    state.rawData,
    "Category"
  )
  .forEach(cat=>{

    createChip(
      cat,
      cat,
      "category",
      container
    );

  });

}

/* ==========================================
   SEGMENT
========================================== */

function renderSegmentFilter(){

  const container =
  document.getElementById(
    "filterSegment"
  );

  container.innerHTML = "";

  unique(
    state.rawData,
    "Segment"
  )
  .forEach(segment=>{

    createChip(
      segment,
      segment,
      "segment",
      container
    );

  });

}

/* ==========================================
   SUBCATEGORY
========================================== */

function renderSubCategoryFilter(){

  const container =
  document.getElementById(
    "filterSubCategory"
  );

  container.innerHTML = "";

  unique(
    state.rawData,
    "SubCategory"
  )
  .forEach(sub=>{

    createChip(
      sub,
      sub,
      "subCategory",
      container
    );

  });

}

/* ==========================================
   TERRITORY
========================================== */

function renderTerritoryFilter(){

  const select =
  document.getElementById(
    "filterTerritory"
  );

  unique(
    state.rawData,
    "Territory"
  )
  .sort()
  .forEach(t=>{

    const option =
    document.createElement(
      "option"
    );

    option.value = t;
    option.textContent = t;

    select.appendChild(
      option
    );

  });

  select.addEventListener(
    "change",
    e=>{

      state.filters.territory =
      e.target.value;

      applyFilters();

    }
  );

}

/* ==========================================
   APPLY FILTERS
========================================== */

function applyFilters(){

  let data =
  [...state.rawData];

  if(
    state.filters.year.length
  ){

    data =
    data.filter(d=>

      state.filters.year.includes(
        String(d.Year)
      )

    );

  }

  if(
    state.filters.category.length
  ){

    data =
    data.filter(d=>

      state.filters.category.includes(
        d.Category
      )

    );

  }

  if(
    state.filters.segment.length
  ){

    data =
    data.filter(d=>

      state.filters.segment.includes(
        d.Segment
      )

    );

  }

  if(
    state.filters.subCategory.length
  ){

    data =
    data.filter(d=>

      state.filters.subCategory.includes(
        d.SubCategory
      )

    );

  }

  if(
    state.filters.territory
  ){

    data =
    data.filter(d=>

      d.Territory ===
      state.filters.territory

    );

  }

  state.filteredData = data;

renderKPIs();

renderCharts();

renderProductTable();

renderInsights();

console.log(
  "Filtered:",
  data.length
);

}