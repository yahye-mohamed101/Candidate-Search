import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API.jsx';
import Candidate from '../interfaces/Candidate.interface.jsx';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  const addCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    nextCandidate();
  };

  const nextCandidate = () => {
    setCurrentCandidateIndex(current => (current + 1) % candidates.length);
  };

  const currentCandidate = candidates[currentCandidateIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div className="candidate-card">
          <img src={currentCandidate.avatar} alt={`${currentCandidate.username} avatar`} />
          <h2>{currentCandidate.name}</h2>
          <p>Username: {currentCandidate.username}</p>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email || 'N/A'}</p>
          <p>Company: {currentCandidate.company || 'N/A'}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <button onClick={() => addCandidate(currentCandidate)}>Add</button>
          <button onClick={nextCandidate}>Skip</button>
        </div>
      ) : (
        <p>No more candidates to display.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
