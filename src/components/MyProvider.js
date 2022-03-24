import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const COLLUMN_FILTER_NAMES = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [data, setPlanets] = useState([]);
  const [name, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [numberColumnFilter, setNumberColumnFilter] = useState(COLLUMN_FILTER_NAMES);

  // Faz a requisição para API, funcionando como um componentDidMount()
  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(ENDPOINT)
        .then((response) => response.json());
      setPlanets(results);
    };
    getPlanets();
  }, []);

  const contextValue = {
    data,
    filterByName: { name },
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    numberColumnFilter,
    setNumberColumnFilter,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

// Ref.:https://github.com/yannickcr/eslint-plugin-react/issues/7
MyProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

// MyProvider.defaultProps = {
//   children: {},
// };

export default MyProvider;
