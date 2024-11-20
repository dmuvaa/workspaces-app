'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // TODO: Implement form submission logic (e.g., send to an API endpoint)
      console.log('Form submitted:', formData);
      alert('Thank you for your message. We will get back to you soon!');

      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message here..."
          />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}
