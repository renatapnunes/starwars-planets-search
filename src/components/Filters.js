import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const defaultValues = {
    column: 'population',
    comparison: 'maior que',
    value: '',
  };

  const defaultSort = {
    column: 'name', sort: 'ASC',
  };

  const { data, filters, setFilters } = useContext(Context);
  const { filterByName, filterByNumericValues } = filters;
  const [selectValues, setSelectValues] = useState(defaultValues);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [orderValues, setOrderValues] = useState(defaultSort);

  let columns = [];
  if (data.length) {
    const list = Object.keys(data[0]);
    list.splice(list.indexOf('residents'), 1);
    columns = list;
  }

  const handleSort = ({ target: { name, value } }) => {
    setOrderValues({ ...orderValues, [name]: value });
  };

  const applySort = () => {
    setFilters({
      ...filters,
      order: { ...orderValues },
    });
  };

  useEffect(() => {
    const { column, value } = selectValues;
    if (column && value) {
      setButtonStatus(false);
    }
  }, [selectValues]);

  const inputChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  };

  const handleSelect = ({ target: { name, value } }) => {
    setSelectValues({ ...selectValues, [name]: value });
  };

  const applyFilter = async () => {
    await setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, selectValues],
    });
    await setButtonStatus(true);
    setSelectValues(defaultValues);
  };

  const optionsFilter = () => {
    let optionsColumn = ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

    if (filterByNumericValues.length) {
      filterByNumericValues.forEach(({ column }) => {
        optionsColumn = optionsColumn.filter((option) => option !== column);
      });
    }

    if (optionsColumn.length === 1) setButtonStatus(true);

    return optionsColumn;
  };

  const deleteFilter = ({ target: { value } }) => {
    const newFiltersList = filterByNumericValues
      .filter((filter) => filter.column !== value);

    setFilters({
      ...filters,
      filterByNumericValues: newFiltersList,
    });
  };

  const inputFilters = () => (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        value={ selectValues.column }
        onChange={ handleSelect }
      >
        { optionsFilter().map((option, index) => (
          <option key={ index } value={ option }>{ option }</option>)) }
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ selectValues.comparison }
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
        value={ selectValues.value }
        onChange={ handleSelect }
      />
      <button
        data-testid="button-filter"
        type="button"
        disabled={ buttonStatus }
        onClick={ applyFilter }
      >
        Aplicar
      </button>
    </div>
  );

  return (
    <>
      <section>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Search"
          value={ filterByName.name }
          onChange={ inputChange }
        />
        { inputFilters() }
        <div>
          <select
            data-testid="column-sort"
            name="column"
            onChange={ handleSort }
          >
            { columns.map((column, index) => (
              <option key={ index } value={ column }>{ column }</option>)) }
          </select>
          <label htmlFor="sort-asc">
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              id="sort-asc"
              name="sort"
              value="ASC"
              checked={ orderValues.sort === 'ASC' }
              onChange={ handleSort }
            />
            ASC
          </label>
          <label htmlFor="sort-desc">
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              id="sort-desc"
              name="sort"
              value="DESC"
              checked={ orderValues.sort === 'DESC' }
              onChange={ handleSort }
            />
            DESC
          </label>
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ applySort }
          >
            Aplicar
          </button>
        </div>
      </section>
      <section>
        { filterByNumericValues.map((filter, index) => (
          <span
            data-testid="filter"
            key={ index }
          >
            { `${filter.column} | ${filter.comparison} | ${filter.value}` }
            <button
              type="button"
              value={ filter.column }
              onClick={ deleteFilter }
            >
              X
            </button>
          </span>
        )) }
      </section>
    </>
  );
}

export default Filters;
