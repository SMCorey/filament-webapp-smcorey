import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

function App() {

  return (
    <>
      <h1>Filaments Express</h1>
      <p>Your one stop shop for all of your filament needs!</p>

      <div>
        <Nav />
      </div>

      <br />
      <br />
      <hr />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
