import { useState } from 'react';
import { Card, CardHeader, GridLayout, Item } from './memberComponents/DetailsCards';
import ProfileHeader from './memberComponents/ProfileHeader';
import ProfileImageModal from './memberComponents/ProfileImageModal';
import memberSections from '@/lib/memberSections';
import { useRouter } from 'next/navigation';
import useResponsive from '@/hooks/useResponsive';
import { useGetMe } from '@/hooks/auth.hook';
import { useGetSingleMember, useUpdateProfilePhoto } from '@/hooks/member.hook';
import { User, Award, Building2, LucideIcon } from 'lucide-react';
import { toast } from 'react-toastify';

interface MyMembershipProps {
  memberId?: string;
}

const MyMembership = ({ memberId }: MyMembershipProps) => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { data: authData, isLoading: authLoading } = useGetMe();

  const id = memberId || authData?.user?.id;

  const { data: memberData, isLoading, isError } = useGetSingleMember(id ?? '');
  const { mutate: updatePhoto, isPending: isUploading } = useUpdateProfilePhoto();

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  if (authLoading || isLoading) return <div>Loading...</div>;
  if (!id) return <div>Not logged in</div>;
  if (isError) return <div>Error...</div>;

  const canEdit = !memberId && authData?.user?.id === id;

  const iconMap: Record<string, LucideIcon> = { User, Award, Building2 };

  const sections = Object.entries(memberSections).map(([sectionTitle, { icon, fields }]) => ({
    sectionTitle,
    icon,
    data: Object.entries(fields).map(([key, label]) => ({
      title: label,
      content: Array.isArray(memberData?.[key])
        ? memberData[key].length > 0
          ? memberData[key].join(', ')
          : '—'
        : memberData?.[key] ?? '—',
    })),
  }));

  const handlePhotoConfirm = (file: File) => {
    updatePhoto(
      { id, file },
      {
        onSuccess: () => {
          toast.success('Profile photo updated successfully');
          setIsPhotoModalOpen(false);
        },
        onError: (error: any) => {
          toast.error(error?.message ?? 'Failed to update photo. Please try again.');
        },
      },
    );
  };

  return (
    <div
      className={`${
        isMobile ? 'border-none px-0 py-4' : 'border-2 border-[#EAEAEA] rounded-lg p-4'
      }`}
    >
      <ProfileHeader
        name={
          memberData?.firstName
            ? `${memberData.firstName} ${memberData.lastName}`
            : 'Loading...'
        }
        officeHeld={memberData?.officeHeld ?? 'Loading...'}
        imageUrl={memberData?.profilePhoto || '/images/profile-image.jpg'}
        canEdit={canEdit}
        onEditClick={() => router.push('/member-page/basedata/edit-form')}
        onCameraClick={() => setIsPhotoModalOpen(true)}
      />

      <div className="flex flex-col gap-[48px]">
        {sections.map(({ sectionTitle, icon, data }) => {
          const Icon = iconMap[icon];
          return (
            <Card key={sectionTitle} variant="big">
              <CardHeader title={sectionTitle} icon={<Icon />} />
              <GridLayout>
                {data.map((item, index) => (
                  <Item key={index} label={item.title} value={item.content} />
                ))}
              </GridLayout>
            </Card>
          );
        })}
      </div>

      {/* Profile photo modal */}
      <ProfileImageModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onConfirm={handlePhotoConfirm}
        isLoading={isUploading}
        currentImage={memberData?.profilePhoto || ''}
      />
    </div>
  );
};

export default MyMembership;