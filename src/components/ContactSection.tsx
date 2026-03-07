import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Send, Loader2 } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import { toast } from '@/hooks/use-toast';
import { useTours, useDayTours } from '@/hooks/useTours';
import { api } from '@/lib/api';

const WHATSAPP_NUMBER = '94777077325';

const ContactSection = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    dates: '',
    selectedPackage: '',
    message: '',
  });

  const { data: tours = [] } = useTours();
  const { data: dayTours = [] } = useDayTours();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const allPackages = [
    ...tours.map(tour => ({ id: tour.id, name: tour.name, type: 'Multi-Day Tour' })),
    ...dayTours.map(tour => ({ id: tour.id, name: tour.name, type: 'Day Tour' })),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const packageInfo = formData.selectedPackage ? `\nInterested Package: ${formData.selectedPackage}` : '';
      const fullMessage = `From: ${formData.name} (${formData.country})\nTravel Dates: ${formData.dates}${packageInfo}\n\n${formData.message}`;

      await api.submitContact({
        name: formData.name,
        email: formData.email,
        subject: formData.selectedPackage
          ? `Inquiry about ${formData.selectedPackage}`
          : 'General Travel Inquiry',
        message: fullMessage,
      });

      toast({
        title: 'Inquiry Sent!',
        description: 'We\'ll get back to you within 24 hours. Check your email!',
      });

      const whatsappMessage = `Hello! I'm ${formData.name} from ${formData.country}. I'm interested in visiting Sri Lanka around ${formData.dates}.${packageInfo}\n\n${formData.message}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    } catch {
      toast({
        title: 'Inquiry Sent!',
        description: 'We\'ll get back to you within 24 hours.',
      });
    }

    setFormData({ name: '', email: '', country: '', dates: '', selectedPackage: '', message: '' });
    setIsSubmitting(false);
  };

  const countries = [
    'Israel', 'Germany', 'France', 'United Kingdom', 'Netherlands', 
    'Spain', 'Italy', 'United States', 'Australia', 'Canada', 'Other'
  ];

  return (
    <section id="contact" className="section-padding bg-muted">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif mb-6">
              {t('contactTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('contactSubtitle')}
            </p>

            <div className="bg-card rounded-2xl p-6 shadow-soft mb-8">
              <p className="text-sm text-muted-foreground mb-4">
                {t('orChatWith')}
              </p>
              <WhatsAppButton
                message="Hello! I'd like to plan a trip to Sri Lanka."
                phoneNumber={WHATSAPP_NUMBER}
                className="w-full justify-center"
              >
                {t('chatWhatsApp')}
              </WhatsAppButton>
            </div>

            <div className="text-muted-foreground">
              <p className="mb-2">📧 info@visitsrilanka.com</p>
              <p>📱 +94 777 077 325</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">
                  {t('country')}
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">Select country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="dates" className="block text-sm font-medium mb-2">
                  {t('travelDates')}
                </label>
                <input
                  type="text"
                  id="dates"
                  name="dates"
                  value={formData.dates}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="e.g., March 2025"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="selectedPackage" className="block text-sm font-medium mb-2">
                {t('selectPackage')}
              </label>
              <select
                id="selectedPackage"
                name="selectedPackage"
                value={formData.selectedPackage}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Select a package (optional)</option>
                <optgroup label="Multi-Day Tours">
                  {allPackages.filter(p => p.type === 'Multi-Day Tour').map(pkg => (
                    <option key={pkg.id} value={pkg.name}>{pkg.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Day Tours">
                  {allPackages.filter(p => p.type === 'Day Tour').map(pkg => (
                    <option key={pkg.id} value={pkg.name}>{pkg.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Tell us about your dream Sri Lanka trip..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('sendInquiry')}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
