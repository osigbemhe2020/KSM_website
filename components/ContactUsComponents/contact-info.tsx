import { MessageCircle, Mail, Phone, MapPin, Twitter } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Chat Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Chat with us</h3>
        <p className="text-sm text-gray-600 mb-3">Speak to us via live chat</p>
        <div className="space-y-2">
          <a href="#" className="flex items-center gap-2 font-semibold text-gray-900 hover:underline text-sm">
            <MessageCircle size={18} className="text-green-600" />
            Chat with us via WhatsApp
          </a>
          <a href="#" className="flex items-center gap-2 font-semibold text-gray-900 hover:underline text-sm">
            <Twitter size={18} className="text-blue-400" />
            Send a message to us via X
          </a>
          <a href="#" className="flex items-center gap-2 font-semibold text-gray-900 hover:underline text-sm">
            <Mail size={18} className="text-red-500" />
            Send us an email
          </a>
        </div>
      </div>

      {/* Call Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Call us</h3>
        <p className="text-sm text-gray-600 mb-3">You can call us Mon-Fri from 9am-6pm</p>
        <a
          href="tel:08091348200"
          className="flex items-center gap-2 font-semibold text-gray-900 hover:underline text-sm"
        >
          <Phone size={18} />
          08091348200
        </a>
      </div>
    </div>
  )
}
