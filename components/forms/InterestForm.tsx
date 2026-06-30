"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@/components/membersScreens/memberComponents/DetailsCards";
import { toast } from "react-toastify";

interface InterestFormProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  showParish?: boolean; // if true, show Diocese and Parish separate
  showAgeGroup?: boolean; // if true, show Diocese/Parish combined, and Age Group
}

export default function InterestForm({
  title = "Express Your Interest",
  subtitle = "Take the first step towards becoming a Knight of St. Mulumba",
  buttonText = "Join the Brotherhood",
  showParish = true,
  showAgeGroup = false,
}: InterestFormProps) {

  const initialValues = {
    surname: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    stateCity: "",
    country: "",
    diocese: "",
    parish: "",
    dioceseParish: "",
    ageGroup: "",
  };

  const validationSchema = Yup.object().shape({
    surname: Yup.string().required("Surname is required"),
    firstName: Yup.string().required("First name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    stateCity: Yup.string().required("State/City is required"),
    country: Yup.string().required("Country is required"),
    ...(showParish ? {
      diocese: Yup.string().required("Diocese is required"),
      parish: Yup.string().required("Parish is required"),
    } : {}),
    ...(showAgeGroup ? {
      dioceseParish: Yup.string().required("Diocese/Parish is required"),
      ageGroup: Yup.string().required("Age Group is required"),
    } : {}),
  });

  const getError = (error: any) => typeof error === 'string' ? error : undefined;
  const getTouched = (touched: any) => typeof touched === 'boolean' ? touched : undefined;

  return (
    <section className="py-20 bg-forest px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto bg-forest border border-white/20 p-8 sm:p-12 rounded-xl shadow-xl">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h2>
          <p className="text-white/80">{subtitle}</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 1000));
              toast.success("Interest submitted successfully!");
              resetForm();
            } catch (error) {
              toast.error("An error occurred. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Input
                    name="surname"
                    label="Surname"
                    value={values.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={getError(errors.surname)}
                    touched={getTouched(touched.surname)}
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <Input
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={getError(errors.firstName)}
                    touched={getTouched(touched.firstName)}
                    placeholder="John"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Input
                    name="email"
                    type="email"
                    label="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={getError(errors.email)}
                    touched={getTouched(touched.email)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Input
                    name="phoneNumber"
                    type="tel"
                    label="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={getError(errors.phoneNumber)}
                    touched={getTouched(touched.phoneNumber)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Input
                    name="stateCity"
                    label="State/City"
                    value={values.stateCity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={getError(errors.stateCity)}
                    touched={getTouched(touched.stateCity)}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <Input
                    name="country"
                    label="Country of Residence"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={getError(errors.country)}
                    touched={getTouched(touched.country)}
                    placeholder="United States"
                  />
                </div>
              </div>

              {showParish && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Input
                      name="diocese"
                      label="Diocese"
                      value={values.diocese}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={getError(errors.diocese)}
                      touched={getTouched(touched.diocese)}
                      placeholder="Archdiocese of..."
                    />
                  </div>
                  <div>
                    <Input
                      name="parish"
                      label="Parish"
                      value={values.parish}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={getError(errors.parish)}
                      touched={getTouched(touched.parish)}
                      placeholder="St. Mary's..."
                    />
                  </div>
                </div>
              )}

              {showAgeGroup && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Input
                      name="dioceseParish"
                      label="Diocese / Parish"
                      value={values.dioceseParish}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={getError(errors.dioceseParish)}
                      touched={getTouched(touched.dioceseParish)}
                      placeholder="Archdiocese of..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      Age Group
                    </label>
                    <select
                      name="ageGroup"
                      value={values.ageGroup}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full bg-[#FFF8DC] py-2 px-4 text-sm placeholder:text-[#000] focus:border-[#000] text-black"
                    >
                      <option value="">Select age group...</option>
                      <option value="15-18">15-18</option>
                      <option value="19-25">19-25</option>
                      <option value="26-35">26-35</option>
                    </select>
                    {errors.ageGroup && touched.ageGroup && (
                      <div className="text-red-500 text-xs mt-1">{errors.ageGroup as string}</div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-center sm:justify-start">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  isBorder={true}
                >
                  {isSubmitting ? "Submitting..." : buttonText}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
