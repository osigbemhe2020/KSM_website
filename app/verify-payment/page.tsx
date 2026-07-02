'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useVerifyDonation } from '@/hooks/payment.hook';

function VerifyPaymentContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') ?? '';
  const { data, isLoading, isError, error } = useVerifyDonation({ reference });

  const status = data?.data?.status ?? data?.status;
  const message = data?.message ?? data?.data?.message ?? 'Your payment verification is being processed.';

  return (
    <main className="min-h-screen bg-cream px-6 py-20">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-background p-8 shadow-sm">
        <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Payment Verification
        </p>
        <h1 className="mb-4 font-serif text-4xl text-foreground">
          Verify Your Donation
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          We are checking your payment status using the transaction reference provided.
        </p>

        {isLoading && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            Verifying your payment, please wait...
          </div>
        )}

        {!reference && !isLoading && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            No payment reference was found in the URL. Please return to the donation page and try again.
          </div>
        )}

        {isError && !isLoading && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-semibold">Verification failed.</p>
            <p className="mt-1">{error instanceof Error ? error.message : 'We could not verify your payment at the moment.'}</p>
          </div>
        )}

        {!isLoading && !isError && reference && data && (
          <div className={`rounded-lg border p-4 text-sm ${status === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
            <p className="font-semibold">
              {status === 'success' ? 'Payment verified successfully.' : 'Verification completed.'}
            </p>
            <p className="mt-2">{message}</p>
            {reference && (
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Reference: {reference}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-cream px-6 py-20" />}> 
      <VerifyPaymentContent />
    </Suspense>
  );
}
