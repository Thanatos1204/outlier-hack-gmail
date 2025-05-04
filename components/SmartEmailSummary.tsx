// Component implementation for Smart Email Summary
import { Email } from '@/types';
import { useEffect, useState } from 'react';

interface ActionItem {
  text: string;
  dueDate: string;
  priority: string;
}

const EmailSummary = ({ email }: {email: Email}) => {
    const [aiSummary, setAiSummary] = useState("");
    const [actionItems, setActionItems] = useState<ActionItem[]>([]);
    
    useEffect(() => {
      // In a real implementation, this would call an AI service
      const mockAiSummary = "This email contains a project update with 3 action items due by Friday.";
      const mockActionItems = [
        { text: "Review design mockups", dueDate: "Friday", priority: "High" },
        { text: "Provide feedback on API documentation", dueDate: "Thursday", priority: "Medium" },
        { text: "Schedule team meeting", dueDate: "Tomorrow", priority: "High" }
      ];
      
      setAiSummary(mockAiSummary);
      setActionItems(mockActionItems);
    }, [email]);
  
    return (
      <div className="bg-blue-50 p-3 mb-4 rounded-md">
        <div className="flex items-center text-blue-700 mb-2">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-medium">AI Summary</span>
        </div>
        <p className="text-sm text-gray-700 mb-3">{aiSummary}</p>
        
        {actionItems.length > 0 && (
          <div>
            <div className="text-sm font-medium text-blue-700 mb-2">Action Items:</div>
            <div className="space-y-2">
              {actionItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{item.text}</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${
                    item.priority === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    Due: {item.dueDate}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
              Add to Tasks
            </button>
          </div>
        )}
      </div>
    );
  };

  export default EmailSummary;
  