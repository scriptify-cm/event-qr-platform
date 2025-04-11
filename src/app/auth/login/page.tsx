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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { ArrowRight, Loader2 } from "lucide-react";

type PhoneForm = {
  phoneNumber: string;
};

type OTPForm = {
  otpCode: string;
};

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");

  const phoneForm = useForm<PhoneForm>({
    defaultValues: {
      phoneNumber: "",
    },
  });

  const otpForm = useForm<OTPForm>({
    defaultValues: {
      otpCode: "",
    },
  });

  const loginForm = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onPhoneSubmit = async (data: PhoneForm) => {
    setIsLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, this would send an OTP to the phone number
    toast.success(getTranslation("otpSent", language));
    setPhoneSubmitted(true);
    setIsLoading(false);
  };

  const onOTPSubmit = async (data: OTPForm) => {
    setIsLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, this would validate the OTP
    toast.success(getTranslation("loginSuccess", language));
    setIsLoading(false);
    router.push("/client/dashboard");
  };

  const onLoginSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, this would validate the credentials
    toast.success(getTranslation("loginSuccess", language));
    setIsLoading(false);

    // Redirect based on role (in a real app, this would come from the API)
    if (data.username.includes("admin")) {
      router.push("/admin/dashboard");
    } else {
      router.push("/manager/dashboard");
    }
  };

  // Helper function to get translations
  const getTranslation = (key: string, lang: string) => {
    const translations: Record<string, Record<string, string>> = {
      enterPhoneNumber: {
        en: "Enter your phone number to receive a one-time verification code",
        fr: "Entrez votre numéro de téléphone pour recevoir un code de vérification à usage unique",
      },
      loginSuccess: {
        en: "Login successful!",
        fr: "Connexion réussie !",
      },
      otpSent: {
        en: "Verification code sent to your phone",
        fr: "Code de vérification envoyé à votre téléphone",
      },
      enterOTPCode: {
        en: "Enter the verification code sent to your phone",
        fr: "Entrez le code de vérification envoyé à votre téléphone",
      },
      verify: {
        en: "Verify",
        fr: "Vérifier",
      },
      sendCode: {
        en: "Send Code",
        fr: "Envoyer le Code",
      },
      phoneNumberRequired: {
        en: "Phone number is required",
        fr: "Le numéro de téléphone est requis",
      },
      otpRequired: {
        en: "Verification code is required",
        fr: "Le code de vérification est requis",
      },
      usernameRequired: {
        en: "Username is required",
        fr: "Le nom d'utilisateur est requis",
      },
      passwordRequired: {
        en: "Password is required",
        fr: "Le mot de passe est requis",
      },
      client: {
        en: "Client",
        fr: "Client",
      },
      adminManager: {
        en: "Admin / Manager",
        fr: "Admin / Manager",
      },
      loginAs: {
        en: "Login as",
        fr: "Se connecter en tant que",
      },
      phoneLogin: {
        en: "Login with Phone",
        fr: "Connexion par téléphone",
      },
      emailLogin: {
        en: "Login with Email",
        fr: "Connexion par email",
      },
    };

    return translations[key]?.[lang] || key;
  };

  return (
    <PageLayout>
      <div className="container max-w-md py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="client">{getTranslation("client", language)}</TabsTrigger>
              <TabsTrigger value="admin">{getTranslation("adminManager", language)}</TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold tracking-tight">
                    {getTranslation("phoneLogin", language)}
                  </CardTitle>
                  <CardDescription>
                    {phoneSubmitted
                      ? getTranslation("enterOTPCode", language)
                      : getTranslation("enterPhoneNumber", language)
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {!phoneSubmitted ? (
                    <Form {...phoneForm}>
                      <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                        <FormField
                          control={phoneForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Translate text="phoneNumber" />
                              </FormLabel>
                              <FormControl>
                                <PhoneInput
                                  international
                                  defaultCountry="US"
                                  value={phoneValue}
                                  onChange={(value) => {
                                    setPhoneValue(value || "");
                                    field.onChange(value);
                                  }}
                                  className="border rounded-md p-2 w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full rounded-full"
                          disabled={isLoading || !phoneValue}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          {getTranslation("sendCode", language)}
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <Form {...otpForm}>
                      <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
                        <FormField
                          control={otpForm.control}
                          name="otpCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Translate text="verifyCode" />
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="000000"
                                  {...field}
                                  className="text-center text-lg font-mono tracking-widest"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full rounded-full"
                          disabled={isLoading || !otpForm.watch("otpCode")}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          {getTranslation("verify", language)}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col">
                  {phoneSubmitted && (
                    <Button
                      variant="link"
                      onClick={() => setPhoneSubmitted(false)}
                      className="mt-2"
                    >
                      {language === "en" ? "Change phone number" : "Changer de numéro de téléphone"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold tracking-tight">
                    {getTranslation("loginAs", language)} <span className="text-primary">Admin / Manager</span>
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Enter your credentials to access the dashboard"
                      : "Entrez vos identifiants pour accéder au tableau de bord"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Translate text="username" />
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Translate text="password" />
                            </FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full mt-2 rounded-full"
                        disabled={isLoading || !loginForm.watch("username") || !loginForm.watch("password")}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        <Translate text="login" />
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageLayout>
  );
}
