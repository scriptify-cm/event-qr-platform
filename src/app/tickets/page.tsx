"use client";

import { PageLayout } from "@/app/page-layout";
import { LanguageContext } from "@/components/layout/providers";
import { Translate } from "@/components/shared/translate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarDays,
  Eye,
  EyeOff,
  MapPin,
  TicketIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { QRCode } from "react-qr-code";
import { toast } from "sonner";

// Mock data for tickets
const MOCK_TICKETS = [
  {
    id: "ticket-1",
    eventName: "Summer Festival 2025",
    ticketType: "VIP",
    date: "July 15-17, 2025",
    location: "Sunshine Park, Miami",
    price: 149.99,
    status: "valid",
    qrData: "EVENT:SF2025;TICKET:VIP;ID:123456;HASH:a1b2c3d4e5f6",
  },
  {
    id: "ticket-2",
    eventName: "Summer Festival 2025",
    ticketType: "Simple",
    date: "July 15-17, 2025",
    location: "Sunshine Park, Miami",
    price: 49.99,
    status: "valid",
    qrData: "EVENT:SF2025;TICKET:SIMPLE;ID:654321;HASH:f6e5d4c3b2a1",
  },
];

interface ProtectedQRCodeProps {
  value: string;
  size?: number;
  isVisible: boolean;
  className?: string;
}

// Component for protected QR code
function ProtectedQRCode({
  value,
  size = 200,
  isVisible,
  className,
}: ProtectedQRCodeProps) {
  // Apply anti-screenshot/copy protection techniques
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);

    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Apply CSS protection and event listeners
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Anti-copy/screenshot CSS
  const protectionStyles = {
    position: "relative" as const,
    // We add a slight animation to make screenshots harder
    animation: "pulse 2s infinite",
  };

  if (!isClientReady) {
    return (
      <div className="w-full aspect-square bg-muted animate-pulse rounded-lg" />
    );
  }

  return (
    <div
      style={protectionStyles}
      className={`relative ${className} overflow-hidden rounded-lg`}
    >
      {isVisible ? (
        <QRCode
          value={value}
          size={size}
          className="animate-pulse-light"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full aspect-square bg-muted/60 rounded-lg">
          <EyeOff className="w-16 h-16 text-muted-foreground opacity-70" />
        </div>
      )}

      {/* Visual indicators for security */}
      <div className="absolute bottom-2 right-2">
        <Badge
          variant="outline"
          className="bg-background/80 text-xs font-mono animate-pulse"
        >
          <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
          SECURE
        </Badge>
      </div>
    </div>
  );
}

interface TicketCardProps {
  ticket: (typeof MOCK_TICKETS)[0];
  language: string;
}

// Component for a ticket card
function TicketCard({ ticket, language }: TicketCardProps) {
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const toggleQRVisibility = () => {
    if (!isQRVisible) {
      setShowWarning(true);
      // Auto-hide QR code after 30 seconds
      setTimeout(() => {
        setIsQRVisible(false);
        toast.info(
          language === "en"
            ? "QR code hidden for security"
            : "Code QR masqué pour des raisons de sécurité",
        );
      }, 30000);
    } else {
      setShowWarning(false);
    }
    setIsQRVisible(!isQRVisible);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "used":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "expired":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid":
        return language === "en" ? "Valid" : "Valide";
      case "used":
        return language === "en" ? "Used" : "Utilisé";
      case "expired":
        return language === "en" ? "Expired" : "Expiré";
      default:
        return status;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            {ticket.eventName}
          </CardTitle>
          <Badge className={`${getStatusColor(ticket.status)}`}>
            {getStatusText(ticket.status)}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 mt-1 flex-wrap">
          <div className="flex items-center gap-1">
            <TicketIcon className="h-4 w-4 text-primary" />
            <span>{ticket.ticketType}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span>{ticket.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{ticket.location}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <p className="text-muted-foreground">
                  <Translate text="qrCodeProtected" />
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center p-4">
          <ProtectedQRCode
            value={ticket.qrData}
            isVisible={isQRVisible}
            className="max-w-[200px] w-full"
          />
        </div>

        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={toggleQRVisibility}
            className="rounded-full"
          >
            {isQRVisible ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                {language === "en" ? "Hide QR Code" : "Masquer le Code QR"}
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                {language === "en" ? "Show QR Code" : "Afficher le Code QR"}
              </>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="pt-1 pb-4 flex justify-between text-sm text-muted-foreground">
        <div>ID: {ticket.id.slice(-6)}</div>
        <div>
          {new Intl.NumberFormat(language === "en" ? "en-US" : "fr-FR", {
            style: "currency",
            currency: "USD",
          }).format(ticket.price)}
        </div>
      </CardFooter>
    </Card>
  );
}

export default function TicketsPage() {
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  const [hasTickets, setHasTickets] = useState<boolean | null>(null);

  useEffect(() => {
    // Simulate checking if user has tickets
    setTimeout(() => {
      setHasTickets(MOCK_TICKETS.length > 0);
    }, 1000);
  }, []);

  if (hasTickets === null) {
    return (
      <PageLayout>
        <div className="container py-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-medium">
              {language === "en"
                ? "Loading your tickets..."
                : "Chargement de vos billets..."}
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (hasTickets === false) {
    return (
      <PageLayout>
        <div className="container py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-4">
                <TicketIcon className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {language === "en" ? "No Tickets Found" : "Aucun Billet Trouvé"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {language === "en"
                ? "You don't have any tickets yet. Book your tickets now to access the event."
                : "Vous n'avez pas encore de billets. Réservez vos billets maintenant pour accéder à l'événement."}
            </p>
            <Button asChild className="rounded-full">
              <Link href="/reservations">
                <Translate text="bookNow" />
              </Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                <Translate text="myTickets" />
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "en"
                  ? "View and manage your event tickets"
                  : "Voir et gérer vos billets d'événement"}
              </p>
            </div>
            <Button asChild className="rounded-full">
              <Link href="/reservations">
                <Translate text="bookNow" />
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="active">
                {language === "en" ? "Active" : "Actifs"}
              </TabsTrigger>
              <TabsTrigger value="used">
                {language === "en" ? "Used" : "Utilisés"}
              </TabsTrigger>
              <TabsTrigger value="all">
                {language === "en" ? "All" : "Tous"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="grid md:grid-cols-2 gap-6">
                {MOCK_TICKETS.filter((ticket) => ticket.status === "valid").map(
                  (ticket) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TicketCard ticket={ticket} language={language} />
                    </motion.div>
                  ),
                )}
              </div>
            </TabsContent>

            <TabsContent value="used">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {language === "en"
                    ? "You don't have any used tickets yet."
                    : "Vous n'avez pas encore de billets utilisés."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 gap-6">
                {MOCK_TICKETS.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TicketCard ticket={ticket} language={language} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}
