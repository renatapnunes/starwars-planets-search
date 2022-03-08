import React, { useContext } from 'react';
import Context from '../context/Context';
import useFilter from '../hooks/useFilter';
import planetsCard from '../services/planetsCard';
import '../styles/table.css';

function Table() {
  const { data } = useContext(Context);
  const { handleFilter } = useFilter();

  if (!data.length) return <span>Loading...</span>;

  const list = Object.keys(data[0]);
  // combinação do splice com indexOf baseado em:
  // https://www.mundojs.com.br/2018/09/06/removendo-elementos-de-uma-lista-array-javascript/
  list.splice(list.indexOf('residents'), 1);
  const columns = list;

  const showCard = ({ target }) => {
    console.log();
    const image = target.children[0];
    image.style.display = 'flex';
  };

  const hideCard = ({ target }) => {
    const image = target.children[0];
    image.style.display = 'none';
  };

  const fillLines = () => (
    handleFilter().map((planet, index) => (
      <tr key={ index } className="table-line">
        { columns.map((column, i) => {
          if (column !== 'name') return (<td key={ i }>{ planet[column] }</td>);
          return (
            <td
              data-testid="planet-name"
              className="planet-name"
              key={ i }
              onFocus={ showCard }
              onMouseOver={ showCard }
              onMouseLeave={ hideCard }
            >
              { planet[column] }
              <img
                className="planet-img"
                id={ planet[column] }
                src={ planetsCard[planet[column]] }
                alt={ planet[column] }
              />
            </td>);
        }) }
      </tr>
    ))
  );

  return (
    <table>
      <thead>
        <tr className="header">
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
