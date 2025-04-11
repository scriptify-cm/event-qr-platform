interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: {
    en: "Home",
    fr: "Accueil",
  },
  about: {
    en: "About",
    fr: "À propos",
  },
  reservations: {
    en: "Reservations",
    fr: "Réservations",
  },
  tickets: {
    en: "Tickets",
    fr: "Billets",
  },
  login: {
    en: "Login",
    fr: "Connexion",
  },
  logout: {
    en: "Logout",
    fr: "Déconnexion",
  },
  register: {
    en: "Register",
    fr: "S'inscrire",
  },
  dashboard: {
    en: "Dashboard",
    fr: "Tableau de bord",
  },
  profile: {
    en: "Profile",
    fr: "Profil",
  },
  settings: {
    en: "Settings",
    fr: "Paramètres",
  },
  myTickets: {
    en: "My Tickets",
    fr: "Mes Billets",
  },
  terms: {
    en: "Terms of Service",
    fr: "Conditions d'utilisation",
  },
  privacy: {
    en: "Privacy Policy",
    fr: "Politique de confidentialité",
  },
  contact: {
    en: "Contact",
    fr: "Contact",
  },
  allRights: {
    en: "All rights reserved.",
    fr: "Tous droits réservés.",
  },

  // Client
  phoneNumber: {
    en: "Phone Number",
    fr: "Numéro de téléphone",
  },
  enterPhoneNumber: {
    en: "Enter your phone number",
    fr: "Entrez votre numéro de téléphone",
  },
  verifyCode: {
    en: "Verify Code",
    fr: "Vérifier le code",
  },
  enterCode: {
    en: "Enter the code sent to your phone",
    fr: "Entrez le code envoyé à votre téléphone",
  },
  reserve: {
    en: "Reserve",
    fr: "Réserver",
  },
  bookNow: {
    en: "Book Now",
    fr: "Réserver maintenant",
  },
  showQRCode: {
    en: "Show QR Code",
    fr: "Afficher le code QR",
  },

  // Event & Reservations
  eventName: {
    en: "Event Name",
    fr: "Nom de l'événement",
  },
  eventDate: {
    en: "Event Date",
    fr: "Date de l'événement",
  },
  eventLocation: {
    en: "Event Location",
    fr: "Lieu de l'événement",
  },
  eventDescription: {
    en: "Event Description",
    fr: "Description de l'événement",
  },
  ticketTypes: {
    en: "Ticket Types",
    fr: "Types de billets",
  },
  simple: {
    en: "Simple",
    fr: "Simple",
  },
  couple: {
    en: "Couple",
    fr: "Couple",
  },
  vip: {
    en: "VIP",
    fr: "VIP",
  },
  vvip: {
    en: "VVIP",
    fr: "VVIP",
  },
  price: {
    en: "Price",
    fr: "Prix",
  },
  quantity: {
    en: "Quantity",
    fr: "Quantité",
  },
  total: {
    en: "Total",
    fr: "Total",
  },
  payment: {
    en: "Payment",
    fr: "Paiement",
  },
  confirmed: {
    en: "Confirmed",
    fr: "Confirmé",
  },
  pending: {
    en: "Pending",
    fr: "En attente",
  },
  cancelled: {
    en: "Cancelled",
    fr: "Annulé",
  },

  // Admin & Manager
  scanQRCode: {
    en: "Scan QR Code",
    fr: "Scanner le code QR",
  },
  sendOTP: {
    en: "Send OTP",
    fr: "Envoyer OTP",
  },
  validateTicket: {
    en: "Validate Ticket",
    fr: "Valider le billet",
  },
  searchReservations: {
    en: "Search Reservations",
    fr: "Rechercher des réservations",
  },
  createManager: {
    en: "Create Manager",
    fr: "Créer un manager",
  },
  managerStats: {
    en: "Manager Stats",
    fr: "Statistiques des managers",
  },
  eventStats: {
    en: "Event Stats",
    fr: "Statistiques de l'événement",
  },

  // Authentication
  username: {
    en: "Username",
    fr: "Nom d'utilisateur",
  },
  password: {
    en: "Password",
    fr: "Mot de passe",
  },
  confirmPassword: {
    en: "Confirm Password",
    fr: "Confirmer le mot de passe",
  },
  forgotPassword: {
    en: "Forgot Password?",
    fr: "Mot de passe oublié ?",
  },
  resetPassword: {
    en: "Reset Password",
    fr: "Réinitialiser le mot de passe",
  },

  // Messages
  welcomeMessage: {
    en: "Welcome to our event platform!",
    fr: "Bienvenue sur notre plateforme d'événements !",
  },
  bookingSuccess: {
    en: "Your booking was successful!",
    fr: "Votre réservation a été effectuée avec succès !",
  },
  paymentProcessing: {
    en: "Your payment is being processed...",
    fr: "Votre paiement est en cours de traitement...",
  },
  qrCodeProtected: {
    en: "This QR code is protected against copying and screenshots.",
    fr: "Ce code QR est protégé contre la copie et les captures d'écran.",
  },
  otpSent: {
    en: "OTP code has been sent to your phone.",
    fr: "Le code OTP a été envoyé à votre téléphone.",
  },
  validationSuccess: {
    en: "Validation successful!",
    fr: "Validation réussie !",
  },
  validationFailed: {
    en: "Validation failed!",
    fr: "Échec de la validation !",
  },
};

export const getTranslation = (key: string, language = 'en'): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }

  return translations[key][language as 'en' | 'fr'] || translations[key].en;
};
