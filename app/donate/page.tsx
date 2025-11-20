'use client';

import React, { useState } from 'react';
import { Heart, User } from 'lucide-react';

export default function DonationForm() {
  const [amount, setAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [project, setProject] = useState('');

  const amounts = ['25', '50', '100', '250'];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Mission</h1>
          <p className="text-gray-600">
            Your generous donation helps us continue our work in leadership development and community service. Every contribution makes a difference.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Donation Amount */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Donation Amount</h2>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 px-4 rounded font-medium transition-colors ${
                    amount === amt && !customAmount
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setAmount('other');
                  setCustomAmount('');
                }}
                className={`py-3 px-4 rounded font-medium transition-colors ${
                  amount === 'other' && !customAmount
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Other
              </button>
              <input
                type="text"
                placeholder="$ Enter amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('custom');
                }}
                className="py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setPaymentMethod('credit')}
                className={`py-3 px-4 rounded font-medium transition-colors ${
                  paymentMethod === 'credit'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`py-3 px-4 rounded font-medium transition-colors ${
                  paymentMethod === 'paypal'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                PayPal
              </button>
              <button
                onClick={() => setPaymentMethod('bank')}
                className={`py-3 px-4 rounded font-medium transition-colors ${
                  paymentMethod === 'bank'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bank Transfer
              </button>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'credit' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Optional Project Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Optional: Link Your Donation</h2>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
            >
              <option value="">Select a Project (Optional)</option>
              <option value="education">Education Initiative</option>
              <option value="healthcare">Healthcare Program</option>
              <option value="community">Community Development</option>
            </select>
          </div>

          {/* Security Note */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-500">
              Your donation will be securely processed. Thank you for your support!
            </p>
          </div>

          {/* Donate Button */}
          <button className="w-full bg-emerald-500 text-white py-3 px-6 rounded font-medium hover:bg-emerald-600 transition-colors">
            Donate Now
          </button>
        </div>
      </main>
    </div>
  );
}