import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Event = ({ title, time, location, status, startTime, endTime }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (status === 'current') {
            const interval = setInterval(() => {
                const now = moment();
                const duration = moment.duration(endTime.diff(now));
                setTimeLeft(formatDuration(duration));
            }, 1000);
            return () => clearInterval(interval);
        } else if (status === 'past') {
            const duration = moment.duration(endTime.diff(startTime));
            setTimeLeft(formatDuration(duration));
        }
    }, [status, startTime, endTime]);

    const formatDuration = (duration) => {
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className={`event ${status}`}>
            <h3>{title}</h3>
            <p>{time} | {location}</p>
            {status === 'current' && (
                <p>Ongoing ({timeLeft} left)</p>
            )}
            {status === 'upcoming' && (
                <p>Starts in {moment.duration(startTime.diff(moment())).humanize()}</p>
            )}
            {status === 'past' && (
                <p>Ended (Lasted for {timeLeft})</p>
            )}
        </div>
    );
};

export default Event;
