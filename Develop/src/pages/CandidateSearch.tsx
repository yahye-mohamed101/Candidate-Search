import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });

  // Load candidates on mount
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      const candidateDetails = await Promise.all(
        data.map(async (user: any) => {
          const candidateData = await searchGithubUser(user.login);
          return {
            name: candidateData.name || 'Unknown',
            username: user.login,
            location: candidateData.location || 'Unknown',
            avatar: candidateData.avatar_url,
            email: candidateData.email || 'Not provided',
            html_url: candidateData.html_url,
            company: candidateData.company || 'Not provided',
          } as Candidate;
        })
      );
      setCandidates(candidateDetails);
    };
    fetchCandidates();
  }, []);

  // Function to save the candidate
  const saveCandidate = () => {
    const newSavedCandidates = [...savedCandidates, candidates[currentIndex]];
    setSavedCandidates(newSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(newSavedCandidates));
    nextCandidate();
  };

  // Function to skip the candidate
  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert('No more candidates available to review');
    }
  };

  if (candidates.length === 0) return <p>Loading candidates...</p>;

  const candidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidate ? (
        <div>
          <img src={candidate.avatar} alt={`${candidate.username}'s avatar`} />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            Profile
          </a>
          <div>
            <button onClick={saveCandidate}>+</button>
            <button onClick={nextCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
