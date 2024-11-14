import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

console.log(import.meta.env.VITE_GITHUB_TOKEN);
console.log(import.meta.env.VITE_TEST_VARIABLE);
console.log(import.meta.env);
export default App;
