import React, { useState, useEffect } from 'react';
import api from '../api';

const CampingSpotList = () => {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const res = await api.get('/camping-spots');
                setSpots(res.data);
            } catch (error) {
                alert('Failed to load camping spots');
            }
        };
        fetchSpots();
    }, []);

    return (
        <div>
            <h2>Camping Spots</h2>
            <ul>
                {spots.map((spot) => (
                    <li key={spot.id}>{spot.name} - {spot.location}</li>
                ))}
            </ul>
        </div>
    );
};

export default CampingSpotList;
