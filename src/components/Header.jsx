import React, { useContext, useState } from 'react';
import MyContext from './MyContext';

function Header() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');

  const [orderColumn, setorderColumn] = useState('population');
  const [orderSort, setorderSort] = useState('ASC');

  const {
    setFilterByName,
    setFilterByNumericValues,
    filterByNumericValues,
    numberColumnFilter,
    setNumberColumnFilter,
    setOrder,
  } = useContext(MyContext);

  const nameFilter = ({ target }) => {
    setFilterByName(target.value);
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    if (id === 'column-filter') {
      setColumnFilter(value);
    } else if (id === 'comparison-filter') {
      setComparisonFilter(value);
    } else {
      setValueFilter(value);
    }
  };

  const handleChangeOrder = ({ target }) => {
    const { value, name } = target;
    if (name === 'radio') {
      setorderSort(value);
    } else {
      setorderColumn(value);
    }
  };

  const numberFilter = () => {
    const newNumberColumnFilter = numberColumnFilter;
    const indexColumnName = numberColumnFilter.indexOf(columnFilter);
    newNumberColumnFilter.splice(indexColumnName, 1);
    setNumberColumnFilter(newNumberColumnFilter);

    setFilterByNumericValues(
      [...filterByNumericValues,
        { column: columnFilter, comparison: comparisonFilter, value: valueFilter }],
    );
  };

  const removeAllFilters = () => {
    const COLLUMN_FILTER_NAMES = ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    setNumberColumnFilter(COLLUMN_FILTER_NAMES);
    setFilterByNumericValues([]);
  };

  const removeFilter = ({ target }) => {
    const index = target.id;

    const columnFilterName = filterByNumericValues[index].column;
    const newNumberColumnFilter = [...numberColumnFilter, columnFilterName];
    setNumberColumnFilter(newNumberColumnFilter);

    const newFilterByNumericValues = filterByNumericValues;
    newFilterByNumericValues.splice(index, 1);
    setFilterByNumericValues(newFilterByNumericValues);
  };

  const orderPlanets = () => {
    const newOrder = { column: orderColumn,
      sort: orderSort };
    setOrder(newOrder);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Search planet..."
          onChange={ nameFilter }
        />
        <hr />
        <select
          id="column-filter"
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ handleChange }
        >
          {numberColumnFilter.map((element, index) => (
            <option key={ index }>
              {element}
            </option>
          ))}
        </select>
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ comparisonFilter }
          onChange={ handleChange }
        >
          <option>
            maior que
          </option>
          <option>
            menor que
          </option>
          <option>
            igual a
          </option>
        </select>
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          placeholder="Only numbers..."
          value={ valueFilter }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ numberFilter }
        >
          Filter
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remove All Filters
        </button>
        <hr />
        <select
          name="orderColumn"
          data-testid="column-sort"
          value={ orderColumn }
          onChange={ handleChangeOrder }
        >
          <option>
            population
          </option>
          <option>
            orbital_period
          </option>
          <option>
            diameter
          </option>
          <option>
            rotation_period
          </option>
          <option>
            surface_water
          </option>
        </select>
        <br />
        <label htmlFor="radioo">
          Ascending
          <input
            name="radio"
            type="radio"
            value="ASC"
            onClick={ handleChangeOrder }
            data-testid="column-sort-input-asc"
          />
        </label>
        <br />
        <label htmlFor="radio">
          Descending
          <input
            name="radio"
            type="radio"
            value="DESC"
            onClick={ handleChangeOrder }
            data-testid="column-sort-input-desc"
          />
        </label>
        <br />
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ orderPlanets }
        >
          Order
        </button>
        <hr />
        {filterByNumericValues.map((element, index) => (
          <div data-testid="filter" key={ index }>
            <span>{`${element.column} ${element.comparison} ${element.value}`}</span>
            <button
              type="button"
              id={ index }
              onClick={ removeFilter }
            >
              x
            </button>
          </div>
        ))}
      </form>
    </div>
  );
}

export default Header;
