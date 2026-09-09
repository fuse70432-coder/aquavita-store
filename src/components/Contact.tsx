import { useState, type FormEvent } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useStoreSettings } from '@/store/StoreSettingsContext';

export function Contact() {
  const { settings } = useStoreSettings();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative border-t border-accent/10 bg-obsidian-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-14 text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
              Get in Touch
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent" />
          </div>
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">
            CONTACT <span className="text-gradient-brand">US</span>
          </h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-sm border border-accent/20 bg-obsidian-800/60 px-4 py-3 text-sm text-offwhite placeholder-muted/60 outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full rounded-sm border border-accent/20 bg-obsidian-800/60 px-4 py-3 text-sm text-offwhite placeholder-muted/60 outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    placeholder="Your phone"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-sm border border-accent/20 bg-obsidian-800/60 px-4 py-3 text-sm text-offwhite placeholder-muted/60 outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full resize-none rounded-sm border border-accent/20 bg-obsidian-800/60 px-4 py-3 text-sm text-offwhite placeholder-muted/60 outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-accent to-accent2 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                Send Message
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              {submitted && (
                <p className="rounded-sm border border-accent/30 bg-accent/10 px-4 py-3 text-center text-sm text-accent-light">
                  Thank you! Your message has been sent.
                </p>
              )}
            </form>
          </Reveal>

          {/* Contact info */}
          <Reveal delay={2}>
            <div className="flex h-full flex-col justify-between rounded-sm border border-accent/20 bg-obsidian-800/40 p-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-offwhite">Connect With Us</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Have questions about your order or a product? We're here to help
                  you get the most out of your ZORVEX shopping experience.
                </p>

                <div className="mt-8 space-y-5">
                  <a href="tel:7559955088" className="group flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/25 transition-all group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                      <Phone className="h-5 w-5 text-accent-light" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-muted">Phone</span>
                      <span className="text-sm font-semibold text-offwhite">7559955088</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/25">
                      <Mail className="h-5 w-5 text-accent-light" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-muted">Email</span>
                      <span className="text-sm font-semibold text-offwhite">info@zorvex.com</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/25">
                      <MapPin className="h-5 w-5 text-accent-light" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-muted">Location</span>
                      <span className="text-sm font-semibold text-offwhite">Available Worldwide</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-8 border-t border-accent/10 pt-6">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Follow Us
                </span>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, label: 'Instagram', href: settings?.instagram_url || '' },
                    { icon: Facebook, label: 'Facebook', href: settings?.facebook_url || '' },
                    { icon: MessageCircle, label: 'WhatsApp', href: settings?.whatsapp_url || '' },
                  ].map((social) => (
                    social.href ? (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-sm border border-accent/25 text-accent-light transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                      >
                        <social.icon className="h-5 w-5" strokeWidth={1.5} />
                      </a>
                    ) : null
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
