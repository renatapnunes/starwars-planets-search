import { useContext } from 'react';
import Context from '../context/Context';

function useFilter() {
  const { data, filters } = useContext(Context);
  const { filterByName, filterByNumericValues, order } = filters;

  const handleFilter = () => {
    let planets = [...data];

    if (filterByName.name) {
      planets = planets.filter(({ name }) => name.includes(filterByName.name));
    }

    if (filterByNumericValues.length) {
      // A ideia do "comparator" foi dada pelo colega de turma Bruno Yamamoto:
      const comparator = {
        'maior que': (a, b) => a > b,
        'menor que': (a, b) => a < b,
        'igual a': (a, b) => a === b,
      };

      filterByNumericValues.forEach(({ column, comparison, value }) => {
        planets = planets
          .filter((planet) => comparator[comparison](+planet[column], +value));
      });
    }

    const { column, sort } = order;
    let x = '';
    let y = '';
    const negative = -1;
    const sortPlanets = [...planets];

    sortPlanets.sort((a, b) => {
      if (sort === 'ASC') {
        x = a[column];
        y = b[column];
      } else {
        x = b[column];
        y = a[column];
      }

      if (Number(x)) {
        return x - y;
      }

      if (x < y) { return negative; }
      if (x > y) { return 1; }
      return 0;
    });

    return sortPlanets;
  };

  return {
    handleFilter,
  };
}

export default useFilter;
