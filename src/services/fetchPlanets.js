async function fetchPlanets() {
  const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const data = await fetch(ENDPOINT).then((response) => response.json());
  return data;
}

export default fetchPlanets;
