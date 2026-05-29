// dashboard.tsx
import { Card, CardHeader,  LineItem, StackLayout } from "./memberComponents/DetailsCards";
import { UserCheck, Mail, Calendar, MapPin, } from "lucide-react";
import useResponsive from "@/hooks/useResponsive";

const Dashboard = () => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className={`${(isMobile || isTablet) ? 'w-full' : ''}`}>
      {/* Top row */}
      <div className={`${(isMobile || isTablet) ? 'flex-col w-full' : 'flex'} gap-[24px]`}>
        {/* Membership Status Card */}
        <Card variant="normal">
          <CardHeader title="Membership Status" icon={<UserCheck  size={20} />} />
          <StackLayout>
            <LineItem label="STANDING" value="Active" hasBg ={true} />
            <LineItem label="DUE DATE JOINED NEXT DEGREE" value="January 1, 2027" />
            <LineItem label="DEGREE" value="Third Degree" />
          </StackLayout>
        </Card>

        {/* Company Email Card */}
        <Card variant="normal">
          <CardHeader title="Company Email" icon={<Mail size={20} />} />
          <div className="flex items-start h-full">
            <p className="text-[16px] text-black break-all">
              james.mccarthy@knightscouncil.org
            </p>
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div className={`${(isMobile || isTablet) ? 'flex-col w-full' : 'flex'} gap-[24px]`}>
        {/* Sub-Council Information */}
        <Card variant="normal">
          <CardHeader title="Sub-Council Information" icon={<MapPin size={20}/>} />
          <StackLayout>
            <LineItem label="COUNCIL" value="St. Patrick Sub-Council" />
            <LineItem label="MEETING DAY" value="1st Tuesday of Month" />
            <LineItem label="LOCATION" value="Parish Hall, Room 3" />
          </StackLayout>
        </Card>

        {/* Next Upcoming Event - Big Card */}
        <Card variant="normal">
          <CardHeader title="Next Upcoming Event" icon={<Calendar size={20} />} />
          <StackLayout spacing="gap-[16px]">
            <LineItem label="EVENT" value="Annual Charity Dinner" />
            <LineItem label="DATE" value="March 15, 2026" />
            <LineItem label="LOCATION" value="Grand Ballroom, City Hotel" />
          </StackLayout>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;