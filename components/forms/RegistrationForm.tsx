"use client";

import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import { Input, Button } from "@/components/membersScreens/memberComponents/DetailsCards";
import ProfileImageUpload from "@/components/membersScreens/memberComponents/ProfileImageUpload";
import memberSchema from "@/schema/memberSchema";
import PreviousOfficesField from "./PreviousOfficesField";

const OFFICE_OPTIONS = [
  'None',
  'Grand Knight',
  'Deputy Grand Knight',
  'Secretary',
  'Assistant Secretary',
  'Warden',
  'Warden 2',
  'Provost',
  'Provost 2',
  'Advocate',
  'Financial Secretary',
  'Treasurer',
];

interface RegistrationFormProps {
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  isPending?: boolean;
  initialValues?: any;
  isEditMode?: boolean;
}

const RegistrationForm = ({
  onSubmit,
  isPending = false,
  initialValues: propInitialValues,
  isEditMode = false,
}: RegistrationFormProps) => {
  const getError = (error: any) => typeof error === 'string' ? error : undefined;
  const getTouched = (touched: any) => typeof touched === 'boolean' ? touched : undefined;

  const defaultInitialValues = {
    profileImage: null,
    firstName: '',
    lastName: '',
    subCouncil: '',
    occupation: '',
    email: '',
    phoneNumber: '',
    placeOfInitiation: '',
    yearOfInitiation: '',
    officeAddress: '',
    residentialAddress: '',
    homeParish: '',
    officeHeld: '',
    degree: '',
    previousOfficesHeld: [],   // ← new array field
    memberId: '',
    password: '',
    mustChangePassword: true,
  };

  const finalInitialValues = propInitialValues || defaultInitialValues;

  return (
    <Formik
      initialValues={finalInitialValues}
      validationSchema={memberSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
        <Form className="space-y-6">

          {/* Profile Image */}
          {!isEditMode && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Profile Image</h3>
              <div className="flex justify-center">
                <ProfileImageUpload
                  currentImage={values.profileImage ? URL.createObjectURL(values.profileImage) : ''}
                  onImageChange={(file) => setFieldValue('profileImage', file)}
                  size="lg"
                  name="profileImage"
                />
              </div>
              <ErrorMessage 
              name="profileImage" component="div" className="text-red-500 text-xs mt-2 text-center" />
            </div>
          )}

          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.firstName)}
                  touched={getTouched(touched.firstName)}
                  placeholder="Enter first name"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Input
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.lastName)}
                  touched={getTouched(touched.lastName)}
                  placeholder="Enter last name"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Input
                  name="subCouncil"
                  label="Sub Council"
                  value={values.subCouncil}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.subCouncil)}
                  touched={getTouched(touched.subCouncil)}
                  placeholder="Enter sub council"
                />
                <ErrorMessage name="subCouncil" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Input
                  name="occupation"
                  label="Occupation"
                  value={values.occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.occupation)}
                  touched={getTouched(touched.occupation)}
                  placeholder="Enter occupation"
                />
                <ErrorMessage name="occupation" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  name="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.email)}
                  touched={getTouched(touched.email)}
                  placeholder="Enter email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.phoneNumber)}
                  touched={getTouched(touched.phoneNumber)}
                  placeholder="Enter phone number"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  name="placeOfInitiation"
                  label="Place of Admission"
                  value={values.placeOfInitiation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.placeOfInitiation)}
                  touched={getTouched(touched.placeOfInitiation)}
                  placeholder="Enter place of admission"
                />
                <ErrorMessage name="placeOfInitiation" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Input
                  name="yearOfInitiation"
                  label="Year of Admission"
                  value={values.yearOfInitiation}
                  onChange={(e) => {
                    const event = e as React.ChangeEvent<HTMLInputElement>;
                    const value = event.target.value;
                    if (/^\d*$/.test(value) && value.length <= 4) {
                      handleChange(event);
                    }
                  }}
                  onBlur={handleBlur}
                  error={getError(errors.yearOfInitiation)}
                  touched={getTouched(touched.yearOfInitiation)}
                  placeholder="YYYY (e.g., 1991)"
                />
                <ErrorMessage name="yearOfInitiation" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Input
                  name="officeAddress"
                  label="Office Address"
                  value={values.officeAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.officeAddress)}
                  touched={getTouched(touched.officeAddress)}
                  placeholder="Enter office address"
                />
                <ErrorMessage name="officeAddress" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Input
                  name="residentialAddress"
                  label="Residential Address"
                  value={values.residentialAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.residentialAddress)}
                  touched={getTouched(touched.residentialAddress)}
                  placeholder="Enter residential address"
                />
                <ErrorMessage name="residentialAddress" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Input
                  name="homeParish"
                  label="Home Parish"
                  value={values.homeParish}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getError(errors.homeParish)}
                  touched={getTouched(touched.homeParish)}
                  placeholder="Enter home parish"
                />
                <ErrorMessage name="homeParish" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* officeHeld — now a select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Office Held <span className="text-red-500">*</span>
                </label>
                <select
                  name="officeHeld"
                  value={values.officeHeld}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4D3A] focus:border-transparent bg-white text-gray-900 shadow-sm hover:border-gray-400 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select office held</option>
                  {OFFICE_OPTIONS.map((office) => (
                    <option key={office} value={office}>{office}</option>
                  ))}
                </select>
                <ErrorMessage name="officeHeld" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree <span className="text-red-500">*</span>
                </label>
                <select
                  name="degree"
                  value={values.degree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E4D3A] focus:border-transparent bg-white text-gray-900 shadow-sm hover:border-gray-400 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select degree</option>
                  <option value="1st degree">1st degree</option>
                  <option value="2nd degree">2nd degree</option>
                  <option value="3rd degree">3rd degree</option>
                  <option value="4th degree">4th degree</option>
                </select>
                <ErrorMessage name="degree" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* previousOfficesHeld — spans full width */}
              <div className="md:col-span-2">
                <PreviousOfficesField
                  values={values.previousOfficesHeld ?? []}
                  setFieldValue={setFieldValue}
                  error={getError(errors.previousOfficesHeld)}
                />
              </div>

            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full px-8 py-3 bg-[#1E4D3A] text-white rounded-lg disabled:bg-gray-400 transition-colors"
            >
              {isSubmitting || isPending ? 'Registering...' : 'Register Member'}
            </Button>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;