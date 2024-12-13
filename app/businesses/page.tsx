// app/(pages)/for-businesses/page.tsx

import { Button } from "@/components/ui/button"; // Example ShadCN Button
import Image from "next/image";

export default function ForBusinessesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Hero Section */}
      <section className="text-center bg-green-600 text-white py-16">
        <h1 className="text-4xl font-bold">Partner With Us</h1>
        <p className="mt-4 text-lg">
          Be among the first businesses to benefit from our exclusive early signup offers.
        </p>
        <Button className="mt-6 bg-white text-green-600 hover:bg-gray-100">
          Get Started Now
        </Button>
      </section>

      {/* Perks Section */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-green-700">Why Sign Up Early?</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h3 className="text-xl font-medium text-green-600">Lifetime Discount</h3>
            <p className="mt-4 text-gray-600">
              Pay just <strong>$125</strong> for a lifetime subscription.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h3 className="text-xl font-medium text-green-600">Featured Placement</h3>
            <p className="mt-4 text-gray-600">
              Get your business showcased in the Featured Section for maximum visibility.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h3 className="text-xl font-medium text-green-600">Custom Marketing</h3>
            <p className="mt-4 text-gray-600">
              Enjoy custom blog and social media posts to highlight your brand.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h3 className="text-xl font-medium text-green-600">3D App Early Trial</h3>
            <p className="mt-4 text-gray-600">
              Access our innovative 3D app before anyone else at no extra cost.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section className="bg-green-50 py-16">
        <h2 className="text-center text-3xl font-semibold text-green-700 mb-8">
          Early Bird Pricing vs. Post-Launch
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-6">
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h3 className="text-xl font-medium text-green-600">Early Bird Pricing</h3>
            <ul className="mt-4 text-gray-600 space-y-2">
            <li>💲 <strong>$125</strong> Lifetime Subscription</li>
              <li>✨ Featured Placement</li>
              <li>📣 Custom Marketing</li>
              <li>🖥️ Early Access to 3D App</li>
            </ul>
          </div>
          <div className="p-6 bg-gray-200 shadow-lg rounded-md">
            <h3 className="text-xl font-medium text-gray-700">Post-Launch Pricing</h3>
            <ul className="mt-4 text-gray-600 space-y-2">
            <li>💲 $25 Monthly / $100 Annually / $449 Lifetime</li>
              <li>🚫 No Featured Placement</li>
              <li>🚫 No Custom Marketing</li>
              <li>🚫 No Early Access</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-green-600 text-white">
        <h2 className="text-3xl font-bold">Ready to Join?</h2>
        <p className="mt-4 text-lg">
          Sign up today and secure your exclusive early bird benefits.
        </p>
        <Button className="mt-6 bg-white text-green-600 hover:bg-gray-100">
          Get Started Now
        </Button>
      </section>
    </div>
  );
}
