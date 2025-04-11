"use client";

import { PageLayout } from "./page-layout";
import { Button } from "@/components/ui/button";
import { Translate } from "@/components/shared/translate";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "@/components/layout/providers";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Lock, QrCode, Ticket } from "lucide-react";

export default function Home() {
  const { language } = useContext(LanguageContext);

  const eventInfo = {
    name: language === 'en' ? "Summer Festival 2025" : "Festival d'Été 2025",
    date: language === 'en' ? "July 15-17, 2025" : "15-17 Juillet 2025",
    location: language === 'en' ? "Sunshine Park, Miami" : "Parc Sunshine, Miami",
    description: language === 'en'
      ? "The most anticipated music and arts festival of the summer. Join us for three days of amazing performances, art installations, and unforgettable experiences."
      : "Le festival de musique et d'arts le plus attendu de l'été. Rejoignez-nous pour trois jours de performances incroyables, d'installations artistiques et d'expériences inoubliables."
  };

  const features = [
    {
      id: "secure-qr",
      icon: <QrCode className="h-10 w-10 text-primary" />,
      title: language === 'en' ? "Secure QR Tickets" : "Billets QR Sécurisés",
      description: language === 'en'
        ? "Our tickets use advanced QR technology that prevents copying and screenshots."
        : "Nos billets utilisent une technologie QR avancée qui empêche la copie et les captures d'écran."
    },
    {
      id: "easy-reservations",
      icon: <Ticket className="h-10 w-10 text-primary" />,
      title: language === 'en' ? "Easy Reservations" : "Réservations Faciles",
      description: language === 'en'
        ? "Book your tickets in seconds with our streamlined reservation process."
        : "Réservez vos billets en quelques secondes grâce à notre processus de réservation simplifié."
    },
    {
      id: "event-management",
      icon: <CalendarDays className="h-10 w-10 text-primary" />,
      title: language === 'en' ? "Event Management" : "Gestion d'Événements",
      description: language === 'en'
        ? "Organizers can easily manage entries and validate tickets with our app."
        : "Les organisateurs peuvent facilement gérer les entrées et valider les billets avec notre application."
    },
    {
      id: "otp-auth",
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: language === 'en' ? "OTP Authentication" : "Authentification OTP",
      description: language === 'en'
        ? "Secure login with one-time passwords sent directly to your phone."
        : "Connexion sécurisée avec des mots de passe à usage unique envoyés directement sur votre téléphone."
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-700">
                  {eventInfo.name}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mt-4">
                  {eventInfo.description}
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col md:flex-row gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full">
                  <Link href="/reservations">
                    <Translate text="bookNow" />
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/tickets">
                    <Translate text="myTickets" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                className="mt-4 flex items-center gap-4 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>{eventInfo.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{eventInfo.location}</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img
                alt="Event Hero"
                className="aspect-video object-cover w-full rounded-xl"
                src="https://source.unsplash.com/random/800x450/?festival,concert"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              <Translate text={language === 'en' ? "Why Choose Us?" : "Pourquoi Nous Choisir?"} />
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              <Translate text={language === 'en' ? "Our platform offers the best experience for event attendees and organizers" : "Notre plateforme offre la meilleure expérience pour les participants et les organisateurs d'événements"} />
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/20 via-background to-background">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <Translate text={language === 'en' ? "Ready to Join the Event?" : "Prêt à Rejoindre l'Événement?"} />
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              <Translate text={language === 'en' ? "Secure your ticket now and be part of this amazing experience" : "Réservez votre billet maintenant et faites partie de cette expérience incroyable"} />
            </p>
            <div className="mt-6">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full">
                <Link href="/reservations">
                  <Translate text="bookNow" />
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
