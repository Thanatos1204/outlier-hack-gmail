// Smart Reply and Assistant components
import { Email } from "@/types";
import { useState } from "react";
import { useEffect } from "react";
const SmartReplyOptions = ({ email }: {email:Email}) => {
    // In a real implementation, these would be generated based on email content
    const suggestions = [
      "Thanks for the update! I'll review these changes.",
      "I'm available for a meeting on Thursday afternoon.",
      "Could you please provide more details about this request?"
    ];
    
    return (
      <div className="flex space-x-2 mt-3 mb-4">
        {suggestions.map((suggestion, index) => (
          <button 
            key={index}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-full"
            onClick={() => {
              // Logic to apply suggestion to reply
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    );
  };
  
  const EmailAssistant = ({ isActive, onToggle }: { isActive: boolean, onToggle: () => void }) => {
    const [templates, setTemplates] = useState([
      { id: 1, name: "Meeting Follow-up", subject: "Follow-up: Our Meeting on {{date}}" },
      { id: 2, name: "Project Update", subject: "Project Update: {{project_name}}" },
      { id: 3, name: "Thank You", subject: "Thank You for {{reason}}" }
    ]);
    
    return (
      <div className="relative">
        <button 
          onClick={onToggle}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm ${
            isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Assistant</span>
        </button>
        
        {isActive && (
          <div className="absolute top-10 left-0 w-80 bg-white rounded-lg shadow-lg border z-10">
            <div className="p-3 border-b">
              <h3 className="font-medium">Email Assistant</h3>
            </div>
            
            <div className="p-3">
              <div className="mb-3">
                <div className="text-sm font-medium mb-2">AI writing help</div>
                <button className="w-full text-left text-sm px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded mb-1">
                  Help me write a response
                </button>
                <button className="w-full text-left text-sm px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded mb-1">
                  Make this more concise
                </button>
                <button className="w-full text-left text-sm px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded">
                  Make this more professional
                </button>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Templates</div>
                <div className="max-h-48 overflow-y-auto">
                  {templates.map(template => (
                    <button 
                      key={template.id}
                      className="w-full text-left text-sm px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-gray-500">{template.subject}</div>
                    </button>
                  ))}
                </div>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create new template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default function SmartReply({ email }: {email:Email}) {
    const [isAssistantActive, setIsAssistantActive] = useState(false);
    
    return (
      <div className="p-4 bg-white rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-medium mb-3">Smart Reply</h2>
        <SmartReplyOptions email={email} />
        <EmailAssistant 
          isActive={isAssistantActive} 
          onToggle={() => setIsAssistantActive(!isAssistantActive)} 
        />
      </div>
    );
  }
  