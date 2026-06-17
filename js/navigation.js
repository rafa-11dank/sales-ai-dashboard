function initNavigation(){

  const navItems =
  document.querySelectorAll(
    ".nav-item"
  );

  navItems.forEach(item=>{

    item.addEventListener(
      "click",
      ()=>{

        navItems.forEach(nav=>
          nav.classList.remove(
            "active"
          )
        );

        item.classList.add(
          "active"
        );

        document
        .querySelectorAll(
          ".section"
        )
        .forEach(sec=>
          sec.classList.remove(
            "active"
          )
        );

        const target =
        item.dataset.section;

        document
        .getElementById(
          `section-${target}`
        )
        .classList.add(
          "active"
        );

      }
    );

  });

}