// Context-Aware Snooze Component
import { Email } from "@/types";
import { useState } from "react";
import { useEffect } from "react";

const ContextSnooze = ({ email, onSnooze }:{email:Email, onSnooze: (value: string) => void}) => {
    const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);
    
    const snoozeOptions = [
      { label: "Later today", value: "today", icon: "clock" },
      { label: "Tomorrow", value: "tomorrow", icon: "calendar" },
      { label: "This weekend", value: "weekend", icon: "calendar" },
      { label: "Next week", value: "next-week", icon: "calendar" },
      { label: "When I'm at work", value: "at-work", icon: "briefcase", contextual: true },
      { label: "When I arrive home", value: "at-home", icon: "home", contextual: true },
      { label: "Before my next meeting", value: "before-meeting", icon: "users", contextual: true },
      { label: "Custom", value: "custom", icon: "settings" }
    ];
    
    return (
      <div className="relative">
        <button 
          onClick={() => setShowSnoozeOptions(!showSnoozeOptions)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        
        {showSnoozeOptions && (
          <div className="absolute top-10 right-0 w-64 bg-white rounded-lg shadow-lg border z-10">
            <div className="p-3 border-b">
              <h3 className="font-medium">Snooze until...</h3>
            </div>
            
            <div className="py-2">
              {snoozeOptions.map(option => (
                <button 
                  key={option.value}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${
                    option.contextual ? "text-green-700" : ""
                  }`}
                  onClick={() => {
                    setShowSnoozeOptions(false);
                    onSnooze(option.value);
                  }}
                >
                  <span className="w-5 h-5 mr-3">
                    {option.icon === "clock" && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {option.icon === "calendar" && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {option.icon === "briefcase" && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {option.icon === "home" && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                    {option.icon === "users" && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                    {option.icon === "settings" && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </span>
                  {option.label}
                  {option.contextual && (
                    <span className="ml-1 text-xs bg-green-100 text-green-800 rounded-full px-1">
                      Smart
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Custom date/time picker would appear here */}
          </div>
        )}
      </div>
    );
  };
  
  // Smart Bundling Component
    const EmailBundle = ({ emails, category }:{emails: Email[], category: string}) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
      <div className="border rounded-lg mb-2 overflow-hidden">
        <div 
          className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center">
            <input type="checkbox" className="mr-3" />
            <div>
              <div className="font-medium">{category}</div>
              <div className="text-sm text-gray-500">{emails.length} emails from this thread</div>
            </div>
          </div>
          <button>
            <svg className={`w-5 h-5 transition-transform ${expanded ? "transform rotate-180" : ""}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {expanded && (
          <div className="border-t">
            {emails.map((email, index) => (
              <div 
                key={index}
                className="p-3 flex items-center hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              >
                <input type="checkbox" className="mr-3" />
                <div className="w-48 truncate">{email.sender}</div>
                <div className="flex-1 truncate">
                  <span>{email.subject}</span>
                  <span className="text-gray-500 ml-2">{email.content}</span>
                </div>
                <div className="text-sm text-gray-500 ml-2">{email.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default function ContextAwareSnooze({ email, onSnooze }:{email:Email, onSnooze: (value: string) => void}) {
    const [showSnooze, setShowSnooze] = useState(false);
    
    return (
      <div className="p-4 bg-white rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-medium mb-3">Context-Aware Snooze</h2>
        <ContextSnooze email={email} onSnooze={onSnooze} />
        <EmailBundle emails={[email]} category="Work" />
      </div>
    );
  }