"use client";

import React from 'react';
import { toast } from "react-toastify";
import { FormikHelpers } from "formik";
import { useGetMe } from "@/hooks/auth.hook";
import { useGetSingleMember, useUpdateMember } from "@/hooks/member.hook";
import RegistrationForm from "@/components/forms/RegistrationForm";

const EditFormPage = () => {
  const { data: authData, isLoading: authLoading } = useGetMe();
  const id = authData?.user?.id;
  const { data: memberData, isLoading, isError } = useGetSingleMember(id ?? '');
  const { mutate: updateMember, isPending } = useUpdateMember();

  const getChangedFields = (values: any, originalData: any) => {
    const changed: any = {};
    
    Object.keys(values).forEach(key => {
      // Skip empty password fields (user didn't want to change password)
      if (key === 'password' && !values[key]) return;
      
      // Compare with original data
      if (originalData && originalData[key] !== values[key]) {
        changed[key] = values[key];
      }
    });
    
    return changed;
  };

  const handleSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
    if (!id) return;
    
    // Only send changed fields
    const changedData = getChangedFields(values, memberData);
    
    // If no changes, don't make API call
    if (Object.keys(changedData).length === 0) {
      toast.info("No changes detected");
      setSubmitting(false);
      return;
    }
    
    updateMember({ id, data: changedData }, {
      onSuccess: (data) => {
        toast.success(data.message || "Member information updated successfully!");
      },
      onError: (error: { message?: string }) => {
        const message = error?.message || "Update failed";
        toast.error(message);
      },
      onSettled: () => {
        setSubmitting(false);
      }
    });
  };

  if (authLoading || isLoading) return <div>Loading...</div>;
  if (!id) return <div>Not logged in</div>;
  if (isError) return <div>Error loading member data</div>;

  // Create initial values from member data
  const initialValues = {
    // Profile Image
    profileImage: null,
    
    // Personal Information
    firstName: memberData?.firstName || '',
    lastName: memberData?.lastName || '',
    subCouncil: memberData?.subCouncil || '',
    occupation: memberData?.occupation || '',
    
    // Contact Information
    email: memberData?.email || '',
    phoneNumber: memberData?.phoneNumber || '',
    
    // Location Information
    placeOfInitiation: memberData?.placeOfInitiation || '',
    yearOfInitiation: memberData?.yearOfInitiation || '',
    officeAddress: memberData?.officeAddress || '',
    residentialAddress: memberData?.residentialAddress || '',
    homeParish: memberData?.homeParish || '',
    
    // Professional Information
    officeHeld: memberData?.officeHeld || '',
    degree: memberData?.degree || '',
    
    // Optional fields
    memberId: memberData?.memberId || '',
    password: '',
    mustChangePassword: false
  };

  return (
    <div className="min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Member Information</h1>
          <p className="text-gray-600 mb-8">Update your member information below.</p>
          
          <RegistrationForm 
            onSubmit={handleSubmit} 
            isPending={isPending}
            initialValues={initialValues}
            isEditMode={true}
          />
        </div>
    </div>
  );
};

export default EditFormPage;