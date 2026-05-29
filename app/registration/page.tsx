"use client";

import { toast } from "react-toastify";
import { FormikHelpers } from "formik";
import { useRegisterMember } from "@/hooks/member.hook";
import RegistrationForm from "@/components/forms/RegistrationForm";

const RegistrationPage = () => {
  // pages/register/page.tsx
const { mutate, isPending } = useRegisterMember();

const handleSubmit = (values: any, helpers: FormikHelpers<any>) => {
  const formData = new FormData();

  // Append all text fields
  formData.append('firstName', values.firstName);
  formData.append('lastName', values.lastName);
  formData.append('subCouncil', values.subCouncil); 
  formData.append('occupation', values.occupation);
  formData.append('email', values.email);
  formData.append('phoneNumber', values.phoneNumber);
  formData.append('placeOfInitiation', values.placeOfInitiation);
  formData.append('yearOfInitiation', values.yearOfInitiation);
  formData.append('officeAddress', values.officeAddress);
  formData.append('residentialAddress', values.residentialAddress);
  formData.append('homeParish', values.homeParish);
  formData.append('officeHeld', values.officeHeld);
  formData.append('degree', values.degree);

  // Append profile image if selected
  if (values.profileImage) {
    formData.append('profilePhoto', values.profileImage);
  }

  mutate(formData, {
    onSuccess: () => {
      toast.success("Member registered successfully!");
      helpers.resetForm();
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed");
      helpers.setSubmitting(false);
    }
  });
};


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Member Registration</h1>
          <p className="text-gray-600 mb-8">Fill out the form below to register a new member.</p>
          
          <RegistrationForm onSubmit={handleSubmit} isPending={isPending} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;