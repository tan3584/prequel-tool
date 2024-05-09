import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const calculateTimeRemaining = (startTime, endTime) => {
    const now = moment().tz('Asia/Shanghai'); // Set the current time to Asia/Shanghai time zone (UTC+8)
    const start = moment(startTime, 'H:mm').tz('Asia/Shanghai');
    const end = moment(endTime, 'H:mm').tz('Asia/Shanghai');
    const startToday = moment().tz('Asia/Shanghai').set({ hour: start.hour(), minute: start.minute(), second: 0, millisecond: 0 });
    const endToday = moment().tz('Asia/Shanghai').set({ hour: end.hour(), minute: end.minute(), second: 0, millisecond: 0 });
    const remaining = endToday > now ? endToday.diff(now) : startToday.diff(now);
    const duration = moment.duration(remaining);
    return {
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds()
    };
};


const BossGrid = ({ boss }) => {

    const [timeRemaining, setTimeRemaining] = useState(
        calculateTimeRemaining(boss.start, boss.end)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(
                calculateTimeRemaining(boss.start, boss.end)
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const isBossOngoing = () => {
        const now = moment().tz('Asia/Shanghai');
        const start = moment(boss.start, 'H:mm').tz('Asia/Shanghai');
        const end = moment(boss.end, 'H:mm').tz('Asia/Shanghai');
        return now.isBetween(start, end);
    };

    const displayTime = () => {
        if (boss.time === 'All Day') {
            return 'All Day';
        } else if (isBossOngoing()) {
            return `Ongoing ${formatTime(timeRemaining.hours)}:${formatTime(timeRemaining.minutes)}:${formatTime(timeRemaining.seconds)}`;
        } else {
            return `Start in ${formatTime(timeRemaining.hours)}:${formatTime(timeRemaining.minutes)}:${formatTime(timeRemaining.seconds)}`;
        }

    }


    return (
        <div className="boss">
            <img src={require(`../public/img/${boss.img}`)} alt={boss.name} />
            <div className="boss-details">
                <h3 className="boss-name">{boss.name}</h3>
                <p className="boss-time">
                    {boss.time} | {displayTime()}
                </p>
            </div>
        </div>
    )
};

export default BossGrid;