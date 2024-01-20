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


input.addEventListener('keypress', debounce(function(e) {
    console.log(getRepo(e.target.value));
    // debounce(console.log(e.key), 500);
}, 500));