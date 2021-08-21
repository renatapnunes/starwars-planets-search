import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { data } = useContext(Context);

  if (!data.length) return <span>Loading...</span>;

  const list = Object.keys(data[0]);
  // combinação do splice com indexOf baseado em:
  // https://www.mundojs.com.br/2018/09/06/removendo-elementos-de-uma-lista-array-javascript/
  list.splice(list.indexOf('residents'), 1);
  const columns = list;

  const fillLines = () => (
    data.map((planet, index) => (
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
