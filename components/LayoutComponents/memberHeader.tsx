'use client';


import Link from 'next/link';
import { ArrowLeft, BellDot, X} from 'lucide-react';
import { useGetSingleMember } from '@/hooks/member.hook';
import useResponsive from '@/hooks/useResponsive';
import { useState } from 'react';

interface MemberHeaderProps {
  authData?: any;
  authLoading?: boolean;
}

const MemberHeader = ({ authData, authLoading }: MemberHeaderProps) => {
  const { isMobile, isTablet } = useResponsive();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const memberId = authData?.user?.id;

  const { data: memberData, isLoading, isError } = useGetSingleMember(memberId ?? '');

  console.log("memberData>>>>", memberData);

  // Dummy notification data
  const notifications = [
    {
      id: 1,
      title: "New Document Uploaded",
      message: "Church Constitution has been added to the documents section.",
      time: "2 hours ago",
      read: false,
      type: "document"
    },
    {
      id: 2,
      title: "Meeting Reminder",
      message: "Council meeting scheduled for tomorrow at 6:00 PM.",
      time: "5 hours ago",
      read: false,
      type: "meeting"
    },
    {
      id: 3,
      title: "Member Update",
      message: "Welcome new member John Doe to the Abuja Sub Council.",
      time: "1 day ago",
      read: true,
      type: "member"
    },
    {
      id: 4,
      title: "Event Announcement",
      message: "Annual charity event coming up next weekend.",
      time: "2 days ago",
      read: true,
      type: "event"
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-[96px] sm:px-[32px] p-3 flex justify-between items-start sm:items-center   bg-white text-black z-10">
      <Link href="/"  className="flex gap-2 ">
        <ArrowLeft/>
        {!isMobile && <span className="text-[16px] font-500 hover:text-gray-600">Return Home</span>}  
      </Link>
      <div className="flex items-center gap-8">
        <div className='relative'>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className='flex items-center gap-2 hover:bg-gray-100 rounded-full p-2 transition-colors'
          >
            <div className="relative">
              <BellDot className="text-[20px] text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold border-2 border-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            {!(isMobile || isTablet) && <div><p className="text-[16px] text-black font-500">Notifications</p></div>}
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          !notification.read ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium text-gray-900 ${
                            !notification.read ? 'font-semibold' : ''
                          }`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <img 
            src={memberData?.profilePhoto || "/default-avatar.png"} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-[#858585] object-cover"
          />
          {!(isMobile || isTablet) && <div>
            <p className="text-[16px] text-black font-500">
              {authLoading ? "Loading..." : `${authData?.user?.firstName || "John"} ${authData?.user?.lastName || "Doe"}`}
            </p>
            <p className="text-xs text-gray-600">Member</p>
          </div>}
        </div>
      </div>
    </header>
  );
};

export default MemberHeader;