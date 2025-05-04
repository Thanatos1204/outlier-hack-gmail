// Component for Focus Mode toggle
import { useState } from 'react';

const FocusModeToggle = () => {
    const [focusMode, setFocusMode] = useState(false);
    const [scheduledEmails, setScheduledEmails] = useState([]);
    
    const toggleFocusMode = () => {
      setFocusMode(!focusMode);
    };
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between bg-white p-2 border-b">
          <div className="flex items-center">
            <button 
              onClick={toggleFocusMode}
              className={`flex items-center mr-4 px-3 py-1 rounded-full text-sm ${
                focusMode ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700"
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
            </button>
            
            {focusMode && (
              <div className="text-sm text-gray-500">
                Only showing priority emails. Notifications paused for 25 minutes.
              </div>
            )}
          </div>
          
          <div className="relative">
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Scheduled ({scheduledEmails.length})
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Component for Email Scheduling in Compose
  type ScheduleOption = string | { date: string | null; time: string; timezone: string };
  
  const EmailScheduler = ({ onSchedule }: { onSchedule: (option: ScheduleOption) => void }) => {
    const [showScheduler, setShowScheduler] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState("09:00");
    const [timezone, setTimezone] = useState("America/New_York");
    
    const quickOptions = [
      { label: "Later today", value: "today" },
      { label: "Tomorrow morning", value: "tomorrow" },
      { label: "Tomorrow evening", value: "tomorrow-evening" },
      { label: "This weekend", value: "weekend" },
      { label: "Next week", value: "next-week" },
    ];
    
    return (
      <div>
        <button 
          onClick={() => setShowScheduler(!showScheduler)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        
        {showScheduler && (
          <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-lg border p-4">
            <h3 className="text-sm font-medium mb-3">Schedule send</h3>
            <div className="space-y-2 mb-3">
              {quickOptions.map(option => (
                <button 
                  key={option.value}
                  className="w-full text-left text-sm px-3 py-2 rounded hover:bg-gray-100"
                  onClick={() => {
                    // Logic to set date based on option
                    setShowScheduler(false);
                    onSchedule(option.value);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="border-t pt-3">
              <div className="text-sm font-medium mb-2">Custom schedule</div>
              <div className="flex space-x-2 mb-2">
                <input 
                  type="date" 
                  className="flex-1 text-sm border rounded px-2 py-1"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <input 
                  type="time" 
                  className="w-24 text-sm border rounded px-2 py-1"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <select 
                className="w-full text-sm border rounded px-2 py-1 mb-3"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
              <button 
                className="w-full bg-blue-600 text-white rounded-md py-2 text-sm font-medium"
                onClick={() => {
                  setShowScheduler(false);
                  onSchedule({ date: selectedDate, time: selectedTime, timezone });
                }}
              >
                Schedule Send
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default FocusModeToggle;
export { EmailScheduler };