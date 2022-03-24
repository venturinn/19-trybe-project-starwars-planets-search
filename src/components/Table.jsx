import React, { useContext } from 'react';
import MyContext from './MyContext';

function Table() {
  const { data, filterByName, filterByNumericValues } = useContext(MyContext);

  console.log(filterByName.name);

  const filteredByName = data.filter(
    (planet) => planet.name.toLowerCase().includes(filterByName.name)
  || planet.name.includes(filterByName.name),
  );

  console.log(filterByNumericValues);

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

  console.log(finalFiltered);

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
            <td>{planet.name}</td>
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
