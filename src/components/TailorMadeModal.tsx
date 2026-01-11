import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface TailorMadeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const countries = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia',
  'Canada', 'Netherlands', 'Italy', 'Spain', 'Switzerland', 'Israel',
  'India', 'Japan', 'China', 'Other'
];

const interests = [
  { id: 'history', label: 'History and Culture' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'beach', label: 'Beach Escapes' },
  { id: 'nature', label: 'Nature and Scenic' },
  { id: 'hillCountry', label: 'Hill Country' },
  { id: 'family', label: 'Family Travel' },
  { id: 'adventure', label: 'Adventure Activities' },
  { id: 'honeymoon', label: 'Perfect Honeymoon' },
];

const TailorMadeModal = ({ open, onOpenChange }: TailorMadeModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    pickupPlace: '',
    country: '',
    groupSize: '',
    numAdults: '1',
    ageGroupAdults: [] as string[],
    numChildren: '0',
    ageGroupChildren: [] as string[],
    tourDuration: '',
    accommodation: '',
    interests: [] as string[],
    comments: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean, field: 'interests' | 'ageGroupAdults' | 'ageGroupChildren') => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], id]
        : prev[field].filter(item => item !== id)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    const message = encodeURIComponent(
      `*Tailor-Made Tour Request*\n\n` +
      `Name: ${formData.title} ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Country: ${formData.country}\n` +
      `Arrival: ${formData.arrivalDate}\n` +
      `Pickup: ${formData.pickupPlace}\n` +
      `Group Size: ${formData.groupSize}\n` +
      `Adults: ${formData.numAdults}\n` +
      `Children: ${formData.numChildren}\n` +
      `Duration: ${formData.tourDuration}\n` +
      `Accommodation: ${formData.accommodation}\n` +
      `Interests: ${formData.interests.join(', ')}\n\n` +
      `Comments: ${formData.comments}`
    );

    window.open(`https://wa.me/94771234567?text=${message}`, '_blank');

    toast({
      title: t('inquirySent'),
      description: t('inquiryConfirmation'),
    });

    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-serif text-center">
            {t('tailorMadeTitle')}
          </DialogTitle>
          <p className="text-muted-foreground text-center text-sm mt-2">
            {t('tailorMadeDescription')}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name Row */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('title')}</label>
              <Select value={formData.title} onValueChange={(v) => setFormData(prev => ({ ...prev, title: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Ms">Ms</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-3">
              <label className="text-sm font-medium text-foreground block mb-2">{t('fullName')}</label>
              <Input name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
          </div>

          {/* Contact Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('email')}</label>
              <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('telephoneNumber')}</label>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
          </div>

          {/* Arrival Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('arrivalDate')}</label>
              <Input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('pickupPlace')}</label>
              <Input name="pickupPlace" value={formData.pickupPlace} onChange={handleInputChange} />
            </div>
          </div>

          {/* Country & Group Size */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('country')}</label>
              <Select value={formData.country} onValueChange={(v) => setFormData(prev => ({ ...prev, country: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select')} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('groupSize')}</label>
              <Select value={formData.groupSize} onValueChange={(v) => setFormData(prev => ({ ...prev, groupSize: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="small">Small Group (3-5)</SelectItem>
                  <SelectItem value="medium">Medium Group (6-10)</SelectItem>
                  <SelectItem value="large">Large Group (10+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Adults */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('numberOfAdults')}</label>
              <Select value={formData.numAdults} onValueChange={(v) => setFormData(prev => ({ ...prev, numAdults: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('ageGroupOfAdults')}</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <Checkbox 
                    checked={formData.ageGroupAdults.includes('18-64')}
                    onCheckedChange={(c) => handleCheckboxChange('18-64', !!c, 'ageGroupAdults')}
                  />
                  <span className="text-sm">18 – 64</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox 
                    checked={formData.ageGroupAdults.includes('65+')}
                    onCheckedChange={(c) => handleCheckboxChange('65+', !!c, 'ageGroupAdults')}
                  />
                  <span className="text-sm">65 or Above</span>
                </label>
              </div>
            </div>
          </div>

          {/* Children */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('numberOfChildren')}</label>
              <Select value={formData.numChildren} onValueChange={(v) => setFormData(prev => ({ ...prev, numChildren: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0,1,2,3,4,5,6].map(n => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('ageGroupOfChildren')}</label>
              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                  <Checkbox 
                    checked={formData.ageGroupChildren.includes('0-6')}
                    onCheckedChange={(c) => handleCheckboxChange('0-6', !!c, 'ageGroupChildren')}
                  />
                  <span className="text-sm">0 – 6</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox 
                    checked={formData.ageGroupChildren.includes('7-12')}
                    onCheckedChange={(c) => handleCheckboxChange('7-12', !!c, 'ageGroupChildren')}
                  />
                  <span className="text-sm">7 – 12</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox 
                    checked={formData.ageGroupChildren.includes('13-17')}
                    onCheckedChange={(c) => handleCheckboxChange('13-17', !!c, 'ageGroupChildren')}
                  />
                  <span className="text-sm">13 – 17</span>
                </label>
              </div>
            </div>
          </div>

          {/* Duration & Accommodation */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('tourDuration')}</label>
              <Input name="tourDuration" placeholder={t('daysOrHours')} value={formData.tourDuration} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">{t('preferredAccommodation')}</label>
              <Select value={formData.accommodation} onValueChange={(v) => setFormData(prev => ({ ...prev, accommodation: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="3star">3 Star</SelectItem>
                  <SelectItem value="4star">4 Star</SelectItem>
                  <SelectItem value="5star">5 Star Luxury</SelectItem>
                  <SelectItem value="boutique">Boutique Hotels</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-3">{t('yourInterests')}</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interests.map(interest => (
                <label key={interest.id} className="flex items-center gap-2">
                  <Checkbox 
                    checked={formData.interests.includes(interest.id)}
                    onCheckedChange={(c) => handleCheckboxChange(interest.id, !!c, 'interests')}
                  />
                  <span className="text-sm">{interest.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">{t('questionsComments')}</label>
            <Textarea 
              name="comments" 
              value={formData.comments} 
              onChange={handleInputChange}
              rows={4}
              placeholder={t('tellUsMore')}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {t('submitRequest')}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TailorMadeModal;
