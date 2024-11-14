import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import Card from '../components/Cards';
import __SavedCandidates from './SavedCandidates';

const CandidateSearch = () => {
  // Create a state variable to hold the list of candidates retrieved from GitHub.
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [index, setIndex] = useState(0);
  const [__error, setError] = useState<string | null>(null);

  // Fetch candidates on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        setCandidatesList(data);
      } catch (error) {
        setError('Failed to load candidates');
      }
    };
    fetchCandidates();
  }, []);
// gets the details needed using the searchGitHubUser function/api call
  useEffect(() => {
    const fetchCandidateDetails = async () => {
      const candidate = candidatesList[index];
      if (candidate) {
        try {
          const detailedCandidate = await searchGithubUser(candidate.login);
          setCurrentCandidate(detailedCandidate);
        } catch (error) {
          setError('Failed to load candidate details');
        }
      }
    };

    fetchCandidateDetails();
  }, [index, candidatesList]);

  // Handle save candidate
  const handleSave = () => {
    // let candidate = candidatesList[index];
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, currentCandidate]));
    handleNext();
  };

  // Skip current candidate
  const handleSkip = () => {
    handleNext();
  }

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % candidatesList.length);
  };
  return (
    <>
      <h1>CandidateSearch</h1>
      {candidatesList.length > 0 ? (
          <Card item={candidatesList[index]} />
        ) : (
          <p>No Candidates available</p>
        )}
      <div className='buttonsSearch'>
        <button className='minus' type="button" onClick={handleSkip}>-</button>
        <button className='plus' type="button" onClick={handleSave}>+</button>
      </div>
    </>
  );
};

export default CandidateSearch;