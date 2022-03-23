import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [data, setPlanets] = useState([]);
  const [name, setFilterByName] = useState('');
  const [filtered, setFiltered] = useState([]);

  // Faz a requisição para API, funcionando como um componentDidMount()
  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint)
        .then((response) => response.json());
      setPlanets(results);
      setFiltered(results);
    };
    getPlanets();
  }, []);

  const contextValue = {
    data,
    filterByName: { name },
    setFilterByName,
    filtered,
    setFiltered,
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
