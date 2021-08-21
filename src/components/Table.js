import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { data, filters: { filterByName, filterByNumericValues } } = useContext(Context);

  if (!data.length) return <span>Loading...</span>;

  const list = Object.keys(data[0]);
  // combinação do splice com indexOf baseado em:
  // https://www.mundojs.com.br/2018/09/06/removendo-elementos-de-uma-lista-array-javascript/
  list.splice(list.indexOf('residents'), 1);
  const columns = list;

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

    return planets;
  };

  const fillLines = () => (
    handleFilter().map((planet, index) => (
      <tr key={ index }>
        { columns.map((column, i) => <td key={ i }>{ planet[column] }</td>) }
      </tr>
    ))
  );

  return (
    <table>
      <thead>
        <tr>
          { columns.map((column, i) => <th key={ i }>{ column }</th>) }
        </tr>
      </thead>
      <tbody>
        { fillLines() }
      </tbody>
    </table>
  );
}

export default Table;
