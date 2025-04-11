"use client";

import { PageLayout } from "@/app/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Translate } from "@/components/shared/translate";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "@/components/layout/providers";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, QrCode, Search, Send, Ticket, User, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Mock data for demo
const MOCK_RESERVATIONS = [
  {
    id: "res-123456",
    clientName: "Alice Johnson",
    phoneNumber: "+1234567890",
    ticketType: "VIP",
    status: "validated",
    validatedAt: "2025-07-15T18:30:00",
    validatedBy: "Manager001",
  },
  {
    id: "res-654321",
    clientName: "Bob Smith",
    phoneNumber: "+0987654321",
    ticketType: "Simple",
    status: "pending",
  },
  {
    id: "res-246810",
    clientName: "Charlie Davis",
    phoneNumber: "+1122334455",
    ticketType: "Couple",
    status: "pending",
  },
  {
    id: "res-135791",
    clientName: "Diana Ross",
    phoneNumber: "+5566778899",
    ticketType: "VVIP",
    status: "cancelled",
  },
];

export default function ManagerDashboard() {
  const { language } = useContext(LanguageContext);
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scanResult, setScanResult] = useState<null | {
    success: boolean;
    message: string;
    reservationData?: typeof MOCK_RESERVATIONS[0]
  }>(null);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [currentReservation, setCurrentReservation] = useState<typeof MOCK_RESERVATIONS[0] | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // Filter reservations based on search query
  const filteredReservations = MOCK_RESERVATIONS.filter(res => {
    const query = searchQuery.toLowerCase();
    return (
      res.id.toLowerCase().includes(query) ||
      res.clientName.toLowerCase().includes(query) ||
      res.phoneNumber.includes(query) ||
      res.ticketType.toLowerCase().includes(query) ||
      res.status.toLowerCase().includes(query)
    );
  });

  // Simulate QR code scanning
  const handleScan = () => {
    setScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      // Randomly choose success or failure for demo
      const success = Math.random() > 0.3;

      if (success) {
        // Randomly select a pending reservation
        const pendingReservations = MOCK_RESERVATIONS.filter(res => res.status === "pending");
        if (pendingReservations.length > 0) {
          const reservation = pendingReservations[Math.floor(Math.random() * pendingReservations.length)];
          setScanResult({
            success: true,
            message: language === "en" ? "Valid ticket found!" : "Billet valide trouvé !",
            reservationData: reservation
          });
        } else {
          setScanResult({
            success: true,
            message: language === "en" ? "Valid ticket found!" : "Billet valide trouvé !",
            reservationData: MOCK_RESERVATIONS[1] // Fallback
          });
        }
      } else {
        setScanResult({
          success: false,
          message: language === "en" ? "Invalid or used ticket!" : "Billet invalide ou déjà utilisé !"
        });
      }

      setScanning(false);
      setShowScanner(false);
    }, 2000);
  };

  // Handle sending OTP
  const handleSendOtp = (reservation: typeof MOCK_RESERVATIONS[0]) => {
    setCurrentReservation(reservation);
    setShowOtpDialog(true);
  };

  const sendOtp = () => {
    if (!currentReservation) return;

    // Simulate API call to send OTP
    toast.success(
      language === "en"
        ? `OTP sent to ${currentReservation.phoneNumber}`
        : `OTP envoyé à ${currentReservation.phoneNumber}`
    );
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (!otpValue) {
      toast.error(
        language === "en"
          ? "Please enter the OTP code"
          : "Veuillez entrer le code OTP"
      );
      return;
    }

    setVerifyingOtp(true);

    // Simulate verification
    setTimeout(() => {
      // Demo: 123456 is always valid
      const isValid = otpValue === "123456";

      if (isValid) {
        toast.success(
          language === "en"
            ? "OTP verified successfully! Ticket validated."
            : "OTP vérifié avec succès ! Billet validé."
        );
        // Close dialog and reset
        setShowOtpDialog(false);
        setOtpSent(false);
        setOtpValue("");
        setCurrentReservation(null);
      } else {
        toast.error(
          language === "en"
            ? "Invalid OTP code. Please try again."
            : "Code OTP invalide. Veuillez réessayer."
        );
      }

      setVerifyingOtp(false);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validated":
        return (
          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {language === "en" ? "Validated" : "Validé"}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
            <AlertCircle className="h-3 w-3 mr-1" />
            {language === "en" ? "Pending" : "En attente"}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
            <XCircle className="h-3 w-3 mr-1" />
            {language === "en" ? "Cancelled" : "Annulé"}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {language === "en" ? "Manager Dashboard" : "Tableau de Bord Manager"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "en"
                  ? "Manage tickets, validate entries and track attendance"
                  : "Gérer les billets, valider les entrées et suivre la participation"
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => setShowScanner(true)} className="gap-2">
                <QrCode className="h-4 w-4" />
                {language === "en" ? "Scan QR Code" : "Scanner Code QR"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="all">
                {language === "en" ? "All Reservations" : "Toutes les Réservations"}
              </TabsTrigger>
              <TabsTrigger value="pending">
                {language === "en" ? "Pending" : "En Attente"}
              </TabsTrigger>
              <TabsTrigger value="validated">
                {language === "en" ? "Validated" : "Validés"}
              </TabsTrigger>
            </TabsList>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === "en" ? "Search reservations..." : "Rechercher des réservations..."}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="all">
              <div className="space-y-4">
                {filteredReservations.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      {language === "en"
                        ? "No reservations found. Try a different search."
                        : "Aucune réservation trouvée. Essayez une recherche différente."
                      }
                    </p>
                  </div>
                ) : (
                  filteredReservations.map((reservation) => (
                    <ReservationCard
                      key={reservation.id}
                      reservation={reservation}
                      language={language}
                      getStatusBadge={getStatusBadge}
                      onSendOtp={handleSendOtp}
                    />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="space-y-4">
                {filteredReservations.filter(r => r.status === "pending").length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      {language === "en"
                        ? "No pending reservations found."
                        : "Aucune réservation en attente trouvée."
                      }
                    </p>
                  </div>
                ) : (
                  filteredReservations
                    .filter(r => r.status === "pending")
                    .map((reservation) => (
                      <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                        language={language}
                        getStatusBadge={getStatusBadge}
                        onSendOtp={handleSendOtp}
                      />
                    ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="validated">
              <div className="space-y-4">
                {filteredReservations.filter(r => r.status === "validated").length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      {language === "en"
                        ? "No validated reservations found."
                        : "Aucune réservation validée trouvée."
                      }
                    </p>
                  </div>
                ) : (
                  filteredReservations
                    .filter(r => r.status === "validated")
                    .map((reservation) => (
                      <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                        language={language}
                        getStatusBadge={getStatusBadge}
                        onSendOtp={handleSendOtp}
                      />
                    ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* QR Scanner Dialog */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Scan QR Code" : "Scanner le Code QR"}
            </DialogTitle>
            <DialogDescription>
              {language === "en"
                ? "Position the QR code within the frame to scan"
                : "Positionnez le code QR dans le cadre pour le scanner"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 flex flex-col items-center justify-center">
            {scanning ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p>{language === "en" ? "Scanning..." : "Scan en cours..."}</p>
              </div>
            ) : (
              <>
                <div className="w-64 h-64 bg-muted rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-primary/50">
                  <QrCode className="h-16 w-16 text-muted-foreground opacity-40" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "en"
                    ? "This is a demo. In a real app, this would access your camera to scan QR codes."
                    : "Ceci est une démo. Dans une application réelle, cela accéderait à votre caméra pour scanner les codes QR."
                  }
                </p>
              </>
            )}
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowScanner(false)}
              disabled={scanning}
            >
              {language === "en" ? "Cancel" : "Annuler"}
            </Button>
            <Button
              onClick={handleScan}
              disabled={scanning}
              className="gap-2"
            >
              {scanning ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <QrCode className="h-4 w-4" />
              )}
              {language === "en" ? "Simulate Scan" : "Simuler le Scan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scan Result Dialog */}
      <Dialog open={!!scanResult} onOpenChange={() => setScanResult(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className={scanResult?.success ? "text-green-600" : "text-red-600"}>
              {scanResult?.success
                ? (language === "en" ? "Valid Ticket" : "Billet Valide")
                : (language === "en" ? "Invalid Ticket" : "Billet Invalide")
              }
            </DialogTitle>
            <DialogDescription>
              {scanResult?.message}
            </DialogDescription>
          </DialogHeader>

          {scanResult?.success && scanResult.reservationData && (
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{language === "en" ? "Client" : "Client"}</span>
                  <span>{scanResult.reservationData.clientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{language === "en" ? "Ticket Type" : "Type de Billet"}</span>
                  <span>{scanResult.reservationData.ticketType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{language === "en" ? "Status" : "Statut"}</span>
                  {getStatusBadge(scanResult.reservationData.status)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{language === "en" ? "Reservation ID" : "ID de Réservation"}</span>
                  <span className="font-mono text-sm">{scanResult.reservationData.id}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => setScanResult(null)}
            >
              {language === "en" ? "Close" : "Fermer"}
            </Button>
            {scanResult?.success && scanResult.reservationData && scanResult.reservationData.status === "pending" && (
              <Button
                onClick={() => {
                  toast.success(
                    language === "en"
                      ? "Ticket validated successfully!"
                      : "Billet validé avec succès !"
                  );
                  setScanResult(null);
                }}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                {language === "en" ? "Validate Entry" : "Valider l'Entrée"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OTP Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setShowOtpDialog(false);
          setOtpSent(false);
          setOtpValue("");
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "OTP Verification" : "Vérification OTP"}
            </DialogTitle>
            <DialogDescription>
              {language === "en"
                ? "Send an OTP code to the client's phone"
                : "Envoyer un code OTP au téléphone du client"
              }
            </DialogDescription>
          </DialogHeader>

          {currentReservation && (
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{language === "en" ? "Client" : "Client"}</span>
                  <span>{currentReservation.clientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{language === "en" ? "Phone" : "Téléphone"}</span>
                  <span>{currentReservation.phoneNumber}</span>
                </div>
                <Separator className="my-4" />

                {!otpSent ? (
                  <Button onClick={sendOtp} className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    {language === "en" ? "Send OTP Code" : "Envoyer le Code OTP"}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-center text-muted-foreground">
                      {language === "en"
                        ? "OTP sent! Ask the client for the code."
                        : "OTP envoyé ! Demandez le code au client."
                      }
                    </p>
                    <p className="text-xs text-center text-muted-foreground">
                      {language === "en"
                        ? "For this demo, the valid code is: 123456"
                        : "Pour cette démo, le code valide est : 123456"
                      }
                    </p>
                    <Input
                      placeholder={language === "en" ? "Enter OTP code" : "Entrez le code OTP"}
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      className="text-center text-lg font-mono tracking-widest"
                      maxLength={6}
                    />
                    <Button
                      onClick={verifyOtp}
                      className="w-full"
                      disabled={!otpValue || verifyingOtp}
                    >
                      {verifyingOtp ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      {language === "en" ? "Verify" : "Vérifier"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowOtpDialog(false);
                setOtpSent(false);
                setOtpValue("");
              }}
              disabled={verifyingOtp}
            >
              {language === "en" ? "Cancel" : "Annuler"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}

interface ReservationCardProps {
  reservation: typeof MOCK_RESERVATIONS[0];
  language: string;
  getStatusBadge: (status: string) => React.ReactNode;
  onSendOtp: (reservation: typeof MOCK_RESERVATIONS[0]) => void;
}

function ReservationCard({ reservation, language, getStatusBadge, onSendOtp }: ReservationCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{reservation.clientName}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <div className="flex items-center gap-1">
                <Ticket className="h-4 w-4 text-primary" />
                <span>{reservation.ticketType}</span>
              </div>
            </CardDescription>
          </div>
          {getStatusBadge(reservation.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === "en" ? "Reservation ID" : "ID de Réservation"}</span>
            <span className="font-mono">{reservation.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{language === "en" ? "Phone" : "Téléphone"}</span>
            <span>{reservation.phoneNumber}</span>
          </div>
          {reservation.validatedAt && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === "en" ? "Validated At" : "Validé À"}</span>
              <span>{new Date(reservation.validatedAt).toLocaleString(language === "en" ? "en-US" : "fr-FR")}</span>
            </div>
          )}
          {reservation.validatedBy && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === "en" ? "Validated By" : "Validé Par"}</span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {reservation.validatedBy}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <div className="flex justify-end w-full gap-2">
          {reservation.status === "pending" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSendOtp(reservation)}
              >
                <Send className="h-4 w-4 mr-1" />
                {language === "en" ? "Send OTP" : "Envoyer OTP"}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  toast.success(
                    language === "en"
                      ? "Ticket validated successfully!"
                      : "Billet validé avec succès !"
                  );
                }}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                {language === "en" ? "Validate" : "Valider"}
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
