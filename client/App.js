import React, { useState } from 'react';
import StackNavigation from './components/StackNavigation';
import TabNavigation from './components/TabNavigation';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? <TabNavigation /> : <StackNavigation />}
    </>
  );
}

export default App;