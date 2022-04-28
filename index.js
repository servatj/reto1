const BASE_URL = 'https://rickandmortyapi.com/api'

let urlNextPage;

const init = async () => {
  const characters = await getCharacters();
  console.log(characters);
  parseData(characters);
}

window.onload = () => {
  init();
}

window.addEventListener('scroll', () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if ( scrollTop + scrollHeight > scrollHeight - 600) {
    nextPage();
  }
})

const nextPage = async () => {
  if(urlNextPage !== null) {
    const data = await fetch(urlNextPage);
    const dataToJson = await data.json();
    parseData(dataToJson);
  } else {
    console.log('End scroll')
  }
}

const getCharacters = async () => {
  const data = await fetch(`${BASE_URL}/character`);
  const dataToJson = await data.json();
  return dataToJson;
}

const printCharacter = (character) => {
  const characterContainer = document.querySelector('#characters');
  characterContainer.innerHTML += `
    <li>
      <h2>${character.name}</h2>
      <img src=${character.image} alt=${character.name}>
      <h3>${character.location}</h3>
    </li>
  `
}

const parseData = (data) => {
  data.results.forEach((character) => {
    return  printCharacter({
      name: character.name,
      image: character.image,
      location: character.location.name + '' + (character.location.origin || ''),
      orign: character.origin
    })
  })
  urlNextPage = data.info.next;
}
