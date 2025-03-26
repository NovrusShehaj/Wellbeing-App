// src/pages/Calendar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // Sample events data
    const events = [
        {
            id: 1,
            title: "Hartford Job Fair",
            date: new Date(2023, 10, 15),
            time: "10:00 AM - 3:00 PM",
            location: "Hartford Convention Center",
            description: "Annual job fair with 50+ employers"
        },
        {
            id: 2,
            title: "Housing Workshop",
            date: new Date(2023, 10, 20),
            time: "6:00 PM - 8:00 PM",
            location: "Hartford Public Library",
            description: "Learn about affordable housing options"
        },
        {
            id: 3,
            title: "Financial Literacy Seminar",
            date: new Date(2023, 11, 5),
            time: "5:30 PM - 7:00 PM",
            location: "Community Center",
            description: "Budgeting and credit building workshop"
        }
    ];

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = () => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    };

    const renderCalendar = () => {
        const totalDays = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
        const startingDay = firstDayOfMonth();
        const blanks = Array(startingDay).fill(null);
        const days = Array.from({ length: totalDays }, (_, i) => i + 1);

        return [...blanks, ...days].map((day, index) => {
            const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
            const hasEvents = date && events.some(event =>
                event.date.toDateString() === date.toDateString()
            );

            return (
                <div
                    key={index}
                    className={`calendar-day
                        ${date && selectedDate && date.toDateString() === selectedDate.toDateString() ? 'calendar-day-active' : ''}
                        ${date && date.toDateString() === new Date().toDateString() ? 'calendar-day-today' : ''}`}
                    onClick={() => day && setSelectedDate(date)}
                >
                    {day && (
                        <div className="text-center">
                            <div className={`${hasEvents ? 'text-blue-400 font-bold' : 'text-white'}`}>
                                {day}
                            </div>
                            {hasEvents && <div className="event-dot"></div>}
                        </div>
                    )}
                </div>
            );
        });
    };

    const changeMonth = (increment) => {
        setCurrentDate(new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + increment,
            1
        ));
        setSelectedDate(null);
    };

    const getEventsForSelectedDate = () => {
        if (!selectedDate) return [];
        return events.filter(event =>
            event.date.toDateString() === selectedDate.toDateString()
        );
    };

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <Link
                    to="/access-to-services"
                    className="text-blue-400 hover:text-blue-300 mb-6 inline-block"
                >
                    &larr; Back to Services
                </Link>

                <h1 className="text-3xl font-bold text-blue-400 mb-8">Community Events Calendar</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="calendar-container">
                            <div className="flex justify-between items-center mb-6">
                                <button
                                    onClick={() => changeMonth(-1)}
                                    className="calendar-month-nav"
                                >
                                    &larr;
                                </button>
                                <h2 className="text-xl font-semibold">
                                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </h2>
                                <button
                                    onClick={() => changeMonth(1)}
                                    className="calendar-month-nav"
                                >
                                    &rarr;
                                </button>
                            </div>

                            <div className="calendar-grid">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="calendar-header-day">
                                        {day}
                                    </div>
                                ))}
                                {renderCalendar()}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="calendar-sidebar">
                            <h3 className="text-xl font-semibold text-blue-400 mb-4">
                                {selectedDate
                                    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                                    : 'Select a date'}
                            </h3>

                            {selectedDate ? (
                                getEventsForSelectedDate().length > 0 ? (
                                    getEventsForSelectedDate().map(event => (
                                        <div key={event.id} className="calendar-event-card">
                                            <h4 className="calendar-event-title">{event.title}</h4>
                                            <p className="calendar-event-detail">{event.time}</p>
                                            <p className="calendar-event-detail">{event.location}</p>
                                            <p className="calendar-event-description">{event.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No events scheduled for this date</p>
                                )
                            ) : (
                                <p className="text-gray-400">Select a date to view events</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;