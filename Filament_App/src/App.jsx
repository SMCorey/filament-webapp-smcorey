import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

function App() {

  return (
    <>
      <h1>App.jsx parent page</h1>
      <p>This is the parent 'master' page.</p>

      <div>
        <Nav />
      </div>

      <br />
      <br />
      <hr />
      <div>
        <p>This is the child page:</p>
        <Outlet />
      </div>
    </>
  );
}

export default App;
