import React from 'react';
import Table from './components/Table';
import Header from './components/Header';
import MyProvider from './components/MyProvider';

function App() {
  return (
    <MyProvider>
      <Header />
      <Table />
    </MyProvider>
  );
}

export default App;
