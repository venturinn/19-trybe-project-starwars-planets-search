import React, { useContext, useState } from 'react';
import MyContext from './MyContext';

function Header() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');

  const { filterByName,
    setFilterByName,
    setFiltered,
    data,
    setFilterByNumericValues,
  } = useContext(MyContext);

  const nameFilter = ({ target }) => {
    setFilterByName(target.value);

    const filtered = data.filter(
      (planet) => planet.name.toLowerCase().includes(target.value)
    || planet.name.includes(target.value),
    );
    setFiltered(filtered);
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

  const numberFilter = () => {
    setFilterByNumericValues(
      { column: columnFilter, comparison: comparisonFilter, value: valueFilter },
    );

    const filtered = data.filter((planet) => {
      if (comparisonFilter === 'maior que') {
        return Number(planet[columnFilter]) > Number(valueFilter);
      } if (comparisonFilter === 'menor que') {
        return Number(planet[columnFilter]) < Number(valueFilter);
      } if (comparisonFilter === 'igual a') {
        return Number(planet[columnFilter]) === Number(valueFilter);
      } return planet;
    });

    setFiltered(filtered);
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

      </form>
      <p>{filterByName.name}</p>
    </div>

  );
}

export default Header;
