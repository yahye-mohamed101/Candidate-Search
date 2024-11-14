

import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
        <Link to="/SavedCandidates" style={{ textDecoration: 'none', color: 'black' }}>Potential Candidates</Link>
      </div>
    </nav>
  );
};

export default Nav;

