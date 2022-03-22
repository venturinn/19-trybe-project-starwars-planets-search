import React from 'react';
import Table from './components/Table';
import MyProvider from './components/MyProvider';

function App() {
//  let test = 'Diego Venturin';

  // useEffect(() => { test = 'venturin'; });

  return (
    <MyProvider>
      <Table />
    </MyProvider>
  );
}

export default App;
