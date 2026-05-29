'use client'
import { use } from 'react';
import MyMembership from '@/components/membersScreens/myMembership';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return <MyMembership memberId={id} />;
}