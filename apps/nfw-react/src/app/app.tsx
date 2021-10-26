import React from 'react';
import { Navbar } from '../components/navbar-component/Navbar.component';
import { RouterOutlet } from '../components/router-outlet-component/RouterOutlet';

function App() {
  return (
    <main>
      {/* Navbar */}
      <Navbar />

      {/* Routing outlet */}
      <RouterOutlet />
    </main>
  );
}

export default App;
