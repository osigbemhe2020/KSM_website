import ContactForm from "@/components/ContactUsComponents/contact-form"
import ContactInfo from "@/components/ContactUsComponents/contact-info"

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with us",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
        {/* Form and Info Section */}
        <div className="lg:col-span-3 p-6 md:p-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-semibold capitalize mb-4 text-gray-900">Get in touch with us</h1>
              <p className="text-gray-600 text-lg">
                Got any questions about us? We are here to help. Send a message to us and we would respond within 24
                hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div className="lg:col-span-1">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="hidden lg:block lg:col-span-1 bg-cover bg-center bg-gray-200"
        />
      </div>
    </main>
  )
}
