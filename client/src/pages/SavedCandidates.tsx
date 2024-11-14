import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [candidatesArray, setCandidatesArray] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  });

  // Function to delete candidates from table
  const handleDelete = (id: number) => {
    const updatedList = candidatesArray.filter(candidate => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedList));
    setCandidatesArray(updatedList);
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {candidatesArray.map((candidate: Candidate) => {
            return (
              <tr key={candidate.id}>
                <td><img className='avatarImg' src={candidate.avatar_url || 'No image'} style={{ width: '7vh' }} alt={`${candidate.login}'s avatar`} /></td>
                <td>{candidate.name || 'No Name'}</td>
                <td>{candidate.location || 'No location'}</td>
                <td><a href={`mailto:${candidate.email}`}>{candidate.email || 'No Email'}</a></td>
                <td>{candidate.company || 'No company'}</td>
                <td>{candidate.bio || 'No bio'}</td>
                <td><button className='removeButton' onClick={() => handleDelete(candidate.id)}>-</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
