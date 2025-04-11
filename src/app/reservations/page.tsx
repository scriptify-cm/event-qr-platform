"use client";

import { PageLayout } from "@/app/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Translate } from "@/components/shared/translate";
import { useContext, useState } from "react";
import { LanguageContext } from "@/components/layout/providers";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Loader2, MapPin, Plus, Minus, TicketIcon, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export default function ReservationsPage() {
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<TicketType[]>([
    {
      id: "simple",
      name: language === "en" ? "Simple Ticket" : "Billet Simple",
      description: language === "en" ? "Standard entry, access to all common areas" : "Entrée standard, accès à toutes les zones communes",
      price: 49.99,
      quantity: 0,
    },
    {
      id: "couple",
      name: language === "en" ? "Couple Ticket" : "Billet Couple",
      description: language === "en" ? "Entry for two people, 15% discount" : "Entrée pour deux personnes, réduction de 15%",
      price: 84.99,
      quantity: 0,
    },
    {
      id: "vip",
      name: language === "en" ? "VIP Ticket" : "Billet VIP",
      description: language === "en" ? "Premium access, VIP lounge, complimentary drinks" : "Accès premium, salon VIP, boissons gratuites",
      price: 149.99,
      quantity: 0,
    },
    {
      id: "vvip",
      name: language === "en" ? "VVIP Experience" : "Expérience VVIP",
      description: language === "en" ? "Ultimate experience, backstage access, meet & greet" : "Expérience ultime, accès backstage, rencontre avec les artistes",
      price: 299.99,
      quantity: 0,
    },
  ]);

  const eventInfo = {
    name: language === 'en' ? "Summer Festival 2025" : "Festival d'Été 2025",
    date: language === 'en' ? "July 15-17, 2025" : "15-17 Juillet 2025",
    location: language === 'en' ? "Sunshine Park, Miami" : "Parc Sunshine, Miami",
  };

  const form = useForm<ContactFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: ""
    },
  });

  const calculateTotal = () => {
    return tickets.reduce((total, ticket) => total + (ticket.price * ticket.quantity), 0);
  };

  const updateTicketQuantity = (id: string, amount: number) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === id ? { ...ticket, quantity: Math.max(0, ticket.quantity + amount) } : ticket
      )
    );
  };

  const hasTickets = tickets.some(t => t.quantity > 0);

  const onSubmit = async (data: ContactFormData) => {
    // Check if user has selected any tickets
    if (!hasTickets) {
      toast.error(
        language === "en"
          ? "Please select at least one ticket"
          : "Veuillez sélectionner au moins un billet"
      );
      return;
    }

    setIsLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, this would create a reservation
    toast.success(
      language === "en"
        ? "Reservation successful! Proceeding to payment..."
        : "Réservation réussie ! Redirection vers le paiement..."
    );
    setIsLoading(false);

    // Redirect to payment page (in a real app)
    router.push("/payment");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "en" ? "en-US" : "fr-FR", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <PageLayout>
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
              {language === "en" ? "Book Your Tickets" : "Réservez Vos Billets"}
            </h1>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Select your ticket type and quantity"
                : "Sélectionnez votre type de billet et la quantité"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Event Information */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {eventInfo.name}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1 mt-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <span>{eventInfo.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{eventInfo.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://source.unsplash.com/random/300x200/?festival,concert"
                    alt="Event"
                    className="rounded-md object-cover w-full h-40"
                  />
                  <div className="mt-4">
                    <h3 className="font-medium">
                      {language === "en" ? "Important Information" : "Informations Importantes"}
                    </h3>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-2">
                      <li>• {language === "en" ? "Tickets are non-refundable" : "Les billets ne sont pas remboursables"}</li>
                      <li>• {language === "en" ? "Valid ID required at entry" : "Pièce d'identité valide requise à l'entrée"}</li>
                      <li>• {language === "en" ? "Event is rain or shine" : "L'événement a lieu par tous les temps"}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ticket Selection and Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <TicketIcon className="inline-block mr-2 h-5 w-5 text-primary" />
                    {language === "en" ? "Select Tickets" : "Sélectionner les Billets"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-medium">{ticket.name}</h3>
                            {ticket.id === "vip" && (
                              <Badge className="ml-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-black">VIP</Badge>
                            )}
                            {ticket.id === "vvip" && (
                              <Badge className="ml-2 bg-gradient-to-r from-purple-600 to-indigo-600">VVIP</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
                          <p className="text-primary font-medium mt-1">{formatCurrency(ticket.price)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-8 w-8"
                            onClick={() => updateTicketQuantity(ticket.id, -1)}
                            disabled={ticket.quantity === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">{ticket.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-8 w-8"
                            onClick={() => updateTicketQuantity(ticket.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>
                        {language === "en" ? "Subtotal" : "Sous-total"}
                      </span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>
                        {language === "en" ? "Service Fee" : "Frais de service"}
                      </span>
                      <span>{formatCurrency(calculateTotal() * 0.05)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>
                        {language === "en" ? "Total" : "Total"}
                      </span>
                      <span>{formatCurrency(calculateTotal() * 1.05)}</span>
                    </div>
                  </div>

                  {/* Contact Information Form */}
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">
                      {language === "en" ? "Contact Information" : "Informations de Contact"}
                    </h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {language === "en" ? "Full Name" : "Nom Complet"}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={language === "en" ? "Enter your full name" : "Entrez votre nom complet"} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Translate text="phoneNumber" />
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="+1 123 456 7890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full mt-4 rounded-full"
                          disabled={isLoading || !hasTickets}
                          size="lg"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <CreditCard className="h-4 w-4 mr-2" />
                          )}
                          {language === "en" ? "Proceed to Payment" : "Procéder au Paiement"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </Form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
