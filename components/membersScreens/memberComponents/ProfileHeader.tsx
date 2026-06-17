'use client';
import { Camera } from 'lucide-react';
import useResponsive from '@/hooks/useResponsive';

interface ProfileHeaderProps {
  name: string;
  officeHeld: string;
  imageUrl?: string;
  canEdit?: boolean;
  onEditClick?: () => void;
  onCameraClick?: () => void;  // ← new prop
}

const ProfileHeader = ({
  name,
  officeHeld,
  canEdit = true,
  imageUrl = '/images/profile-image.jpg',
  onEditClick,
  onCameraClick,
}: ProfileHeaderProps) => {
  const { isMobile } = useResponsive();

  return (
    <div
      className={`w-full mb-[56px] px-4 py-3 flex items-center gap-4 ${
        isMobile ? 'border-2 border-[#EAEAEA] rounded-lg' : ''
      }`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={imageUrl}
          className="w-[100px] h-[100px] border-2 border-[#006A05] rounded-full object-cover"
          alt={name}
        />

        {/* Camera icon — only when canEdit */}
        {canEdit && (
          <div
            className="absolute bottom-1 right-4 translate-x-1/4 translate-y-1/4 w-8 h-8 bg-[#006A05] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#004d03] transition-colors"
            onClick={onCameraClick}
          >
            <Camera size={16} className="text-white" />
          </div>
        )}
      </div>

      {/* Text block */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl text-black sm:text-2xl font-semibold">{name}</h2>
        <p className="text-gray-600 text-base">{officeHeld}</p>
        {canEdit && (
          <button
            className="bg-forest mt-2 text-white px-4 py-2 rounded-md"
            onClick={onEditClick}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;