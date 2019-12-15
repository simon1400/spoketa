import React from 'react';
import Pages from './pages'
import Header from './layout/header'
import Footer from './layout/footer'
import UIkit from 'uikit'

import './styles/main.scss'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Pages />
      <Footer />
    </div>
  );
}

export default App;
