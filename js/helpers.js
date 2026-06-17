/* ==========================================
   LOADER
========================================== */

function showLoader() {

  const loader =
  document.getElementById(
    "loadingOverlay"
  );

  if(loader)
    loader.style.display = "flex";

}

function hideLoader() {

  const loader =
  document.getElementById(
    "loadingOverlay"
  );

  if(loader)
    loader.style.display = "none";

}

/* ==========================================
   NUMBER FORMAT
========================================== */

function currency(value) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style:"currency",
      currency:"USD",
      maximumFractionDigits:0
    }
  ).format(value || 0);

}

function number(value){

  return new Intl.NumberFormat(
    "en-US"
  ).format(value || 0);

}

function percent(value){

  return `${value.toFixed(1)}%`;

}

/* ==========================================
   GROUP BY
========================================== */

function groupBy(arr,key){

  return arr.reduce((acc,item)=>{

    const k = item[key];

    if(!acc[k]){

      acc[k] = [];

    }

    acc[k].push(item);

    return acc;

  },{});

}

/* ==========================================
   SUM
========================================== */

function sum(arr,key){

  return arr.reduce(
    (a,b)=>a+(Number(b[key])||0),
    0
  );

}

/* ==========================================
   UNIQUE
========================================== */

function unique(arr,key){

  return [
    ...new Set(
      arr.map(item=>item[key])
    )
  ];

}

/* ==========================================
   TOP N
========================================== */

function topN(obj,n=10){

  return Object.entries(obj)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,n);

}

/* ==========================================
   RANDOM ID
========================================== */

function uid(){

  return Math.random()
    .toString(36)
    .substring(2,9);

}