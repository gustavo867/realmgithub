import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
import Main from './screens/Main';

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <Main />
    </>
  );
};

export default App;
