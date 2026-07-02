"use client"
import { useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Mail, Phone, MapPin, MessageCircle, Twitter, Clock, ChevronDown } from "lucide-react";
import useResponsive from "@/hooks/useResponsive";
import { Input } from "@/components/membersScreens/memberComponents/DetailsCards";


const WHATSAPP_NUMBER = "+2348000000000";
const EMAIL = "info@ksmabuja.org";
const PHONE = "+234 800 000 0000";
const ADDRESS = "Knights of St. Mulumba Metro Council Abuja, Catholic Secretariat, Area 3, Garki, Abuja, FCT";
const X_HANDLE = "ksmabuja";

/* ───────────────── Header ───────────────── */

/* ───────────────── Page Header ───────────────── */
function ContactPageHeader() {
    return (
        <section className="py-20 px-6 text-center">
            <p className="text-[10px] tracking-[0.3em] text-forest mb-4">CONTACT</p>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-5">Get In Touch With Us</h1>
            <p className="max-w-xl mx-auto text-foreground/75 text-sm leading-relaxed">
                Got any questions about us? We are here to help. Send us a message and we will respond as soon as possible.
            </p>
        </section>
    );
}

/* ───────────────── Contact Form ───────────────── */
const contactSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("First name is required").max(60),
    lastName: Yup.string().trim().required("Last name is required").max(60),
    email: Yup.string().trim().email("Enter a valid email").required("Email is required").max(255),
    whatsapp: Yup.string().trim().required("Enter a valid phone number").min(7, "Enter a valid phone number").max(20),
    subject: Yup.string().trim().required("Subject is required").min(2, "Subject is required").max(120),
    message: Yup.string().trim().required("Message is required").min(10, "Message must be at least 10 characters").max(1000),
});
type ContactValues = Yup.InferType<typeof contactSchema>;

function ContactForm() {
    const textareaCls = "w-full px-4 py-3 text-sm bg-[#FFF8DC] border border-gray-400 focus:outline-none focus:border-forest transition-colors resize-y";

    return (
        <Formik
            initialValues={{ firstName: "", lastName: "", email: "", whatsapp: "", subject: "", message: "" }}
            validationSchema={contactSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                    await new Promise((r) => setTimeout(r, 900));
                    toast.success("Message sent. We'll be in touch shortly.");
                    resetForm();
                } catch {
                    toast.error("Could not send your message. Please try again.");
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
                <Form noValidate className="border border-border p-6 md:p-10">
                    <h2 className="font-serif text-5xl text-foreground mb-6">Send us a message</h2>
                    <p className="text-sm text-muted-foreground mb-8">Fields marked with <span className="text-forest">*</span> are required.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <Input
                            name="firstName"
                            label="FIRST NAME *"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.firstName}
                            touched={touched.firstName}
                        />
                        <Input
                            name="lastName"
                            label="LAST NAME *"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.lastName}
                            touched={touched.lastName}
                        />
                    </div>

                    <div className="mb-5">
                        <Input
                            name="email"
                            type="email"
                            label="EMAIL ADDRESS *"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email}
                            touched={touched.email}
                        />
                    </div>

                    <div className="mb-5">
                        <Input
                            name="whatsapp"
                            type="tel"
                            label="WHATSAPP PHONE NUMBER *"
                            placeholder="+234…"
                            value={values.whatsapp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.whatsapp}
                            touched={touched.whatsapp}
                        />
                    </div>

                    <div className="mb-5">
                        <Input
                            name="subject"
                            label="SUBJECT *"
                            value={values.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.subject}
                            touched={touched.subject}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">MESSAGE *</label>
                        <Field
                            name="message"
                            as="textarea"
                            rows={7}
                            className={textareaCls + (errors.message && touched.message ? ' border-red-500' : '')}
                        />
                        <ErrorMessage name="message" component="p" className="mt-1 text-xs text-red-500" />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-10 bg-forest text-white py-4 text-sm tracking-[0.15em] hover:bg-forest-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "SENDING…" : "SEND MESSAGE"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

/* ───────────────── Sidebar Pieces ───────────────── */
function ContactInfoCard({ children, title, eyebrow }: { children: React.ReactNode; title: string; eyebrow?: string }) {
    return (
        <div className="bg-background border border-border p-6">
            {eyebrow && <p className="text-[10px] tracking-[0.3em] text-forest mb-2">{eyebrow}</p>}
            <h3 className="font-serif text-xl mb-4">{title}</h3>
            {children}
        </div>
    );
}

function ContactMethod({ icon: Icon, label, href }: { icon: React.ComponentType<{ className?: string }>; label: string; href: string }) {
    return (
        <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-3 py-3 border-b border-border last:border-b-0 hover:text-forest transition-colors"
        >
            <span className="inline-flex h-9 w-9 items-center justify-center border border-border group-hover:border-forest group-hover:bg-forest group-hover:text-white transition-colors">
                <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm">{label}</span>
            <span className="ml-auto text-xs opacity-60 group-hover:opacity-100">→</span>
        </a>
    );
}

function OfficeHoursCard() {
    const rows: Array<[string, string]> = [
        ["Monday – Friday", "9:00 AM – 6:00 PM"],
        ["Saturday", "10:00 AM – 2:00 PM"],
        ["Sunday", "Closed"],
    ];
    return (
        <ContactInfoCard title="Office Hours" eyebrow="WHEN WE'RE IN">
            <ul className="text-sm">
                {rows.map(([d, h]) => (
                    <li key={d} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                        <span className="text-foreground/85">{d}</span>
                        <span className="text-muted-foreground">{h}</span>
                    </li>
                ))}
            </ul>
        </ContactInfoCard>
    );
}

function Sidebar() {
    const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
    return (
        <div className="space-y-6">
            <ContactInfoCard title="Chat With Us" eyebrow="QUICK CHANNELS">
                <p className="text-sm text-muted-foreground mb-4">Speak with us through any of the following channels.</p>
                <div>
                    <ContactMethod icon={MessageCircle} label="Chat with us via WhatsApp" href={waLink} />
                    <ContactMethod icon={Twitter} label="Send us a message via X" href={`https://x.com/${X_HANDLE}`} />
                    <ContactMethod icon={Mail} label="Send us an email" href={`mailto:${EMAIL}`} />
                </div>
            </ContactInfoCard>

            <ContactInfoCard title="Call Us" eyebrow="BY PHONE">
                <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center border border-border shrink-0">
                        <Phone className="h-4 w-4" />
                    </span>
                    <div>
                        <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="text-sm font-medium hover:text-forest transition-colors">{PHONE}</a>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Monday – Friday, 9:00 AM – 6:00 PM
                        </p>
                    </div>
                </div>
            </ContactInfoCard>

            <ContactInfoCard title="Visit Us" eyebrow="OUR OFFICE">
                <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center border border-border shrink-0">
                        <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                        <p className="text-sm leading-relaxed">{ADDRESS}</p>
                        <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs text-forest hover:underline">
                            View on Google Maps →
                        </a>
                    </div>
                </div>
            </ContactInfoCard>

            <OfficeHoursCard />
        </div>
    );
}

/* ───────────────── FAQ ───────────────── */
type FAQ = { q: string; a: string };
const faqs: FAQ[] = [
    { q: "How long does it take to receive a response?", a: "We typically respond to messages within 24–48 hours on business days." },
    { q: "Can I contact you via WhatsApp?", a: "Yes — tap the WhatsApp link in the sidebar to start a conversation with the council secretariat." },
    { q: "Where is your office located?", a: `${ADDRESS}. Use the map below for directions.` },
    { q: "Who should I contact for membership inquiries?", a: "Send your inquiry through the form with the subject 'Membership' and our Membership Committee will reach out." },
];

function FAQAccordion() {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className="py-20 px-6 bg-cream">
            <div className="max-w-3xl mx-auto">
                <p className="text-[10px] tracking-[0.3em] text-forest mb-3 text-center">HELP</p>
                <h2 className="font-serif text-5xl text-foreground mb-6 text-center">Frequently Asked Questions</h2>
                <div className="border-t border-border">
                    {faqs.map((f, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={f.q} className="border-b border-border">
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 py-5 text-left hover:text-forest transition-colors"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-serif text-lg">{f.q}</span>
                                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isOpen && <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ───────────────── Map ───────────────── */
function MapSection() {
    const embed = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
    return (
        <section className="py-20 px-6 bg-background border-t border-border">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-[10px] tracking-[0.3em] text-forest mb-3">FIND US</p>
                    <h2 className="font-serif text-5xl text-foreground mb-6">Visit Our Office</h2>
                    <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> {ADDRESS}
                    </p>
                </div>
                <div className="border border-border overflow-hidden aspect-[16/8] bg-muted">
                    <iframe
                        title="KSM Metro Council Abuja office location"
                        src={embed}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full border-0"
                    />
                </div>
            </div>
        </section>
    );
}

/* ───────────────── Page ───────────────── */
function ContactPage() {
    const { isLaptop } = useResponsive();

    const gridStyle: React.CSSProperties = {
        maxWidth: '80rem',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isLaptop ? '1fr' : '2fr 1fr',
        gap: '2rem',
    };

    return (
        <main className="min-h-screen bg-cream">

            <ContactPageHeader />
            <section style={{ padding: '0 1.5rem 5rem' }}>
                <div style={gridStyle}>
                    <ContactForm />
                    <Sidebar />
                </div>
            </section>
            <FAQAccordion />
            <MapSection />
        </main>
    );
}
export default ContactPage;





// import ContactForm from "@/components/ContactUsComponents/contact-form"
// import ContactInfo from "@/components/ContactUsComponents/contact-info"

// export const metadata = {
//     title: "Contact Us",
//     description: "Get in touch with us",
// }

// export default function Home() {
//     return (
//         <main className="min-h-screen">
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
//                 {/* Form and Info Section */}
//                 <div className="lg:col-span-3 p-6 md:p-16">
//                     <div className="max-w-4xl mx-auto">
//                         <div className="text-center mb-12">
//                             <h1 className="text-3xl md:text-4xl font-semibold capitalize mb-4 text-gray-900">Get in touch with us</h1>
//                             <p className="text-gray-600 text-lg">
//                                 Got any questions about us? We are here to help. Send a message to us and we would respond within 24
//                                 hours.
//                             </p>
//                         </div>

//                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                             <div className="lg:col-span-2">
//                                 <ContactForm />
//                             </div>
//                             <div className="lg:col-span-1">
//                                 <ContactInfo />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Image Section */}
//                 <div
//                     className="hidden lg:block lg:col-span-1 bg-cover bg-center bg-gray-200"
//                 />
//             </div>
//         </main>
//     )
// }

