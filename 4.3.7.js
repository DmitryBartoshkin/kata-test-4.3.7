let body = document.body;
let wrapper = document.createElement("div");
let search = document.createElement("header");
let input = document.createElement("input");
let favorites = document.createElement("main");
let arrResult = [];

body.prepend(wrapper);
wrapper.append(search, favorites);
search.append(input);

body.style.background = "#C4C4C4";
wrapper.style.cssText =
  "width: 500px; margin: 0 auto; position: relative; font-family: 'Roboto', sans-serif; font-weight: 400; font-style: normal;";
input.style.cssText =
  "font-size: 48px; width: 100%; line-height: 56.25px; padding: 0 13px; box-sizing: border-box; border: none;";
favorites.style.marginTop = "24px";

async function getRepositories(str) {
  str = String(str);
  let countResult = 5;
  let url = `https://api.github.com/search/repositories?q=${str}&per_page=${countResult}`;
  let getResponce = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  return await getResponce.json();
}

function debounce(fn, time) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), time);
  };
}

function addFavorite(nameRepo, owner, stars) {
  favorites.insertAdjacentHTML(
    "beforeend",
    `<p style="position: relative; border: 1px solid #000; background: #E27BEB; font-size: 24px; line-height: 28.13px; padding: 8px 16px; padding-right: 90px; margin: 0;">Name: ${nameRepo}<br>Owner: ${owner}<br>Stars: ${stars} <img style="width: 42px; position: absolute; top: 31px; right: 34px;" alt="close-icon" src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgVHJhbnNmb3JtZWQgYnk6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgLTAuNSAyMSAyMSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSIjRkYwMDAwIj4KDTxnIGlkPSJTVkdSZXBvX2JnQ2FycmllciIgc3Ryb2tlLXdpZHRoPSIwIi8+Cg08ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KDTxnIGlkPSJTVkdSZXBvX2ljb25DYXJyaWVyIj4gPHRpdGxlPmNsb3NlIFsjMTUxMV08L3RpdGxlPiA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gPGRlZnM+IDwvZGVmcz4gPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+IDxnIGlkPSJEcmliYmJsZS1MaWdodC1QcmV2aWV3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDE5LjAwMDAwMCwgLTI0MC4wMDAwMDApIiBmaWxsPSIjRkYwMDAwIj4gPGcgaWQ9Imljb25zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1Ni4wMDAwMDAsIDE2MC4wMDAwMDApIj4gPHBvbHlnb24gaWQ9ImNsb3NlLVsjMTUxMV0iIHBvaW50cz0iMzc1LjAxODMgOTAgMzg0IDk4LjU1NCAzODIuNDgwNjUgMTAwIDM3My41IDkxLjQ0NiAzNjQuNTE4MyAxMDAgMzYzIDk4LjU1NCAzNzEuOTgwNjUgOTAgMzYzIDgxLjQ0NiAzNjQuNTE4MyA4MCAzNzMuNSA4OC41NTQgMzgyLjQ4MDY1IDgwIDM4NCA4MS40NDYiPiA8L3BvbHlnb24+IDwvZz4gPC9nPiA8L2c+IDwvZz4KDTwvc3ZnPg==" /></p>`
  );
}

input.addEventListener(
  "keyup",
  debounce(function (e) {
    if (!e.target.value || e.target.value != " ") {
      getRepositories(e.target.value).then(
        (obj) => {
          if (search.querySelector("ul") !== null) {
            search.querySelector("ul").remove();
          }

          let ul = document.createElement("ul");
          arrResult = obj.items;
          ul.style.cssText =
            "position: absolute; left: 0; list-style: none; margin: 0; padding: 0; width: 100%; z-index: 1;";

          if (typeof arrResult === "undefined") {
            alert("Проверьте корректность вводимых данных!");
          } else if (arrResult.length == 0) {
            alert("По запросу ничего не найдено!");
          }

          for (let item of arrResult) {
            let li = document.createElement("li");
            li.style.cssText =
              "font-size: 30px; line-height: 35.16px; border: 2px solid #000; background: #E3E3E3; padding: 0 13px; padding-bottom: 5px;";
            li.append(item.name);
            ul.append(li);
          }

          search.append(ul);
        },
        (err) => alert("Произошла ошибка:" + err)
      );
    }
  }, 700)
);

search.addEventListener("click", function (e) {
  if (e.target.localName === "li") {
    let nameRepo = e.target.textContent;
    let owner = "";
    let stars = "";

    for (let item of arrResult) {
      if (nameRepo === item.name) {
        owner = item.owner.login;
        stars = item.stargazers_count;
        break;
      }
    }

    addFavorite(nameRepo, owner, stars);
    search.querySelector("ul").remove();
    input.value = "";
  }
});

search.addEventListener("mouseover", function (e) {
  if (e.target.localName === "li") {
    e.target.style.background = "#65CDF9";

    if (e.relatedTarget.localName === "li") {
      e.relatedTarget.style.background = "#E3E3E3";
    }
  }
});

favorites.addEventListener("click", function (e) {
  if (e.target.localName === "img") {
    e.target.parentElement.remove();
  }
});
