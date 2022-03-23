import React, { useContext } from 'react';
import MyContext from './MyContext';

function Header() {
  const { filterByName, setFilterByName, setFiltered, data } = useContext(MyContext);

  const nameFilter = ({ target }) => {
    setFilterByName(target.value);

    const filtered = data.filter(
      (planet) => planet.name.toLowerCase().includes(target.value)
    || planet.name.includes(target.value),
    );
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
      </form>
      <p>{filterByName.name}</p>
    </div>

  );
}

export default Header;
