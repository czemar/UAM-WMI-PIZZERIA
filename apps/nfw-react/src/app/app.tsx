import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DialogOutlet } from '../components/dialog-outlet-component/dialog-outlet.component';
import { Navbar } from '../components/navbar-component/navbar.component';
import { RouterOutlet } from '../components/router-outlet-component/router-outlet.component';

function App() {
  return (
    <main>
      <BrowserRouter>

        {/* Navbar */}
        <Navbar />

        {/* Dialog outlet */}
        <DialogOutlet />

        {/* Routing outlet */}
        <RouterOutlet />

      </BrowserRouter>
    </main>
  );
}

export default App;
