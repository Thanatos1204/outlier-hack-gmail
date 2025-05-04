// Integration Hub Component
import React, { useState } from 'react';
const IntegrationHub = () => {
    const [showIntegrations, setShowIntegrations] = useState(false);
    
    const integrations = [
      { 
        id: 'tasks', 
        name: 'Tasks', 
        icon: 'check-circle', 
        active: true,
        description: 'Create and manage tasks from emails'
      },
      { 
        id: 'calendar', 
        name: 'Calendar', 
        icon: 'calendar', 
        active: true,
        description: 'Schedule events and manage meetings'
      },
      { 
        id: 'drive', 
        name: 'Drive', 
        icon: 'folder', 
        active: true,
        description: 'Access and share files from Drive'
      },
      { 
        id: 'meet', 
        name: 'Meet', 
        icon: 'video', 
        active: true,
        description: 'Start or join video meetings'
      },
      { 
        id: 'slack', 
        name: 'Slack', 
        icon: 'message-square', 
        active: false,
        description: 'Connect with Slack channels and messages'
      },
      { 
        id: 'trello', 
        name: 'Trello', 
        icon: 'trello', 
        active: false,
        description: 'Add cards to your Trello boards'
      },
      { 
        id: 'notion', 
        name: 'Notion', 
        icon: 'book', 
        active: false,
        description: 'Create and link to Notion pages'
      }
    ];
    
    return (
      <div className="relative">
        <button 
          onClick={() => setShowIntegrations(!showIntegrations)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
        
        {showIntegrations && (
          <div className="absolute top-10 right-0 w-80 bg-white rounded-lg shadow-lg border z-10">
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-medium">Productivity Tools</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Manage
              </button>
            </div>
            
            <div className="py-2 max-h-96 overflow-y-auto">
              {integrations.map(integration => (
                <div key={integration.id} className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      integration.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {integration.icon === 'check-circle' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {integration.icon === 'calendar' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {integration.icon === 'folder' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      )}
                      {integration.icon === 'video' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                      {integration.icon === 'message-square' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      )}
                      {integration.icon === 'trello' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 3v18M4 9h10M4 14h10" />
                        </svg>
                      )}
                      {integration.icon === 'book' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">{integration.name}</h4>
                        {!integration.active && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            Not connected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{integration.description}</p>
                    </div>
                    {integration.active ? (
                      <button className="ml-2 text-sm text-blue-600 hover:text-blue-800">
                        Use
                      </button>
                    ) : (
                      <button className="ml-2 text-sm text-blue-600 hover:text-blue-800">
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t">
              <button className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md py-2 text-sm font-medium">
                Browse More Integrations
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default IntegrationHub;