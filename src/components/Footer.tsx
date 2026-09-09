import { Sparkles, Instagram, Facebook, MessageCircle, Phone, Mail, MapPin, Truck, PackageCheck, RotateCcw, Info, Shield, FileText, Headset } from 'lucide-react';
import { useStoreSettings } from '@/store/StoreSettingsContext';

const ORDER_LINKS = [
  { label: 'Shipping & Delivery', icon: Truck, href: '#contact' },
  { label: 'Order Tracking', icon: PackageCheck, href: '#contact' },
  { label: 'Returns & Refunds', icon: RotateCcw, href: '#contact' },
];

const INFO_LINKS = [
  { label: 'About ZORVEX', icon: Info, href: '#home' },
  { label: 'Privacy Policy', icon: Shield, href: '#contact' },
  { label: 'Terms & Conditions', icon: FileText, href: '#contact' },
];

export function Footer() {
  const { settings } = useStoreSettings();

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socials = [
    { icon: Instagram, label: 'Instagram', url: settings?.instagram_url || '' },
    { icon: Facebook, label: 'Facebook', url: settings?.facebook_url || '' },
    { icon: MessageCircle, label: 'WhatsApp', url: settings?.whatsapp_url || '' },
  ];

  return (
    <footer className="relative border-t border-accent/15 bg-obsidian-950">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-6">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-obsidian-800/80">
                <Sparkles className="h-4 w-4 text-accent-light" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-[0.18em] text-offwhite">ZORVEX</span>
                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-accent-light/80">Shop More. Live Better.</span>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Your premium multi-category shopping destination. Quality products, fast delivery, and a seamless experience.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                social.url ? (
                  <a
                    key={social.label}
                    href={social.url}
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

          {/* Order Information */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              Order Information
            </h4>
            <ul className="space-y-3">
              {ORDER_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-offwhite"
                  >
                    <link.icon className="h-4 w-4 text-accent-light/70" strokeWidth={1.5} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              Information
            </h4>
            <ul className="space-y-3">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-offwhite"
                  >
                    <link.icon className="h-4 w-4 text-accent-light/70" strokeWidth={1.5} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <Headset className="h-4 w-4 text-accent-light/70" strokeWidth={1.5} />
                <span>Customer Support</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent-light/70" strokeWidth={1.5} />
                <a href="tel:7559955088" className="transition-colors hover:text-offwhite">7559955088</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent-light/70" strokeWidth={1.5} />
                <span>info@zorvex.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-accent-light/70" strokeWidth={1.5} />
                <span>Available Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted">© 2026 ZORVEX. All rights reserved.</p>
          <p className="text-xs text-muted">Shop More. Live Better.</p>
        </div>
      </div>
    </footer>
  );
}
