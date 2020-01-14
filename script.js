async function resultFetch(url) {
  try {
    let request = await fetch(url);
    let jsonResult = await request.json();
    return jsonResult;
  } catch (err) {
    console.log(err);
  }
}

const displayPokemon = pokemon => {
  console.log(pokemon);
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
                    <img src ="${pokemon.sprites.front_default}"></img>
                    <h2>${pokemon.name}</h2>
    `;
  document.querySelector(".listCard").appendChild(card);
};

const displayListPokemon = listPokemon => {
  listPokemon.forEach(pokemon => {
    const url = pokemon.url;
    let resultPokemon = resultFetch(url).then(pokemon =>
      displayPokemon(pokemon)
    );
  });
};

const justNumber = string => {
  const regExp = /-?\d+/;
  let result = string.match(regExp);
  return parseInt(result[0]);
};

const moveCard = (element, negative = true) => {
  element.addEventListener("click", () => {
    let root = document.documentElement;
    let positionCardString = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--positionCard");

    let positionCard = justNumber(positionCardString);
    console.log(positionCard);

    let movePourcent = negative ? positionCard - 396 : positionCard + 396;

    movePourcent >= 0 ? (movePourcent = 0) : (movePourcent = movePourcent);

    root.style.setProperty("--positionCard", `${movePourcent}px`);
  });
};

const moveCardListener = () => {
  let leftBtn = document.querySelector(".leftBtn");
  moveCard(leftBtn, false);

  let rightBtn = document.querySelector(".rightBtn");
  moveCard(rightBtn);
};

let resultListPokemon = resultFetch(
  "https://pokeapi.co/api/v2/pokemon/"
).then(resultsPokemon => displayListPokemon(resultsPokemon.results));
moveCardListener();
