let div = document.createElement("div");
let input = document.createElement("input");

document.body.prepend(div);
div.append(input);

async function getRepo(str) {
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

input.addEventListener(
  "keyup",
  debounce(function (e) {
    getRepo(e.target.value).then((obj) => {
      if (div.querySelector("ul") !== null) {
        div.querySelector("ul").remove();
      }

      let ul = document.createElement("ul");

      for (let item of obj.items) {
        let li = document.createElement("li");
        li.append(item.name);
        ul.append(li);
      }

      div.append(ul);
    });
  }, 500)
);


