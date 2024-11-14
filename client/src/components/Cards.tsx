import React, { useState } from 'react';
import Candidate from '../interfaces/Candidate.interface'


interface CardProps {
    item: Candidate;
}

const Card: React.FC<CardProps> = ({ item }) => {
    // State to handle hover effect
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        width: '18rem',
        backgroundColor: '#1d4185',
        margin: '1rem',
        border: '2px solid #17a2b8',
        borderRadius: '20px',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        boxShadow: isHovered ? '0 0 15px 5px rgba(0, 255, 255, 0.6)' : 'none', // glow effect
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    };

    return (
            <div
                className="card"
                style={cardStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={item.avatar_url} style={{ width: '100%', borderTopRightRadius: '20px', borderTopLeftRadius: '20px' }} alt="Avatar Image" className="" />

                <div className="">
                    <p>Username: {item.login}</p>
                    <p>Location:{item.location || ' N/A'}</p>
                    <p>Email:{item.email || ' N/A'}</p>
                    <p>Company:{item.company || ' N/A'}</p>
                    <p>Bio:{item.bio || ' N/A'}</p>
                </div>
        </div>
    );
};

export default Card;