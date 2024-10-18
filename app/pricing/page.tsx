import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const pricingPlans = [
  {
    name: 'Basic',
    price: '$9.99',
    description: 'Perfect for small businesses',
    features: ['Up to 5 workspaces', 'Basic analytics', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$29.99',
    description: 'For growing businesses',
    features: ['Up to 20 workspaces', 'Advanced analytics', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: ['Unlimited workspaces', 'Custom features', 'Dedicated account manager'],
  },
];

export default function Pricing() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}