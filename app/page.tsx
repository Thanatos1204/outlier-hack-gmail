"use client";
import React, { useState, useEffect } from 'react';
import { Menu, Search, Settings, User, Star, Clock, Inbox, ChevronLeft, ChevronRight, MoreVertical, Pencil } from 'lucide-react';
import Image from 'next/image';
import EmailSummary from '@/components/SmartEmailSummary';
import { EmailScheduler } from '@/components/FocusModeToggle';
import FocusModeToggle from '@/components/FocusModeToggle';
import ContextAwareSnooze from '@/components/ContextAwareSnooze';
import EmailBundle from "@/components/ContextAwareSnooze"
import SmartReply from '@/components/SmartReply';
import IntegrationHub from '@/components/IntegrationHub';
import { Email } from '@/types';

const GmailClone = () => {
  // Define interface for checked emails
  interface CheckedEmailsState {
    [id: number]: boolean;
  }
  
  // State management
  const [checkedEmails, setCheckedEmails] = useState<CheckedEmailsState>({});
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [activeTab, setActiveTab] = useState('primary');
  const [activeSidebarItem, setActiveSidebarItem] = useState('inbox');
  const [starredEmails, setStarredEmails] = useState<{[id: number]: boolean}>({});
  const [openedEmail, setOpenedEmail] = useState<Email | null>(null);
  const [showComposeEmail, setShowComposeEmail] = useState(false);
  const [isAssistantActive, setIsAssistantActive] = useState(false);
  const [scheduledEmails, setScheduledEmails] = useState<Email[]>([]);
  const [focusMode, setFocusMode] = useState(false);
  const [emailBundles, setEmailBundles] = useState<{ [category: string]: Email[] }>({});
  
  
  const [emailData, setEmailData] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample data for emails
  useEffect(() => {
    const emails = [
      {
        "id": 1,
        "sender": "Marketplace",
        "username": "deals@marketplace.com",
        "subject": "Your profile was viewed 12 times",
        "content": "- Here's what\u2019s new in your community.",
        "fullContent": "<div style='padding:20px;'><h3>Your profile was viewed 12 times</h3><p>- Here's what\u2019s new in your community.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 23",
        "read": false,
        "category": "social"
      },
      {
        "id": 2,
        "sender": "Launch Pad",
        "username": "launch@producthub.com",
        "subject": "New follower alert \ud83c\udf89",
        "content": "- Don't miss out on our limited-time sale!",
        "fullContent": "<div style='padding:20px;'><h3>New follower alert \ud83c\udf89</h3><p>- Don't miss out on our limited-time sale!</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "May 04",
        "read": false,
        "category": "primary"
      },
      {
        "id": 3,
        "sender": "Dev Weekly",
        "username": "updates@devweekly.com",
        "subject": "Security Alert: New sign-in detected",
        "content": "- Don't miss out on our limited-time sale!",
        "fullContent": "<div style='padding:20px;'><h3>Security Alert: New sign-in detected</h3><p>- Don't miss out on our limited-time sale!</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 22",
        "read": false,
        "category": "promotions"
      },
      {
        "id": 4,
        "sender": "Team Updates",
        "username": "team@updates.com",
        "subject": "New follower alert \ud83c\udf89",
        "content": "- Protect your account with 2FA.",
        "fullContent": "<div style='padding:20px;'><h3>New follower alert \ud83c\udf89</h3><p>- Protect your account with 2FA.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 16",
        "read": false,
        "category": "social"
      },
      {
        "id": 5,
        "sender": "Social Feed",
        "username": "social@network.com",
        "subject": "This week's trending projects",
        "content": "- Don't miss out on our limited-time sale!",
        "fullContent": "<div style='padding:20px;'><h3>This week's trending projects</h3><p>- Don't miss out on our limited-time sale!</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "May 04",
        "read": false,
        "category": "primary"
      },
      {
        "id": 6,
        "sender": "Launch Pad",
        "username": "launch@producthub.com",
        "subject": "This week's trending projects",
        "content": "- Don't miss out on our limited-time sale!",
        "fullContent": "<div style='padding:20px;'><h3>This week's trending projects</h3><p>- Don't miss out on our limited-time sale!</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 04",
        "read": true,
        "category": "promotions"
      },
      {
        "id": 7,
        "sender": "Marketplace",
        "username": "deals@marketplace.com",
        "subject": "Your profile was viewed 12 times",
        "content": "- Explore new trending resources.",
        "fullContent": "<div style='padding:20px;'><h3>Your profile was viewed 12 times</h3><p>- Explore new trending resources.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 19",
        "read": true,
        "category": "social"
      },
      {
        "id": 8,
        "sender": "Marketplace",
        "username": "deals@marketplace.com",
        "subject": "This week's trending projects",
        "content": "- Follow these steps to complete your profile.",
        "fullContent": "<div style='padding:20px;'><h3>This week's trending projects</h3><p>- Follow these steps to complete your profile.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 04",
        "read": true,
        "category": "primary"
      },
      {
        "id": 9,
        "sender": "Account Services",
        "username": "security@platform.com",
        "subject": "You\u2019ve been invited to a new board",
        "content": "- Protect your account with 2FA.",
        "fullContent": "<div style='padding:20px;'><h3>You\u2019ve been invited to a new board</h3><p>- Protect your account with 2FA.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 23",
        "read": true,
        "category": "social"
      },
      {
        "id": 10,
        "sender": "Team Updates",
        "username": "team@updates.com",
        "subject": "Security Alert: New sign-in detected",
        "content": "- Protect your account with 2FA.",
        "fullContent": "<div style='padding:20px;'><h3>Security Alert: New sign-in detected</h3><p>- Protect your account with 2FA.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 18",
        "read": false,
        "category": "promotions"
      },
      {
        "id": 11,
        "sender": "Marketplace",
        "username": "deals@marketplace.com",
        "subject": "Your profile was viewed 12 times",
        "content": "- Protect your account with 2FA.",
        "fullContent": "<div style='padding:20px;'><h3>Your profile was viewed 12 times</h3><p>- Protect your account with 2FA.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 23",
        "read": true,
        "category": "social"
      },
      {
        "id": 12,
        "sender": "Marketplace",
        "username": "deals@marketplace.com",
        "subject": "Security Alert: New sign-in detected",
        "content": "- Follow these steps to complete your profile.",
        "fullContent": "<div style='padding:20px;'><h3>Security Alert: New sign-in detected</h3><p>- Follow these steps to complete your profile.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 06",
        "read": true,
        "category": "primary"
      },
      {
        "id": 13,
        "sender": "Launch Pad",
        "username": "launch@producthub.com",
        "subject": "This week's trending projects",
        "content": "- Here's what\u2019s new in your community.",
        "fullContent": "<div style='padding:20px;'><h3>This week's trending projects</h3><p>- Here's what\u2019s new in your community.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 23",
        "read": false,
        "category": "primary"
      },
      {
        "id": 14,
        "sender": "Launch Pad",
        "username": "launch@producthub.com",
        "subject": "This week's trending projects",
        "content": "- See who interacted with your recent post.",
        "fullContent": "<div style='padding:20px;'><h3>This week's trending projects</h3><p>- See who interacted with your recent post.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 07",
        "read": false,
        "category": "social"
      },
      {
        "id": 15,
        "sender": "Marketplace",
        "username": "deals@marketplace.com",
        "subject": "\ud83d\udd25 24hr Sale - Tools & Templates",
        "content": "- Protect your account with 2FA.",
        "fullContent": "<div style='padding:20px;'><h3>\ud83d\udd25 24hr Sale - Tools & Templates</h3><p>- Protect your account with 2FA.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 07",
        "read": false,
        "category": "social"
      },
      {
        "id": 16,
        "sender": "Dev Weekly",
        "username": "updates@devweekly.com",
        "subject": "Welcome to your new workspace!",
        "content": "- Here's what\u2019s new in your community.",
        "fullContent": "<div style='padding:20px;'><h3>Welcome to your new workspace!</h3><p>- Here's what\u2019s new in your community.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 18",
        "read": false,
        "category": "promotions"
      },
      {
        "id": 17,
        "sender": "Platform Bot",
        "username": "noreply@platform.com",
        "subject": "Top tips for boosting productivity \ud83d\ude80",
        "content": "- Your project metrics have been updated.",
        "fullContent": "<div style='padding:20px;'><h3>Top tips for boosting productivity \ud83d\ude80</h3><p>- Your project metrics have been updated.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 23",
        "read": true,
        "category": "primary"
      },
      {
        "id": 18,
        "sender": "Marketplace",
        "username": "deals@marketplace.com",
        "subject": "This week's trending projects",
        "content": "- Get started with your dashboard setup.",
        "fullContent": "<div style='padding:20px;'><h3>This week's trending projects</h3><p>- Get started with your dashboard setup.</p><p>This is a longer version of the content used for demonstration purposes. It provides a more detailed look at the email content so users can read the full message.</p><button style='padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;'>Take Action</button></div>",
        "date": "Apr 21",
        "read": true,
        "category": "promotions"
      }
    ];

    const bundles: { [category: string]: Email[] } = {};
    // Bundle by sender
    emailData.forEach(email => {
      if (!bundles[email.sender]) {
        bundles[email.sender] = [];
      }
      bundles[email.sender].push(email);
    });
    // Filter to only include senders with multiple emails
    const filteredBundles: { [category: string]: Email[] } = {};
    Object.entries(bundles).forEach(([sender, emails]) => {
      if (emails.length > 1) {
        filteredBundles[sender] = emails;
      }
    });
    
    setEmailBundles(filteredBundles);
    
    setEmailData(emails);
    setLoading(false);
  }, []);
  
  // Toggle checkbox for single email


  const toggleCheck = (id: number): void => {
    setCheckedEmails((prev: CheckedEmailsState) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSnooze = (value: string) => {
    console.log('Email snoozed until:', value);
    alert(`Email snoozed until: ${value}`);
    // Logic to handle snoozed emails
  };

  const handleScheduleEmail = (option: any) => {
    console.log('Email scheduled for:', option);
    alert(`Email scheduled for: ${option}`);  
    // Logic to handle scheduled emails
  };

  // Function to toggle focus mode
const toggleFocusMode = () => {
  setFocusMode(!focusMode);
};

  // Toggle all checkboxes
  const toggleAllChecks = () => {
    if (Object.values(checkedEmails).some(checked => checked)) {
      setCheckedEmails({});
    } else {
      const allChecked: CheckedEmailsState = {};
      emailData.filter(email => email.category === activeTab).forEach(email => {
        allChecked[email.id] = true;
      });
      setCheckedEmails(allChecked);
    }
  };

  // Toggle star for an email
  const toggleStar = (e: React.MouseEvent, id: number): void => {
    e.stopPropagation();
    setStarredEmails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Open an email
  const handleOpenEmail = (email: Email) => {
    setOpenedEmail(email);
    // Mark as read
    const updatedEmails = emailData.map(e => 
      e.id === email.id ? { ...e, read: true } : e
    );
    setEmailData(updatedEmails);
  };

  // Filter emails based on active tab
  const filteredEmails = emailData.filter(email => {
    if (activeSidebarItem === 'starred') {
      return starredEmails[email.id];
    } else if (activeSidebarItem === 'inbox') {
      return email.category === activeTab;
    }
    return email.category === activeTab;
  });

  // Get counts for each tab
  type EmailCategory = 'primary' | 'promotions' | 'social';
  
  const getCategoryCount = (category: EmailCategory): number => {
    return emailData.filter(email => email.category === category && !email.read).length;
  };

  // Handle compose email
  const handleCompose = () => {
    setShowComposeEmail(true);
  };

  // Close compose email
  const handleCloseCompose = () => {
    setShowComposeEmail(false);
  };

  // Close opened email
  const handleCloseEmail = () => {
    setOpenedEmail(null);
  };

  // Component to render the email list
  const EmailList = () => (
    <div>
      {/* Render email bundles first */}
      {Object.entries(emailBundles).map(([category, emails]) => {
        // Only show bundles for the current tab
        const filteredEmails = emails.filter(email => 
          (activeSidebarItem === 'starred' && starredEmails[email.id]) || 
          (activeSidebarItem === 'inbox' && email.category === activeTab)
        );
        
        return filteredEmails.length > 1 ? (
          <div key={category} className="mb-2">
            <EmailBundle email={filteredEmails[0]} onSnooze={()=>alert("SNOOZED")} />
          </div>
        ) : null;
      })}
      {filteredEmails.map((email) => (
        <div 
          key={email.id} 
          className={`flex items-center px-2 py-2 hover:shadow-md border-b border-gray-100 cursor-pointer ${
            checkedEmails[email.id] ? 'bg-blue-50' : ''
          } ${!email.read ? 'font-semibold bg-gray-50' : ''}`}
          onClick={() => handleOpenEmail(email)}
        >
          <div className="flex items-center w-12">
            <input
              type="checkbox"
              checked={!!checkedEmails[email.id]}
              onChange={(e) => {
                e.stopPropagation();
                toggleCheck(email.id);
              }}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <div 
              onClick={(e) => toggleStar(e, email.id)} 
              className="cursor-pointer"
            >
              <Star size={16} className={starredEmails[email.id] ? "text-yellow-400" : "text-gray-400 hover:text-gray-600"} fill={starredEmails[email.id] ? "#facc15" : "none"} />
            </div>
          </div>
          <div className="w-48 truncate pl-2">{email.sender}</div>
          <div className="flex-1 truncate">
            <span>{email.subject}</span>
            <span className="text-gray-500 ml-2">
              {email.content}
            </span>
          </div>
          <div className="w-16 text-right text-sm text-gray-500">{email.date}</div>
        </div>
      ))}
    </div>
  );

  // Component to render the compose email modal
  const ComposeEmail = () => {
    const handleSchedule = (option: any) => {
      console.log('Email scheduled for:', option);
      alert(`Email scheduled for: ${option}`);
      // Logic to handle scheduled emails
    };
    return(
    <div className="fixed bottom-0 right-16 w-[600px] h-[500px] bg-white rounded-t-lg shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between bg-gray-700 text-white px-4 py-2 rounded-t-lg">
        <h3 className="text-sm font-medium">New Message</h3>
        <div className="flex items-center space-x-2">
          <button className="text-white hover:bg-gray-600 p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <button className="text-white hover:bg-gray-600 p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
              <line x1="12" y1="3" x2="12" y2="9" />
              <line x1="7" y1="9" x2="17" y2="9" />
            </svg>
          </button>
          <button className="text-white hover:bg-gray-600 p-1 rounded" onClick={handleCloseCompose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col border-b">
        <div className="flex items-center border-b px-4 py-2">
          
          <input
            type="text"
            className="flex-1 outline-none text-sm"
            placeholder='To'
          />
          <div className="text-sm text-gray-600">Cc Bcc</div>
        </div>
        <div className="flex items-center border-b px-4 py-2">
          
          <input
            type="text"
            className="flex-1 outline-none text-sm"
            placeholder='Subject'
          />
        </div>
      </div>
      <div className="flex-1 p-4">
        <textarea
          className="w-full h-full outline-none text-sm resize-none"
        />
      </div>
      <div className="p-4 border-t flex items-center justify-between">
        <div>
          <button className="bg-blue-600 text-white rounded-md px-6 py-2 text-sm font-medium">
            Send
          </button>
        </div>
        <div className="flex items-center space-x-2">
           {/* Add EmailScheduler Component */}
           <EmailScheduler onSchedule={handleSchedule} />
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="M4.93 4.93l1.41 1.41"></path>
              <path d="M17.66 17.66l1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="M6.34 17.66l-1.41 1.41"></path>
              <path d="M19.07 4.93l-1.41 1.41"></path>
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="absolute bottom-20 right-4 bg-blue-50 text-blue-600 p-3 rounded shadow-md">
        <div className="flex flex-col">
          <span className="text-sm font-medium">Easily switch between different signatures</span>
          <button className="text-sm text-left">Dismiss</button>
        </div>
      </div>
    </div>
  );
  };

  // Component to render the opened email view
  const OpenedEmail = ({ email }: { email: Email }) => (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleCloseEmail}>
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="21 8 21 21 3 21 3 8"></polyline>
              <rect x="1" y="3" width="22" height="5"></rect>
              <line x1="10" y1="12" x2="14" y2="12"></line>
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </button>
          <ContextAwareSnooze email={email} onSnooze={(value) => console.log('Snooze until', value)} />
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical size={20} />
          </button>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <span>{email.id} of {emailData.length}</span>
          <button className="p-2 rounded-full hover:bg-gray-100 ml-2">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-xl font-medium mb-2">{email.subject}</h2>
          <div className="flex items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4">
              {email.sender.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{email.sender}</span>
                  <span className="text-gray-500 ml-2">&lt;{email.username}&gt;</span>
                </div>
                <div className="text-sm text-gray-500">
                  {email.date}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                to me
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Add EmailSummary Component */}
          <EmailSummary email={email} />
          
          <div 
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: email.fullContent || `<p>${email.content}</p>` }}
          />
          
          {/* Add SmartReply Component */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Quick Reply</h3>
            <SmartReply email={email} />
          </div>
        </div>
      </div>
    </div>
  );

  // Get Started component
  const GetStarted = () => (
    <div className="flex items-center py-3 px-4 bg-white border-b border-gray-200 relative">
      <div className="flex-1">
        <h3 className="text-base font-medium">Get started with Gmail</h3>
        <div className="flex mt-4 space-x-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Settings size={20} className="text-blue-500" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Customize your</p>
              <p>inbox</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <User size={20} className="text-red-500" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Change profile</p>
              <p>image</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div className="text-sm">
              <p className="font-medium">Import contacts</p>
              <p>and mail</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
            </div>
            <div className="text-sm">
              <p className="font-medium">Get Gmail for</p>
              <p>mobile</p>
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={() => setShowGetStarted(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-700 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-2 bg-white border-b border-gray-200">
        <div className="flex items-center">
         
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Menu size={20} />
          </button>
          <div className="ml-2 mt-1">
            <svg viewBox="0 0 75 24" width="75" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g id="qaEJec">
                <path fill="#ea4335" d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"></path>
              </g>
              <g id="YGlOvc"><path fill="#34a853" d="M58.193.67h2.564v17.44h-2.564z"></path></g>
              <g id="BWfIk">
                <path fill="#4285f4" d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"></path>
              </g>
              <g id="e6m3fd">
                <path fill="#fbbc05" d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"></path>
              </g>
              <g id="vbkDmc">
                <path fill="#ea4335" d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"></path>
              </g>
              <g id="idEJde">
                <path fill="#4285f4" d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"></path>
              </g>
            </svg>
          </div>
        </div>
        
        <div className="flex items-center flex-1 mx-4 max-w-3xl">
          <div className="flex items-center w-full bg-gray-100 rounded-lg px-4 py-1">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search mail"
              className="w-full bg-transparent border-none outline-none px-3 py-2"
            />
            <button className="p-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M4 6h16"></path>
                <path d="M4 12h16"></path>
                <path d="M4 18h16"></path>
                <path d="M18 6l3 4.5-3 4.5"></path>
                <path d="M6 6l-3 4.5 3 4.5"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </button>
          <IntegrationHub />
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <rect x="3" y="3" width="6" height="6" rx="1"></rect>
              <rect x="15" y="3" width="6" height="6" rx="1"></rect>
              <rect x="3" y="15" width="6" height="6" rx="1"></rect>
              <rect x="15" y="15" width="6" height="6" rx="1"></rect>
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center ml-2">
            I
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 p-4 bg-white overflow-y-auto">
          <button className="flex items-center justify-center bg-blue-100 text-gray-700 rounded-2xl py-3 px-4 space-x-1 mb-3 hover:shadow w-full" onClick={handleCompose}>
            <div className="flex items-center">
              <Pencil size={18} className="text-black mr-2" />
              <span>Compose</span>
            </div>
          </button>
          
          <div className="space-y-1 mb-2">
            <div 
              className={`flex items-center px-2 py-2 rounded-r-full font-medium cursor-pointer ${activeSidebarItem === 'inbox' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveSidebarItem('inbox')}
            >
              <Inbox size={18} className="mr-4" />
              <span>Inbox</span>
            </div>
            <div 
              className={`flex items-center px-2 py-2 rounded-r-full font-medium cursor-pointer ${activeSidebarItem === 'starred' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveSidebarItem('starred')}
            >
              <Star size={18} className="mr-4" />
              <span>Starred</span>
            </div>
            <div 
              className={`flex items-center px-2 py-2 rounded-r-full font-medium cursor-pointer ${activeSidebarItem === 'snoozed' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveSidebarItem('snoozed')}
            >
              <Clock size={18} className="mr-4" />
              <span>Snoozed</span>
            </div>
            <div 
              className={`flex items-center px-2 py-2 rounded-r-full font-medium cursor-pointer ${activeSidebarItem === 'sent' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveSidebarItem('sent')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              <span>Sent</span>
            </div>
            <div 
              className={`flex items-center px-2 py-2 rounded-r-full font-medium cursor-pointer ${activeSidebarItem === 'drafts' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveSidebarItem('drafts')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span>Drafts</span>
            </div>
            <div 
              className={`flex items-center px-2 py-2 rounded-r-full font-medium cursor-pointer ${activeSidebarItem === 'more' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveSidebarItem('more')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <span>More</span>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm">Labels</span>
              <button className="hover:bg-gray-100 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Email List / Detail View */}
        {openedEmail ? (
          <OpenedEmail email={openedEmail} />
        ) : (
          <div className="flex-1 flex flex-col bg-white overflow-y-auto border-l border-gray-200">
            {/* Email List Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={Object.values(checkedEmails).some(checked => checked)}
                  onChange={toggleAllChecks}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <span>1–17 of 17</span>
                <button className="p-2 rounded-full hover:bg-gray-100 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Email Categories */}
            <div className="flex border-b border-gray-200">
              <div 
                className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'primary' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab('primary')}
              >
                <div className="w-5 h-5 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                  </svg>
                </div>
                <span>Primary</span>
              </div>
              <div 
                className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'promotions' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab('promotions')}
              >
                <div className="w-5 h-5 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                </div>
                <div className="flex items-center">
                  <span>Promotions</span>
                  {getCategoryCount('promotions') > 0 && (
                    <span className="ml-2 px-2 py-px bg-green-600 text-white text-xs rounded-full">{getCategoryCount('promotions')} new</span>
                  )}
                </div>
              </div>
              <div 
                className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'social' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab('social')}
              >
                <div className="w-5 h-5 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <div className="flex items-center">
                  <span>Social</span>
                  {getCategoryCount('social') > 0 && (
                    <span className="ml-2 px-2 py-px bg-blue-600 text-white text-xs rounded-full">{getCategoryCount('social')} new</span>
                  )}
                </div>
              </div>
            </div>

            {/* Add Focus Mode Toggle */}
            <FocusModeToggle />

            {/* Get Started with Gmail */}
            {showGetStarted && <GetStarted />}

            {/* Email List */}
            {loading ? (
              <div className="flex justify-center items-center p-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <EmailList />
            )}
          </div>
        )}
      </div>

      {/* Compose Email Modal */}
      {showComposeEmail && <ComposeEmail />}
    </div>
  );
};

export default GmailClone;