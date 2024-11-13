import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API'; // Make sure this is correctly imported
import Candidate from '../interfaces/Candidate.interface.js'; // Import the Candidate interface

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // Fetch candidates when component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
      setCandidate(data[0]); // Set first candidate to display
    };

    fetchCandidates();
  }, []);

  const handleSaveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      setCandidates(candidates.slice(1)); // Remove the saved candidate from the list
      setCandidate(candidates[1]); // Update the displayed candidate
    }
  };

  const handleSkipCandidate = () => {
    setCandidates(candidates.slice(1)); // Skip the current candidate
    setCandidate(candidates[1]); // Update the displayed candidate
  };

  return (
    <div className="candidate-search-container">
      {candidate ? (
        <div className="candidate-card">
          <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar" />
          <div className="candidate-info">
            <h2>{candidate.name}</h2>
            <p>{candidate.username}</p>
            <p>{candidate.location}</p>
            <p>{candidate.company}</p>
            <p>{candidate.email}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
          <div className="candidate-actions">
            <button onClick={handleSaveCandidate} className="save-btn">+</button>
            <button onClick={handleSkipCandidate} className="skip-btn">-</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CandidateSearch;
