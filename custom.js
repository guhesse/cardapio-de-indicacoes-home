//Seleção por filterCategories

var checkboxes = document.querySelectorAll(".categories input");
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", filterCategories);
}

function filterCategories() {
  var i, j;

  // Choose an operation
  const operation = document.getElementById("op-union").checked
    ? "union"
    : "intersection";

  // Get the selected categories
  var checkboxes = document.querySelectorAll(".categories input");
  var categories = [];
  var c;
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      c = checkboxes[i].value;
      categories.push(c);
    }
  }

  // Apply the filter
  var items = document.querySelectorAll(".filterDiv");
  var item, show;
  for (i = 0; i < items.length; i++) {
    item = items[i];
    show = false;

    // If only one category is selected, show items that match that category
    if (categories.length == 1) {
      var currentCategory = categories[0];
      var isDataCity = (currentCategory == item.getAttribute("data-city"));
      var isDataCategory = (currentCategory == item.getAttribute("data-category"));
      if (isDataCity || isDataCategory) {
        show = true;
      }
    } else if (categories.length > 1) {
      // If both data-city and data-category are selected, show items that match both categories
      var dataCity = item.getAttribute("data-city");
      var dataCategory = item.getAttribute("data-category");
      if (categories.includes(dataCity) && categories.includes(dataCategory)) {
        show = true;
      }
    } else {
      show = true;
    }

    if (show) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  }
}

//Seleção por filterName
document.getElementById("myInput").addEventListener("input", filterName);

function filterName() {
  var i, j;

  //Remove Accents
  function removeAccents(str) {
    var mapaAcentosHex = {
      a: /[\xE0-\xE6]/g,
      A: /[\xC0-\xC6]/g,
      e: /[\xE8-\xEB]/g,
      E: /[\xC8-\xCB]/g,
      i: /[\xEC-\xEF]/g,
      I: /[\xCC-\xCF]/g,
      o: /[\xF2-\xF6]/g,
      O: /[\xD2-\xD6]/g,
      u: /[\xF9-\xFC]/g,
      U: /[\xD9-\xDC]/g,
      c: /\xE7/g,
      C: /\xC7/g,
      n: /\xF1/g,
      N: /\xD1/g,
    };

    for (var letra in mapaAcentosHex) {
      var expressaoRegular = mapaAcentosHex[letra];
      str = str.replace(expressaoRegular, letra);
    }

    return str;
  }

  // Get the entered name
  var nameInput = document.getElementById("myInput").value.toUpperCase();

  // Apply the filter
  var items = document.querySelectorAll(".filterDiv");
  var item, show;
  for (i = 0; i < items.length; i++) {
    item = items[i];
    if (nameInput === "") {
      show = true;
    } else {
      show = false;
      if (
        removeAccents(
          item.getElementsByClassName("card-title")[0].innerText.toUpperCase()
        ).includes(removeAccents(nameInput.toUpperCase()))
      ) {
        show = true;
      }
    }

    if (show) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  }
}

