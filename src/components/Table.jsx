import React, { useContext } from 'react';
import MyContext from './MyContext';

const initialOrder = (finalFiltered) => {
  finalFiltered.sort((a, b) => {
    const oneNegative = -1;
    if (a.name < b.name) {
      return oneNegative;
    } if (a.name < b.name) {
      return 1;
    }
    return 0;
  });
  return finalFiltered;
};

const sortASC = (finalFiltered, order) => {
  finalFiltered.sort((a, b) => {
    const oneNegative = -1;
    const numberA = Number(a[order.column]);
    const numberB = Number(b[order.column]);
    if (!Number.isNaN(numberA) && Number.isNaN(numberB)) return oneNegative;
    if (Number.isNaN(numberA) && !Number.isNaN(numberB)) return 1;
    if (numberA < numberB) {
      return oneNegative;
    } if (numberA > numberB) {
      return 1;
    }
    return 0;
  });
  return finalFiltered;
};

const sortDESC = (finalFiltered, order) => {
  const oneNegative = -1;
  finalFiltered.sort((a, b) => {
    const numberA = Number(a[order.column]);
    const numberB = Number(b[order.column]);
    if (!Number.isNaN(numberA) && Number.isNaN(numberB)) return oneNegative;
    if (Number.isNaN(numberA) && !Number.isNaN(numberB)) return 1;
    if (numberA < numberB) {
      return 1;
    } if (numberA > numberB) {
      return oneNegative;
    }
    return 0;
  });

  return finalFiltered;
};

function Table() {
  const { data, filterByName, filterByNumericValues, order } = useContext(MyContext);

  const filteredByName = data.filter(
    (planet) => planet.name.toLowerCase().includes(filterByName.name)
  || planet.name.includes(filterByName.name),
  );

  let finalFiltered = filteredByName;

  filterByNumericValues.forEach((element) => {
    const { column, comparison, value } = element;
    finalFiltered = finalFiltered.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      } if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      } if (comparison === 'igual a') {
        return Number(planet[column]) === Number(value);
      } return planet;
    });
  });

  finalFiltered = initialOrder(finalFiltered);

  if (order !== null) {
    if (order.sort === 'ASC') {
      finalFiltered = sortASC(finalFiltered, order);
    } if (order.sort === 'DESC') {
      finalFiltered = sortDESC(finalFiltered, order);
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {finalFiltered.map((planet, index) => (
          <tr key={ index }>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
