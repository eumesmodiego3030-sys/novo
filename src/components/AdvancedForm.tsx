import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { AnimatedInput } from './AnimatedInput';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';
import { sendContactEmail } from '@/services/email';
import { trackFormSubmission } from '@/services/sentry';

interface FormField {
  name: string;
  type: 'text' | 'email' | 'phone' | 'textarea';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => boolean | string;
}

interface AdvancedFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel?: string;
  title?: string;
  description?: string;
}

export const AdvancedForm = ({
  fields,
  onSubmit,
  submitLabel = 'Send',
  title,
  description,
}: AdvancedFormProps) => {
  const formRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(f => [f.name, '']))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: FormField, value: string): string | null => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        return 'Please enter a valid email';
      }
    }

    if (field.type === 'phone') {
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      if (value && !phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
    }

    if (field.validation) {
      const result = field.validation(value);
      if (result !== true && typeof result === 'string') {
        return result;
      }
    }

    return null;
  };

  const getFieldIcon = (fieldType: string) => {
    switch (fieldType) {
      case 'email':
        return <Mail size={18} />;
      case 'phone':
        return <Phone size={18} />;
      case 'textarea':
        return <MessageSquare size={18} />;
      default:
        return <User size={18} />;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const field = fields.find(f => f.name === name);
    if (field) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [name]: error || '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    try {
      setIsSubmitting(true);

      // Enviar email se as informações de contato estiverem disponíveis
      const enableEmail = import.meta.env.VITE_ENABLE_EMAIL !== 'false';
      if (enableEmail && formData.email && formData.name) {
        const emailResult = await sendContactEmail({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message || 'Contact form submission',
        });

        if (!emailResult.success) {
          console.warn('Email sending failed:', emailResult.error);
          // Não falhar o submit se email falhar
        }
      }

      // Chamar callback customizado
      await onSubmit(formData);

      // Rastrear submissão bem-sucedida
      trackFormSubmission('contact', true);

      toast.success('Message sent successfully!');
      setFormData(Object.fromEntries(fields.map(f => [f.name, ''])));
      setErrors({});
    } catch (error) {
      trackFormSubmission('contact', false);
      toast.error('Failed to send message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {title && <h3 className="text-2xl font-heading font-semibold">{title}</h3>}
      {description && <p className="text-muted-foreground">{description}</p>}

      {fields.map((field) => {
        const hasError = !!errors[field.name];
        const isValid = formData[field.name] && !hasError;

        return (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {field.type === 'textarea' ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  {field.label}
                  {field.required && <span className="text-primary ml-1">*</span>}
                </label>
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormData(prev => ({ ...prev, [name]: value }));
                    const error = validateField(field, value);
                    setErrors(prev => ({
                      ...prev,
                      [name]: error || '',
                    }));
                  }}
                  placeholder={field.placeholder}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none ${
                    hasError
                      ? 'border-red-500 focus:border-red-500'
                      : isValid
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-foreground/20 focus:border-primary'
                  }`}
                />
                {hasError && (
                  <p className="text-sm text-red-500">{errors[field.name]}</p>
                )}
              </div>
            ) : (
              <AnimatedInput
                ref={(el) => {
                  if (el) formRefs.current[field.name] = el;
                }}
                type={field.type}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                icon={getFieldIcon(field.type)}
                error={hasError ? errors[field.name] : undefined}
                success={isValid}
                validation={field.validation ? (val) => field.validation?.(val) === true : undefined}
                required={field.required}
              />
            )}
          </motion.div>
        );
      })}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary-luxury w-full mt-8 disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? 'Sending...' : submitLabel}
      </motion.button>
    </form>
  );
};
