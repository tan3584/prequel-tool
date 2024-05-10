import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './bossgrid.css';

const calculateTimeRemaining = (startTime, endTime) => {
    const now = moment().tz('Asia/Shanghai');
    const start = moment(startTime, 'H:mm').tz('Asia/Shanghai');
    const end = moment(endTime, 'H:mm').tz('Asia/Shanghai');
    let returnData = { hours: 0, minutes: 0, seconds: 0 };

    if (start.isBefore(now) && now.isBefore(end)) {
        const duration = moment.duration(end.diff(now));
        returnData.hours = duration.hours();
        returnData.minutes = duration.minutes();
        returnData.seconds = duration.seconds();
    } else if (end.isBefore(start) && start.isBefore(now)) {
        end.add(1, 'day');
        const duration = moment.duration(end.diff(now));
        returnData.hours = duration.hours();
        returnData.minutes = duration.minutes();
        returnData.seconds = duration.seconds();
    } else if (now.isBefore(end) && end.isBefore(start)) {
        // Case 3: now < end < start
        const duration = moment.duration(end.diff(now));
        returnData.hours = duration.hours();
        returnData.minutes = duration.minutes();
        returnData.seconds = duration.seconds();
    } else if (now.isBefore(start) && start.isBefore(end)) {
        // Case 4: now < start < end
        const duration = moment.duration(start.diff(now));
        returnData.hours = duration.hours();
        returnData.minutes = duration.minutes();
        returnData.seconds = duration.seconds();
    } else if (end.isBefore(now) && now.isBefore(start)) {
        // Case 5: end < now < start
        start.add(1, 'day');
        const duration = moment.duration(start.diff(now));
        returnData.hours = duration.hours();
        returnData.minutes = duration.minutes();
        returnData.seconds = duration.seconds();
    } else if (start.isBefore(end) && end.isBefore(now)) {
        // Case 6: start < end < now
        const duration = moment.duration(now.diff(start));
        returnData.hours = duration.hours();
        returnData.minutes = duration.minutes();
        returnData.seconds = duration.seconds();
    }
    return returnData;
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
        let end = moment(boss.end, 'H:mm').tz('Asia/Shanghai');

        if (end.isBefore(start)) {
            end.add(1, 'day');
        }

        return now.isBetween(start, end, null, '[)');
    };

    const displayTime = () => {
        if (boss.time === 'All Day') {
            return (<p className="time-active">All Day</p>);
        } else if (isBossOngoing()) {
            return (<p className="time-active">{formatTime(timeRemaining.hours)}:{formatTime(timeRemaining.minutes)}:{formatTime(timeRemaining.seconds)}</p>);
        } else {
            return (<p className="time-start">{formatTime(timeRemaining.hours)}:{formatTime(timeRemaining.minutes)}:{formatTime(timeRemaining.seconds)}</p>);
        }

    }


    return (
        <div className="boss">
            <div className="boss-img-container">
                <img src={require(`../public/img/${boss.img}`)} alt={boss.name} />
            </div>
            <div className="boss-details">
                <h3 className="boss-name">{boss.name}</h3>
                <p className="boss-time">
                    {displayTime()}
                </p>
            </div>
        </div>
    )
};

export default BossGrid;