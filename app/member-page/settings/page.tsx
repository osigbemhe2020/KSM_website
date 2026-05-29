"use client";
import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import { Settings as SettingsIcon, Bell, User, Lock } from "lucide-react";
import { Card, CardHeader, Button, Toggle, StackLayout, Item } from "@/components/membersScreens/memberComponents/DetailsCards";
import { PasswordInput } from "@/components/membersScreens/memberComponents/PasswordInput";
import { useChangePassword } from "@/hooks/auth.hook";
import { toast } from "react-toastify"

const Page = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const { isMobile } = useResponsive();
  
  const { mutate, isPending, error } = useChangePassword();
  
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    
    mutate(
      { newPassword, currentPassword },
      {
        onSuccess: (data) => {
          toast.success("Password changed successfully");
          // Clear form on success
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to change password");
        }
      }
    );
    
  }
  return (
    <div 
    className={`${isMobile ? 'border-none px-0 py-4' : 'border-2 border-[#EAEAEA]  rounded-lg p-4'}`}
    >
      <Card variant="big">
        <CardHeader title="Change Password" icon={<Lock size={18} className="text-portal-button" />} />
        <form onSubmit={handleUpdatePassword} className="space-y-5 w-[300px]">
          <PasswordInput
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(typeof e === 'string' ? e : e.target.value)}
          />
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(typeof e === 'string' ? e : e.target.value)}
          />
          <PasswordInput
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(typeof e === 'string' ? e : e.target.value)}
          />
          <Button
            type="submit"
            disabled={isPending}
            icon={isPending ? null : <Lock size={14} />}
          >
            {isPending ? "Updating..." : " Update Password"}
          </Button>
        </form>
      </Card>

      <Card variant="big">
        <CardHeader title="Notification Preferences" icon={<Bell size={18} className="text-portal-button" />} />
        <StackLayout>
          <Toggle
            label="Email Notifications"
            description="Receive updates via email"
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
          <Toggle
            label="SMS Notifications"
            description="Receive updates via text message"
            checked={smsNotifications}
            onChange={setSmsNotifications}
          />
        </StackLayout>
      </Card>

      <Card variant="big">
        <CardHeader title="Account Information" icon={<User size={18} className="text-portal-button" />} />
        <div className="flex gap-16">
          <Item label="Email" value="james.mccarthy@email.com" />
          <Item label="Member Since" value="March 2018" />
        </div>
      </Card>

    </div>
  )
}

export default Page