"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import Toast, { useToast } from "@/components/ui/Toast";
import { contactSchema, type ContactFormData } from "@/lib/validators";
import { useMessages } from "@/hooks/useMessages";
import { RESTAURANT } from "@/lib/constants";

export default function ContactPage() {
  const { addMessage } = useMessages();
  const { toast, showToast, hideToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: "general" },
  });

  const onSubmit = (data: ContactFormData) => {
    addMessage({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      type: data.type,
    });
    reset();
    showToast("Thank you! Your message has been received. We'll be in touch soon.", "success");
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1920&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover opacity-15" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
        </div>
        <div className="relative z-10 container-site text-center">
          <AnimatedSection><SectionLabel>Get in Touch</SectionLabel></AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl font-light italic text-cream mt-3 mb-4">Contact Us</h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
              <span className="text-gold/60 text-xs">◆</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-obsidian">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Info panel */}
            <div className="flex flex-col gap-8">
              <AnimatedSection direction="left">
                <div>
                  <SectionLabel align="left">Visit Us</SectionLabel>
                  <h2 className="font-serif text-3xl font-light italic text-cream mt-2 mb-4">Find Zaragoza</h2>
                  <GoldDivider slim className="max-w-xs" />
                </div>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={0.1}>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-charcoal/50 border border-ash">
                    <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-xs tracking-widest uppercase text-mist/60 mb-1">Address</p>
                      <p className="font-sans text-sm text-cream">{RESTAURANT.address.street}</p>
                      <p className="font-sans text-sm text-cream">{RESTAURANT.address.city}, {RESTAURANT.address.state} {RESTAURANT.address.zip}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-charcoal/50 border border-ash">
                    <Phone size={18} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-xs tracking-widest uppercase text-mist/60 mb-1">Phone</p>
                      <a href={`tel:${RESTAURANT.contact.phoneRaw}`} className="font-sans text-sm text-cream hover:text-gold transition-colors">
                        {RESTAURANT.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-charcoal/50 border border-ash">
                    <Mail size={18} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-xs tracking-widest uppercase text-mist/60 mb-1">Email</p>
                      <a href={`mailto:${RESTAURANT.contact.generalEmail}`} className="font-sans text-sm text-cream hover:text-gold transition-colors break-all">
                        {RESTAURANT.contact.generalEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-charcoal/50 border border-ash">
                    <Clock size={18} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-xs tracking-widest uppercase text-mist/60 mb-2">Hours</p>
                      <div className="flex flex-col gap-1">
                        {RESTAURANT.hours.map((h) => (
                          <div key={h.day} className="flex justify-between gap-6 font-sans text-sm">
                            <span className="text-mist">{h.day}</span>
                            <span className={h.open ? "text-cream" : "text-stone"}>
                              {h.open ? `${h.open} – ${h.close}` : "Closed"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Map placeholder */}
              <AnimatedSection direction="left" delay={0.2}>
                <div className="rounded-lg overflow-hidden h-48 bg-ash border border-slate flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={28} className="text-gold/40 mx-auto mb-2" />
                    <p className="font-sans text-xs text-mist">Map will load with actual address</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact form */}
            <AnimatedSection direction="right">
              <div className="flex flex-col gap-6">
                <div>
                  <SectionLabel align="left">Send a Message</SectionLabel>
                  <h2 className="font-serif text-3xl font-light italic text-cream mt-2 mb-4">How Can We Help?</h2>
                  <GoldDivider slim className="max-w-xs" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Your Name" required placeholder="Elena García" error={errors.name?.message} {...register("name")} />
                    <FormField label="Email Address" required type="email" placeholder="elena@example.com" error={errors.email?.message} {...register("email")} />
                  </div>

                  <FormField label="Phone (optional)" type="tel" placeholder="(216) 555-0100" error={errors.phone?.message} {...register("phone")} />

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs tracking-wider uppercase text-cream-dark/70">Enquiry Type</label>
                    <select {...register("type")} className="input-base">
                      <option value="general">General Enquiry</option>
                      <option value="event-inquiry">Event Enquiry</option>
                      <option value="private-dining">Private Dining</option>
                      <option value="feedback">Feedback</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <FormField label="Subject" required placeholder="How can we help?" error={errors.subject?.message} {...register("subject")} />

                  <FormField label="Message" required as="textarea" rows={5} placeholder="Tell us more..." error={errors.message?.message} {...register("message")} />

                  <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                    Send Message
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
    </main>
  );
}
