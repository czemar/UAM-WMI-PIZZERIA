import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DialogOutlet } from '../components/dialog-outlet-component/DialogOutlet.component';
import { Navbar } from '../components/navbar-component/Navbar.component';
import { RouterOutlet } from '../components/router-outlet-component/RouterOutlet';

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
