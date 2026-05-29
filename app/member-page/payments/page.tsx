"use client";
import { Download, CreditCard } from "lucide-react";
import Table from "@/components/membersScreens/memberComponents/Table";
import { Card, CardHeader, Button } from "@/components/membersScreens/memberComponents/DetailsCards";


const allPayments = [
  { date: "Feb 1, 2026", description: "Annual Dues 2026", amount: "$75.00", status: "Pending" },
  { date: "Jan 1, 2025", description: "Annual Dues 2025", amount: "$75.00", status: "Paid" },
  { date: "Jun 15, 2024", description: "Charity Dinner Ticket", amount: "$75.00", status: "Paid" },
  { date: "Jan 1, 2024", description: "Annual Dues 2024", amount: "$75.00", status: "Paid" },
  { date: "Mar 10, 2023", description: "Initiation Fee", amount: "$75.00", status: "Paid" },
  { date: "Jan 1, 2023", description: "Annual Dues 2023", amount: "$75.00", status: "Paid" },
];


const Payments = () => {

  const outstanding = allPayments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace("$", "")), 0);

  type Payment = typeof allPayments[0];
  
  const columns = [
    {
      key: 'date' as keyof Payment,
      header: 'Date'
    },
    {
      key: 'description' as keyof Payment,
      header: 'Description'
    },
    {
      key: 'amount' as keyof Payment,
      header: 'Amount'
    },
    {
      key: 'status' as keyof Payment,
      header: 'Status',
      render: (value: string) => (
        <span
          className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium ${
            value === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {value}
        </span>
      )
    },
    {
      key: 'receipt' as keyof Payment,
      header: 'Receipt',
      render: () => (
        <button className="flex items-center gap-1.5 text-xs hover:opacity-70 transition-opacity">
          <Download size={12} />
          Download
        </button>
      )
    }
  ];

  return (
   <div 
    className={ 'border-2 border-[#EAEAEA]  rounded-lg p-4'}
    >
      
      {/* Outstanding Balance */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Outstanding Balance</p>
          <p className="text-xl font-semibold text-green-600">${outstanding.toFixed(2)}</p>
        </div>
        <Button
          icon={<CreditCard size={14} />}
          className="bg-portal-button text-portal-button-foreground px-5 py-2.5"
        >
          Pay Now
        </Button>
      </div>

      <Table
        data={allPayments}
        columns={columns}
        itemsPerPage={5}
        emptyMessage="No payments found"
      />
    </div>
  );
};

export default Payments;
