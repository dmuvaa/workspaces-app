'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type Subscription = {
  plan: string;
  status: string;
  renewalDate: string;
};

type SubscriptionDetailsProps = {
  userId: string;
};

export function SubscriptionDetails({ userId }: SubscriptionDetailsProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`/api/subscription?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setSubscription(data);
        } else {
          throw new Error('Failed to fetch subscription details');
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    fetchSubscription();
  }, [userId]);

  if (!subscription) {
    return <div>Loading subscription details...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <strong>Current Plan:</strong> {subscription.plan}
      </div>
      <div>
        <strong>Status:</strong> {subscription.status}
      </div>
      <div>
        <strong>Renewal Date:</strong> {subscription.renewalDate}
      </div>
      <Button>Upgrade Plan</Button>
      <Button variant="outline">Manage Billing</Button>
    </div>
  );
}

