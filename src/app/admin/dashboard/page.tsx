"use client";

import { PageLayout } from "@/app/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Translate } from "@/components/shared/translate";
import { useContext, useState } from "react";
import { LanguageContext } from "@/components/layout/providers";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AlertCircle, BarChart3, CalendarDays, ChevronDown, Download, InfoIcon, Loader2, Plus, Search, Settings, Ticket, Trash2, User, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for demo
const MOCK_USERS = [
  {
    id: "user-001",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "manager",
    status: "active",
    createdAt: "2025-01-15",
    lastActive: "2025-07-01",
  },
  {
    id: "user-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "manager",
    status: "active",
    createdAt: "2025-02-23",
    lastActive: "2025-07-10",
  },
  {
    id: "user-003",
    name: "Mike Davis",
    email: "mike.d@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-12-05",
    lastActive: "2025-07-15",
  },
  {
    id: "user-004",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    role: "manager",
    status: "inactive",
    createdAt: "2025-03-10",
    lastActive: "2025-05-20",
  },
];

const MOCK_STATS = {
  totalReservations: 1284,
  totalRevenue: 89562.45,
  validatedTickets: 764,
  ticketsByType: [
    { type: "simple", count: 642, revenue: 32057.58 },
    { type: "couple", count: 408, revenue: 34671.92 },
    { type: "vip", count: 186, revenue: 27898.14 },
    { type: "vvip", count: 48, revenue: 14399.52 },
  ],
  managersPerformance: [
    { managerId: "user-001", name: "John Smith", scannedTickets: 345, validatedTickets: 338 },
    { managerId: "user-002", name: "Sarah Johnson", scannedTickets: 412, validatedTickets: 401 },
    { managerId: "user-004", name: "Lisa Thompson", scannedTickets: 103, validatedTickets: 25 },
  ],
};

export default function AdminDashboard() {
  const { language } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "manager",
  });

  // Filter users based on search query
  const filteredUsers = MOCK_USERS.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.id.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.status.toLowerCase().includes(query)
    );
  });

  // Handle user creation
  const handleCreateUser = () => {
    if (!userFormData.name || !userFormData.email) {
      toast.error(
        language === "en"
          ? "Please fill in all required fields"
          : "Veuillez remplir tous les champs requis"
      );
      return;
    }

    setIsCreatingUser(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(
        language === "en"
          ? `User ${userFormData.name} created successfully!`
          : `Utilisateur ${userFormData.name} créé avec succès !`
      );
      setIsCreatingUser(false);
      setShowCreateUserDialog(false);
      setUserFormData({
        name: "",
        email: "",
        role: "manager",
      });
    }, 1500);
  };

  // Format currency based on language
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "en" ? "en-US" : "fr-FR", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {language === "en" ? "Admin Dashboard" : "Tableau de Bord Administrateur"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "en"
                  ? "Manage users, view statistics and oversee the platform"
                  : "Gérer les utilisateurs, consulter les statistiques et superviser la plateforme"
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setShowCreateUserDialog(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                {language === "en" ? "Add User" : "Ajouter un Utilisateur"}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    {language === "en" ? "Export" : "Exporter"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {language === "en" ? "Export Options" : "Options d'Exportation"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {language === "en" ? "Export Statistics (CSV)" : "Exporter les Statistiques (CSV)"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {language === "en" ? "Export User List (CSV)" : "Exporter la Liste des Utilisateurs (CSV)"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {language === "en" ? "Export All Data (JSON)" : "Exporter Toutes les Données (JSON)"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="statistics" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="statistics" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                {language === "en" ? "Statistics" : "Statistiques"}
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                {language === "en" ? "User Management" : "Gestion des Utilisateurs"}
              </TabsTrigger>
            </TabsList>

            {/* Statistics Tab */}
            <TabsContent value="statistics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                  title={language === "en" ? "Total Reservations" : "Réservations Totales"}
                  value={MOCK_STATS.totalReservations.toString()}
                  description={language === "en" ? "Across all ticket types" : "Tous types de billets confondus"}
                  icon={<Ticket className="h-4 w-4" />}
                />
                <StatsCard
                  title={language === "en" ? "Total Revenue" : "Revenu Total"}
                  value={formatCurrency(MOCK_STATS.totalRevenue)}
                  description={language === "en" ? "From all reservations" : "De toutes les réservations"}
                  icon={<BarChart3 className="h-4 w-4" />}
                />
                <StatsCard
                  title={language === "en" ? "Validated Tickets" : "Billets Validés"}
                  value={MOCK_STATS.validatedTickets.toString()}
                  description={`${Math.round((MOCK_STATS.validatedTickets / MOCK_STATS.totalReservations) * 100)}% ${language === "en" ? "of total" : "du total"}`}
                  icon={<User className="h-4 w-4" />}
                />
                <StatsCard
                  title={language === "en" ? "Event Date" : "Date de l'Événement"}
                  value={language === "en" ? "July 15-17, 2025" : "15-17 Juillet 2025"}
                  description={language === "en" ? "Sunshine Park, Miami" : "Parc Sunshine, Miami"}
                  icon={<CalendarDays className="h-4 w-4" />}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" ? "Ticket Sales by Type" : "Ventes de Billets par Type"}
                    </CardTitle>
                    <CardDescription>
                      {language === "en" ? "Distribution of ticket sales across different types" : "Répartition des ventes de billets selon les différents types"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{language === "en" ? "Type" : "Type"}</TableHead>
                          <TableHead>{language === "en" ? "Count" : "Nombre"}</TableHead>
                          <TableHead>{language === "en" ? "Revenue" : "Revenu"}</TableHead>
                          <TableHead className="text-right">{language === "en" ? "Percentage" : "Pourcentage"}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {MOCK_STATS.ticketsByType.map((ticketType) => (
                          <TableRow key={ticketType.type}>
                            <TableCell className="font-medium capitalize">
                              {ticketType.type}
                            </TableCell>
                            <TableCell>{ticketType.count}</TableCell>
                            <TableCell>{formatCurrency(ticketType.revenue)}</TableCell>
                            <TableCell className="text-right">
                              {Math.round((ticketType.count / MOCK_STATS.totalReservations) * 100)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" ? "Manager Performance" : "Performance des Managers"}
                    </CardTitle>
                    <CardDescription>
                      {language === "en" ? "Ticket validation statistics by manager" : "Statistiques de validation des billets par manager"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{language === "en" ? "Manager" : "Manager"}</TableHead>
                          <TableHead>{language === "en" ? "Scanned" : "Scannés"}</TableHead>
                          <TableHead>{language === "en" ? "Validated" : "Validés"}</TableHead>
                          <TableHead className="text-right">{language === "en" ? "Efficiency" : "Efficacité"}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {MOCK_STATS.managersPerformance.map((manager) => (
                          <TableRow key={manager.managerId}>
                            <TableCell className="font-medium">
                              {manager.name}
                            </TableCell>
                            <TableCell>{manager.scannedTickets}</TableCell>
                            <TableCell>{manager.validatedTickets}</TableCell>
                            <TableCell className="text-right">
                              <Badge className={`${getEfficiencyBadgeColor(manager.validatedTickets / manager.scannedTickets)}`}>
                                {Math.round((manager.validatedTickets / manager.scannedTickets) * 100)}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" ? "Revenue Timeline" : "Chronologie des Revenus"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en" ? "This would display a chart of revenue over time in a real application" : "Ceci afficherait un graphique des revenus au fil du temps dans une application réelle"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full flex items-center justify-center border border-dashed rounded-lg">
                    <div className="text-center p-6 text-muted-foreground">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>
                        {language === "en"
                          ? "This is where a revenue timeline chart would appear in a real application."
                          : "C'est ici qu'apparaîtrait un graphique chronologique des revenus dans une application réelle."
                        }
                      </p>
                      <p className="text-sm mt-2">
                        {language === "en"
                          ? "Would include ticket sales, revenue growth, and projections."
                          : "Inclurait les ventes de billets, la croissance des revenus et les projections."
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Management Tab */}
            <TabsContent value="users">
              <div className="mb-6 flex justify-between gap-4 items-center">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={language === "en" ? "Search users..." : "Rechercher des utilisateurs..."}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={language === "en" ? "Filter by role" : "Filtrer par rôle"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === "en" ? "All Roles" : "Tous les Rôles"}</SelectItem>
                    <SelectItem value="admin">{language === "en" ? "Admin" : "Administrateur"}</SelectItem>
                    <SelectItem value="manager">{language === "en" ? "Manager" : "Manager"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" ? "User Management" : "Gestion des Utilisateurs"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en" ? "Manage administrators and managers of the event" : "Gérer les administrateurs et les managers de l'événement"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{language === "en" ? "Name" : "Nom"}</TableHead>
                        <TableHead>{language === "en" ? "Email" : "Email"}</TableHead>
                        <TableHead>{language === "en" ? "Role" : "Rôle"}</TableHead>
                        <TableHead>{language === "en" ? "Status" : "Statut"}</TableHead>
                        <TableHead>{language === "en" ? "Created" : "Créé le"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Actions" : "Actions"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                            {language === "en"
                              ? "No users found. Try a different search."
                              : "Aucun utilisateur trouvé. Essayez une recherche différente."
                            }
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === "admin" ? "default" : "outline"}>
                                {user.role === "admin"
                                  ? (language === "en" ? "Admin" : "Administrateur")
                                  : (language === "en" ? "Manager" : "Manager")
                                }
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.status === "active" ? "success" : "destructive"} className={
                                user.status === "active"
                                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                                  : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                              }>
                                {user.status === "active"
                                  ? (language === "en" ? "Active" : "Actif")
                                  : (language === "en" ? "Inactive" : "Inactif")
                                }
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(user.createdAt).toLocaleDateString(language === "en" ? "en-US" : "fr-FR")}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Create User Dialog */}
      <Dialog open={showCreateUserDialog} onOpenChange={setShowCreateUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Create New User" : "Créer un Nouvel Utilisateur"}
            </DialogTitle>
            <DialogDescription>
              {language === "en"
                ? "Add a new administrator or manager to the platform"
                : "Ajouter un nouvel administrateur ou manager à la plateforme"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {language === "en" ? "Full Name" : "Nom Complet"}*
              </label>
              <Input
                id="name"
                placeholder={language === "en" ? "Enter user's full name" : "Entrez le nom complet de l'utilisateur"}
                value={userFormData.name}
                onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {language === "en" ? "Email Address" : "Adresse Email"}*
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@domain.com"
                value={userFormData.email}
                onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                {language === "en" ? "Role" : "Rôle"}*
              </label>
              <Select
                value={userFormData.role}
                onValueChange={(value) => setUserFormData({ ...userFormData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={language === "en" ? "Select a role" : "Sélectionnez un rôle"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">{language === "en" ? "Manager" : "Manager"}</SelectItem>
                  <SelectItem value="admin">{language === "en" ? "Administrator" : "Administrateur"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md flex items-start gap-2 text-sm">
              <InfoIcon className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-amber-800 dark:text-amber-300">
                {language === "en"
                  ? "A temporary password will be generated and sent to the user's email address."
                  : "Un mot de passe temporaire sera généré et envoyé à l'adresse email de l'utilisateur."
                }
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowCreateUserDialog(false)}
              disabled={isCreatingUser}
            >
              {language === "en" ? "Cancel" : "Annuler"}
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={isCreatingUser}
              className="gap-2"
            >
              {isCreatingUser ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {language === "en" ? "Create User" : "Créer l'Utilisateur"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="rounded-full bg-primary/10 p-1.5 text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function getEfficiencyBadgeColor(efficiency: number): string {
  if (efficiency >= 0.9) {
    return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
  } else if (efficiency >= 0.7) {
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  } else {
    return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
  }
}
