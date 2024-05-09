import React from 'react';
import Event from '../Event';
import moment from 'moment-timezone';
import './CountdownTimer.css';

const eventData = {
    "Southern steppes": {
        "Bosses": {
            "Boar King": {
                "time": "Day",
                "location": "Southern Steppes",
                "start": "6:00",
                "end": "18:00"
            },
            "Grimhowl Gang": {
                "time": "Night",
                "location": "Southern Steppes",
                "start": "18:00",
                "end": "6:00"
            }
        },
        "Food": "Cherry"
    },
    "Bulrush Marshes": {
        "Bosses": {
            "Giant Toad": {
                "time": "All Day",
                "location": "Bulrush Marshes",
                "start": "0:00",
                "end": "24:00"
            }
        },
        "Food": "Rice"
    },
    "Murkwood": {
        "Bosses": {
            "Mandgora": {
                "time": "Day",
                "location": "Murkwood",
                "start": "6:00",
                "end": "20:00"
            },
            "Elf + Mandgora": {
                "time": "Night",
                "location": "Murkwood",
                "start": "20:00",
                "end": "6:00"
            }
        },
        "Food": "Tomato"
    }
};

const CountdownTimer = () => {
    const currentTime = moment().tz('Asia/Shanghai'); // Current time in UTC+8

    return (
        <div className="grid-container">
            {Object.keys(eventData).map(region => (
                <div key={region} className="region">
                    <h2>{region}</h2>
                    {Object.values(eventData[region].Bosses).map((event, index, eventsArray) => {
                        const startTime = moment(event.start, 'HH:mm');
                        const endTime = moment(event.end, 'HH:mm');
                        let status = 'upcoming';
                        if (currentTime.isBetween(startTime, endTime)) {
                            status = 'current';
                        } else if (currentTime.isAfter(endTime)) {
                            status = 'past';
                        }

                        let nextEventIndex = index + 1;
                        while (nextEventIndex < eventsArray.length) {
                            const nextEventStartTime = moment(eventsArray[nextEventIndex].start, 'HH:mm');
                            if (nextEventStartTime.isAfter(currentTime)) {
                                break;
                            }
                            nextEventIndex++;
                        }

                        const nextEvent = eventsArray[nextEventIndex];
                        return (
                            <div key={event.title} className={`event ${status}`}>
                                <Event
                                    title={event.title}
                                    time={event.time}
                                    location={event.location}
                                    status={status}
                                    startTime={startTime}
                                    endTime={endTime}
                                />
                                {status !== 'past' && nextEvent && (
                                    <div className="next-event">
                                        Next: <Event
                                            title={nextEvent.title}
                                            time={nextEvent.time}
                                            location={nextEvent.location}
                                            status="upcoming"
                                            startTime={moment(nextEvent.start, 'HH:mm')}
                                            endTime={moment(nextEvent.end, 'HH:mm')}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
