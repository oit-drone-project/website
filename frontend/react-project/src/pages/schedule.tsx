import React, { useState, useEffect } from "react";
import './css/Schedule.css';

interface Event {
  date: string; // YYYY-MM-DD形式の日付
  title: string; // イベントタイトル
}

const Schedule: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [events, setEvents] = useState<Event[]>([]);

  // ローカルストレージのキー
  const STORAGE_KEY = "calendar_events";

  // ページ読み込み時にローカルストレージからイベントを読み込む
  useEffect(() => {
    const storedEvents = localStorage.getItem(STORAGE_KEY);
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // イベントが変更されたらローカルストレージに保存する
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const handleAddEvent = (date: string): void => {
    const title = prompt(`Enter event title for ${date}`);
    if (title) {
      setEvents((prev) => [...prev, { date, title }]);
    }
  };

  const renderDays = (): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = events.filter((event) => event.date === date);

      days.push(
        <div key={date} className="calendar-day" onClick={() => handleAddEvent(date)}>
          <div className="date">{day}</div>
          <div className="events">
            {dayEvents.map((event, index) => (
              <div key={index} className="event">
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="calendar">
      <header className="calendar-header">
        <button onClick={handlePrevMonth}>←</button>
        <h1>
          {currentYear}年 {currentMonth + 1}月
        </h1>
        <button onClick={handleNextMonth}>→</button>
      </header>
      <div className="calendar-grid">
        <div className="calendar-day-name">日</div>
        <div className="calendar-day-name">月</div>
        <div className="calendar-day-name">火</div>
        <div className="calendar-day-name">水</div>
        <div className="calendar-day-name">木</div>
        <div className="calendar-day-name">金</div>
        <div className="calendar-day-name">土</div>
        {renderDays()}
      </div>
    </div>
  );
};

export default Schedule;