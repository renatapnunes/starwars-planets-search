import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const { filters, setFilters } = useContext(Context);
  const { filterByName: { name } } = filters;

  const handleChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <section>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Search"
        value={ name }
        onChange={ handleChange }
      />
    </section>
  );
}

export default Filters;
