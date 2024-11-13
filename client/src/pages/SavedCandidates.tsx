import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface.js'

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return (
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted yet.</p>
      ) : (
        <div className="saved-candidates-list">
          {savedCandidates.map((candidate, index) => (
            <div key={index} className="candidate-card">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
