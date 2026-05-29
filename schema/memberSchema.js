import * as Yup from 'yup';

const memberSchema = Yup.object({
  // Personal Information
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),

  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),

  subCouncil: Yup.string()
    .required('Sub council is required'),

  occupation: Yup.string()
    .required('Occupation is required'),

  // Contact Information
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits'),

  // Location Information
  placeOfInitiation: Yup.string()
    .required('Place of initiation is required'),

  yearOfInitiation: Yup.string()
    .required('Year of initiation is required')
    .matches(/^[0-9]{4}$/, 'Year must be a valid 4-digit year')
    .max(new Date().getFullYear(), `Year cannot be later than ${new Date().getFullYear()}`),

  officeAddress: Yup.string()
    .required('Office address is required'),

  residentialAddress: Yup.string()
    .required('Residential address is required'),

  homeParish: Yup.string()
    .required('Home parish is required'),

  // Professional Information
  officeHeld: Yup.string()
    .required('Office held is required'),

  degree: Yup.string()
    .required('Degree is required'),

  // ← new optional array field
  previousOfficesHeld: Yup.array()
    .of(Yup.string())
    .optional(),

  // Optional fields
  memberId: Yup.string(),
  password: Yup.string(),
  mustChangePassword: Yup.boolean(),
});

export default memberSchema;