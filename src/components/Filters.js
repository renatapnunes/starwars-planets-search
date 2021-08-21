import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const { filters, setFilters } = useContext(Context);
  const { filterByName, filterByNumericValues } = filters;
  const { column, comparison } = filterByNumericValues;

  const optionsColumnFilter = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  let defaultValues = {
    column: '',
    comparison: '',
    value: '',
  };

  const inputChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  };

  const handleSelect = ({ target: { name, value } }) => {
    defaultValues = { ...defaultValues, [name]: value };
  };

  const applyFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, defaultValues],
    });
  };

  return (
    <section>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Search"
        value={ filterByName.name }
        onChange={ inputChange }
      />
      <div>
        <select
          data-testid="column-filter"
          name="column"
          value={ column }
          onChange={ handleSelect }
        >
          { optionsColumnFilter.map((option, index) => (
            <option key={ index } value={ option }>{ option }</option>)) }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ comparison }
          onChange={ handleSelect }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          value={ filterByNumericValues.value }
          onChange={ handleSelect }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ applyFilter }
        >
          Aplicar
        </button>
      </div>
    </section>
  );
}

export default Filters;
