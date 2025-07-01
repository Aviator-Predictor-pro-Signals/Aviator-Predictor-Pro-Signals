"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Loader2,
  Plane,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Globe,
  Server,
  Lock,
  BarChart3,
  Settings,
  Trash2,
  Search,
  MessageCircle,
  Languages,
} from "lucide-react"

type Page =
  | "language"
  | "landing"
  | "signup"
  | "login"
  | "country"
  | "connecting"
  | "betting-sites"
  | "confirmation"
  | "server-fixing"
  | "password"
  | "dashboard"
  | "admin"

type Language = "en" | "es" | "fr" | "de" | "pt" | "ar" | "zh" | "hi" | "sw"

interface PredictionRound {
  id: number
  odds: number
  duration: number
  status: "pending" | "active" | "completed"
}

interface AdminSignal {
  id: number
  odds: string
  duration: string
}

interface User {
  username: string
  password: string
  email: string
}

// Translation system
const translations = {
  en: {
    // Landing page
    title: "AVIATOR PRO",
    subtitle: "PREDICTOR",
    tagline: "Your Ultimate Predictor Tool for Aviator Betting!",
    signUpButton: "🚀 Sign Up Now to Get Started",
    loginButton: "🔑 Login to Your Account",
    predictOutcomes: "🎯 Predict Outcomes",
    predictDesc: "Predict the outcome of Aviator game rounds with advanced algorithms.",
    connectSites: "🌍 Connect with Top Sites",
    connectDesc: "Connect with over 50 top betting sites across multiple countries.",
    optimizeStrategy: "📈 Optimize Strategy",
    optimizeDesc: "Optimize your betting strategy with real-time data and insights.",

    // Auth pages
    createAccount: "Create Your Account",
    joinPredictors: "Join thousands of successful predictors",
    loginAccount: "Login to Your Account",
    welcomeBack: "Welcome back to AVIATOR PRO PREDICTOR",
    emailAddress: "✉️ Email Address",
    username: "👤 Username",
    password: "🔒 Password",
    signUp: "🚀 Sign Up",
    login: "🔑 Login",
    alreadyAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    signUpLink: "Sign Up",
    loginLink: "Log In",

    // Country selection
    selectCountry: "Select Your Country",
    chooseLocation: "Choose your location to connect to the best server",
    connectTo: "🌐 Connect to",

    // Other pages
    connecting: "🌐 Connecting to Your Country...",
    connectingDesc: "Please wait while we connect you to the server.",
    selectBettingSite: "🎰 Select Your Betting Site",
    choosePlatform: "Choose from over 50 popular betting platforms",
    searchSites: "🔍 Search betting sites...",
    nextStep: "➡️ Next Step",
    confirmSelection: "✅ Confirm Your Selection",
    confirmAndContinue: "✅ Confirm and Continue",
    goBack: "⬅️ Go Back and Select Another Site",
    fixingServers: "🔧 Fixing Servers...",
    optimizingServer: "Please wait while we optimize the server for your selected betting site.",
    enterPassword: "🔐 Enter Password to Continue",
    passwordDesc: "To access your predictions, please enter the password.",
    submit: "🚀 Submit",
    contactAdmin: "💬 Contact Admin on WhatsApp",
    joinGroup: "👥 Join WhatsApp Group",

    // Dashboard
    dashboardTitle: "✈️ AVIATOR PRO PREDICTOR",
    dashboardSubtitle: "Get Your Real-Time Game Predictions",
    betNowSignal: "🎯 BET NOW SIGNAL",
    waiting: "Waiting...",
    nextIn: "Next in",
    successRate: "Success Rate",
    predictionsToday: "Predictions Today",
    queueLength: "Queue Length",
    recentPredictions: "Recent Predictions",
    noPredictions: "No predictions yet",

    // Admin panel
    adminAccess: "🔐 Admin Access",
    enterAdminPassword: "Enter admin password to continue",
    notAdmin: "❌ You are not an admin",
    accessAdminPanel: "🚀 Access Admin Panel",
    backToDashboard: "📊 Back to Dashboard",
    predictionControl: "⚙️ Admin Panel - Prediction Control",
    automaticMode: "🤖 Automatic Mode",
    autoEnabled: "✅ Auto predictions enabled",
    manualOnly: "❌ Manual mode only",
    processSignals: "🚀 Process Signals",
    applySignals: "⚡ Apply All Signals",
    manualEditor: "🎯 Manual Signal Editor (6 Slots)",
    predictionQueue: "📋 Prediction Queue",
    noPredictionsQueue: "No predictions in queue",

    // Language selection
    selectLanguage: "🌍 Select Your Language",
    chooseLanguage: "Choose your preferred language to continue",
    continue: "Continue",
  },
  es: {
    title: "AVIATOR PRO",
    subtitle: "PREDICTOR",
    tagline: "¡Tu Herramienta Definitiva de Predicción para Apuestas Aviator!",
    signUpButton: "🚀 Regístrate Ahora para Comenzar",
    loginButton: "🔑 Inicia Sesión en Tu Cuenta",
    predictOutcomes: "🎯 Predecir Resultados",
    predictDesc: "Predice el resultado de las rondas del juego Aviator con algoritmos avanzados.",
    connectSites: "🌍 Conectar con Sitios Top",
    connectDesc: "Conéctate con más de 50 sitios de apuestas principales en múltiples países.",
    optimizeStrategy: "📈 Optimizar Estrategia",
    optimizeDesc: "Optimiza tu estrategia de apuestas con datos e insights en tiempo real.",

    createAccount: "Crear Tu Cuenta",
    joinPredictors: "Únete a miles de predictores exitosos",
    loginAccount: "Iniciar Sesión en Tu Cuenta",
    welcomeBack: "Bienvenido de vuelta a AVIATOR PRO PREDICTOR",
    emailAddress: "✉️ Dirección de Email",
    username: "👤 Nombre de Usuario",
    password: "🔒 Contraseña",
    signUp: "🚀 Registrarse",
    login: "🔑 Iniciar Sesión",
    alreadyAccount: "¿Ya tienes una cuenta?",
    noAccount: "¿No tienes una cuenta?",
    signUpLink: "Registrarse",
    loginLink: "Iniciar Sesión",

    selectCountry: "Selecciona Tu País",
    chooseLocation: "Elige tu ubicación para conectarte al mejor servidor",
    connectTo: "🌐 Conectar a",

    connecting: "🌐 Conectando a Tu País...",
    connectingDesc: "Por favor espera mientras te conectamos al servidor.",
    selectBettingSite: "🎰 Selecciona Tu Sitio de Apuestas",
    choosePlatform: "Elige entre más de 50 plataformas de apuestas populares",
    searchSites: "🔍 Buscar sitios de apuestas...",
    nextStep: "➡️ Siguiente Paso",
    confirmSelection: "✅ Confirmar Tu Selección",
    confirmAndContinue: "✅ Confirmar y Continuar",
    goBack: "⬅️ Volver y Seleccionar Otro Sitio",
    fixingServers: "🔧 Arreglando Servidores...",
    optimizingServer: "Por favor espera mientras optimizamos el servidor para tu sitio de apuestas seleccionado.",
    enterPassword: "🔐 Ingresa Contraseña para Continuar",
    passwordDesc: "Para acceder a tus predicciones, por favor ingresa la contraseña.",
    submit: "🚀 Enviar",
    contactAdmin: "💬 Contactar Admin por WhatsApp",
    joinGroup: "👥 Unirse al Grupo de WhatsApp",

    dashboardTitle: "✈️ AVIATOR PRO PREDICTOR",
    dashboardSubtitle: "Obtén Tus Predicciones en Tiempo Real",
    betNowSignal: "🎯 SEÑAL APOSTAR AHORA",
    waiting: "Esperando...",
    nextIn: "Siguiente en",
    successRate: "Tasa de Éxito",
    predictionsToday: "Predicciones Hoy",
    queueLength: "Longitud de Cola",
    recentPredictions: "Predicciones Recientes",
    noPredictions: "No hay predicciones aún",

    adminAccess: "🔐 Acceso de Admin",
    enterAdminPassword: "Ingresa contraseña de admin para continuar",
    notAdmin: "❌ No eres un administrador",
    accessAdminPanel: "🚀 Acceder al Panel de Admin",
    backToDashboard: "📊 Volver al Dashboard",
    predictionControl: "⚙️ Panel de Admin - Control de Predicciones",
    automaticMode: "🤖 Modo Automático",
    autoEnabled: "✅ Predicciones automáticas habilitadas",
    manualOnly: "❌ Solo modo manual",
    processSignals: "🚀 Procesar Señales",
    applySignals: "⚡ Aplicar Todas las Señales",
    manualEditor: "🎯 Editor Manual de Señales (6 Espacios)",
    predictionQueue: "📋 Cola de Predicciones",
    noPredictionsQueue: "No hay predicciones en cola",

    selectLanguage: "🌍 Selecciona Tu Idioma",
    chooseLanguage: "Elige tu idioma preferido para continuar",
    continue: "Continuar",
  },
  fr: {
    title: "AVIATOR PRO",
    subtitle: "PREDICTOR",
    tagline: "Votre Outil de Prédiction Ultime pour les Paris Aviator!",
    signUpButton: "🚀 Inscrivez-vous Maintenant pour Commencer",
    loginButton: "🔑 Connectez-vous à Votre Compte",
    predictOutcomes: "🎯 Prédire les Résultats",
    predictDesc: "Prédisez le résultat des tours de jeu Aviator avec des algorithmes avancés.",
    connectSites: "🌍 Connecter avec les Meilleurs Sites",
    connectDesc: "Connectez-vous avec plus de 50 sites de paris principaux dans plusieurs pays.",
    optimizeStrategy: "📈 Optimiser la Stratégie",
    optimizeDesc: "Optimisez votre stratégie de paris avec des données et insights en temps réel.",

    createAccount: "Créer Votre Compte",
    joinPredictors: "Rejoignez des milliers de prédicteurs à succès",
    loginAccount: "Connectez-vous à Votre Compte",
    welcomeBack: "Bienvenue de retour à AVIATOR PRO PREDICTOR",
    emailAddress: "✉️ Adresse Email",
    username: "👤 Nom d'Utilisateur",
    password: "🔒 Mot de Passe",
    signUp: "🚀 S'inscrire",
    login: "🔑 Se Connecter",
    alreadyAccount: "Vous avez déjà un compte?",
    noAccount: "Vous n'avez pas de compte?",
    signUpLink: "S'inscrire",
    loginLink: "Se Connecter",

    selectCountry: "Sélectionnez Votre Pays",
    chooseLocation: "Choisissez votre emplacement pour vous connecter au meilleur serveur",
    connectTo: "🌐 Se Connecter à",

    connecting: "🌐 Connexion à Votre Pays...",
    connectingDesc: "Veuillez patienter pendant que nous vous connectons au serveur.",
    selectBettingSite: "🎰 Sélectionnez Votre Site de Paris",
    choosePlatform: "Choisissez parmi plus de 50 plateformes de paris populaires",
    searchSites: "🔍 Rechercher des sites de paris...",
    nextStep: "➡️ Étape Suivante",
    confirmSelection: "✅ Confirmer Votre Sélection",
    confirmAndContinue: "✅ Confirmer et Continuer",
    goBack: "⬅️ Retourner et Sélectionner un Autre Site",
    fixingServers: "🔧 Réparation des Serveurs...",
    optimizingServer: "Veuillez patienter pendant que nous optimisons le serveur pour votre site de paris sélectionné.",
    enterPassword: "🔐 Entrez le Mot de Passe pour Continuer",
    passwordDesc: "Pour accéder à vos prédictions, veuillez entrer le mot de passe.",
    submit: "🚀 Soumettre",
    contactAdmin: "💬 Contacter l'Admin sur WhatsApp",
    joinGroup: "👥 Rejoindre le Groupe WhatsApp",

    dashboardTitle: "✈️ AVIATOR PRO PREDICTOR",
    dashboardSubtitle: "Obtenez Vos Prédictions en Temps Réel",
    betNowSignal: "🎯 SIGNAL PARIER MAINTENANT",
    waiting: "En Attente...",
    nextIn: "Suivant dans",
    successRate: "Taux de Réussite",
    predictionsToday: "Prédictions Aujourd'hui",
    queueLength: "Longueur de File",
    recentPredictions: "Prédictions Récentes",
    noPredictions: "Pas encore de prédictions",

    adminAccess: "🔐 Accès Admin",
    enterAdminPassword: "Entrez le mot de passe admin pour continuer",
    notAdmin: "❌ Vous n'êtes pas un administrateur",
    accessAdminPanel: "🚀 Accéder au Panneau Admin",
    backToDashboard: "📊 Retour au Tableau de Bord",
    predictionControl: "⚙️ Panneau Admin - Contrôle des Prédictions",
    automaticMode: "🤖 Mode Automatique",
    autoEnabled: "✅ Prédictions automatiques activées",
    manualOnly: "❌ Mode manuel uniquement",
    processSignals: "🚀 Traiter les Signaux",
    applySignals: "⚡ Appliquer Tous les Signaux",
    manualEditor: "🎯 Éditeur Manuel de Signaux (6 Emplacements)",
    predictionQueue: "📋 File d'Attente des Prédictions",
    noPredictionsQueue: "Aucune prédiction en file d'attente",

    selectLanguage: "🌍 Sélectionnez Votre Langue",
    chooseLanguage: "Choisissez votre langue préférée pour continuer",
    continue: "Continuer",
  },
  // Add more languages as needed...
  sw: {
    title: "AVIATOR PRO",
    subtitle: "PREDICTOR",
    tagline: "Chombo Chako cha Mwisho cha Kutabiri kwa Kubeti Aviator!",
    signUpButton: "🚀 Jisajili Sasa ili Kuanza",
    loginButton: "🔑 Ingia Kwenye Akaunti Yako",
    predictOutcomes: "🎯 Tabiri Matokeo",
    predictDesc: "Tabiri matokeo ya raundi za mchezo wa Aviator kwa kutumia algorithms za hali ya juu.",
    connectSites: "🌍 Unganisha na Tovuti Bora",
    connectDesc: "Unganisha na zaidi ya tovuti 50 za kubeti zinazojulikana katika nchi nyingi.",
    optimizeStrategy: "📈 Boresha Mkakati",
    optimizeDesc: "Boresha mkakati wako wa kubeti kwa data na maarifa ya wakati halisi.",

    createAccount: "Unda Akaunti Yako",
    joinPredictors: "Jiunge na maelfu ya watabiri wenye mafanikio",
    loginAccount: "Ingia Kwenye Akaunti Yako",
    welcomeBack: "Karibu tena kwenye AVIATOR PRO PREDICTOR",
    emailAddress: "✉️ Anwani ya Barua Pepe",
    username: "👤 Jina la Mtumiaji",
    password: "🔒 Nywila",
    signUp: "🚀 Jisajili",
    login: "🔑 Ingia",
    alreadyAccount: "Tayari una akaunti?",
    noAccount: "Huna akaunti?",
    signUpLink: "Jisajili",
    loginLink: "Ingia",

    selectCountry: "Chagua Nchi Yako",
    chooseLocation: "Chagua eneo lako ili kuunganisha na seva bora",
    connectTo: "🌐 Unganisha na",

    connecting: "🌐 Kuunganisha na Nchi Yako...",
    connectingDesc: "Tafadhali subiri tunapokuunganisha na seva.",
    selectBettingSite: "🎰 Chagua Tovuti Yako ya Kubeti",
    choosePlatform: "Chagua kutoka kwa zaidi ya mifumo 50 ya kubeti inayojulikana",
    searchSites: "🔍 Tafuta tovuti za kubeti...",
    nextStep: "➡️ Hatua Inayofuata",
    confirmSelection: "✅ Thibitisha Uchaguzi Wako",
    confirmAndContinue: "✅ Thibitisha na Endelea",
    goBack: "⬅️ Rudi na Chagua Tovuti Nyingine",
    fixingServers: "🔧 Kurekebisha Seva...",
    optimizingServer: "Tafadhali subiri tunapoboresha seva kwa tovuti yako ya kubeti uliyochagua.",
    enterPassword: "🔐 Ingiza Nywila ili Kuendelea",
    passwordDesc: "Ili kufikia utabiri wako, tafadhali ingiza nywila.",
    submit: "🚀 Wasilisha",
    contactAdmin: "💬 Wasiliana na Msimamizi kupitia WhatsApp",
    joinGroup: "👥 Jiunge na Kikundi cha WhatsApp",

    dashboardTitle: "✈️ AVIATOR PRO PREDICTOR",
    dashboardSubtitle: "Pata Utabiri Wako wa Wakati Halisi",
    betNowSignal: "🎯 ISHARA YA KUBETI SASA",
    waiting: "Kusubiri...",
    nextIn: "Inayofuata katika",
    successRate: "Kiwango cha Mafanikio",
    predictionsToday: "Utabiri wa Leo",
    queueLength: "Urefu wa Foleni",
    recentPredictions: "Utabiri wa Hivi Karibuni",
    noPredictions: "Hakuna utabiri bado",

    adminAccess: "🔐 Ufikiaji wa Msimamizi",
    enterAdminPassword: "Ingiza nywila ya msimamizi ili kuendelea",
    notAdmin: "❌ Wewe si msimamizi",
    accessAdminPanel: "🚀 Fikia Paneli ya Msimamizi",
    backToDashboard: "📊 Rudi kwenye Dashboard",
    predictionControl: "⚙️ Paneli ya Msimamizi - Udhibiti wa Utabiri",
    automaticMode: "🤖 Hali ya Otomatiki",
    autoEnabled: "✅ Utabiri wa otomatiki umewezeshwa",
    manualOnly: "❌ Hali ya mkono tu",
    processSignals: "🚀 Chakata Ishara",
    applySignals: "⚡ Tumia Ishara Zote",
    manualEditor: "🎯 Mhariri wa Mkono wa Ishara (Nafasi 6)",
    predictionQueue: "📋 Foleni ya Utabiri",
    noPredictionsQueue: "Hakuna utabiri kwenye foleni",

    selectLanguage: "🌍 Chagua Lugha Yako",
    chooseLanguage: "Chagua lugha unayopendelea ili kuendelea",
    continue: "Endelea",
  },
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
]

const countriesWithFlags = [
  // Africa
  { name: "Algeria", flag: "🇩🇿" },
  { name: "Angola", flag: "🇦🇴" },
  { name: "Benin", flag: "🇧🇯" },
  { name: "Botswana", flag: "🇧🇼" },
  { name: "Burkina Faso", flag: "🇧🇫" },
  { name: "Burundi", flag: "🇧🇮" },
  { name: "Cameroon", flag: "🇨🇲" },
  { name: "Cape Verde", flag: "🇨🇻" },
  { name: "Central African Republic", flag: "🇨🇫" },
  { name: "Chad", flag: "🇹🇩" },
  { name: "Comoros", flag: "🇰🇲" },
  { name: "Congo", flag: "🇨🇬" },
  { name: "Democratic Republic of Congo", flag: "🇨🇩" },
  { name: "Djibouti", flag: "🇩🇯" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Equatorial Guinea", flag: "🇬🇶" },
  { name: "Eritrea", flag: "🇪🇷" },
  { name: "Eswatini", flag: "🇸🇿" },
  { name: "Ethiopia", flag: "🇪🇹" },
  { name: "Gabon", flag: "🇬🇦" },
  { name: "Gambia", flag: "🇬🇲" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Guinea", flag: "🇬🇳" },
  { name: "Guinea-Bissau", flag: "🇬🇼" },
  { name: "Ivory Coast", flag: "🇨🇮" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Lesotho", flag: "🇱🇸" },
  { name: "Liberia", flag: "🇱🇷" },
  { name: "Libya", flag: "🇱🇾" },
  { name: "Madagascar", flag: "🇲🇬" },
  { name: "Malawi", flag: "🇲🇼" },
  { name: "Mali", flag: "🇲🇱" },
  { name: "Mauritania", flag: "🇲🇷" },
  { name: "Mauritius", flag: "🇲🇺" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Mozambique", flag: "🇲🇿" },
  { name: "Namibia", flag: "🇳🇦" },
  { name: "Niger", flag: "🇳🇪" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Sao Tome and Principe", flag: "🇸🇹" },
  { name: "Senegal", flag: "🇸🇳" },
  { name: "Seychelles", flag: "🇸🇨" },
  { name: "Sierra Leone", flag: "🇸🇱" },
  { name: "Somalia", flag: "🇸🇴" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "South Sudan", flag: "🇸🇸" },
  { name: "Sudan", flag: "🇸🇩" },
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Togo", flag: "🇹🇬" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Zambia", flag: "🇿🇲" },
  { name: "Zimbabwe", flag: "🇿🇼" },

  // Asia
  { name: "Afghanistan", flag: "🇦🇫" },
  { name: "Armenia", flag: "🇦🇲" },
  { name: "Azerbaijan", flag: "🇦🇿" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Bhutan", flag: "🇧🇹" },
  { name: "Brunei", flag: "🇧🇳" },
  { name: "Cambodia", flag: "🇰🇭" },
  { name: "China", flag: "🇨🇳" },
  { name: "Cyprus", flag: "🇨🇾" },
  { name: "Georgia", flag: "🇬🇪" },
  { name: "India", flag: "🇮🇳" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Iran", flag: "🇮🇷" },
  { name: "Iraq", flag: "🇮🇶" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Jordan", flag: "🇯🇴" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Kyrgyzstan", flag: "🇰🇬" },
  { name: "Laos", flag: "🇱🇦" },
  { name: "Lebanon", flag: "🇱🇧" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Mongolia", flag: "🇲🇳" },
  { name: "Myanmar", flag: "🇲🇲" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "North Korea", flag: "🇰🇵" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Palestine", flag: "🇵🇸" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Syria", flag: "🇸🇾" },
  { name: "Taiwan", flag: "🇹🇼" },
  { name: "Tajikistan", flag: "🇹🇯" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Timor-Leste", flag: "🇹🇱" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Turkmenistan", flag: "🇹🇲" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Yemen", flag: "🇾🇪" },

  // Europe
  { name: "Albania", flag: "🇦🇱" },
  { name: "Andorra", flag: "🇦🇩" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Belarus", flag: "🇧🇾" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { name: "Bulgaria", flag: "🇧🇬" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Czech Republic", flag: "🇨🇿" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Estonia", flag: "🇪🇪" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "France", flag: "🇫🇷" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Kosovo", flag: "🇽🇰" },
  { name: "Latvia", flag: "🇱🇻" },
  { name: "Liechtenstein", flag: "🇱🇮" },
  { name: "Lithuania", flag: "🇱🇹" },
  { name: "Luxembourg", flag: "🇱🇺" },
  { name: "Malta", flag: "🇲🇹" },
  { name: "Moldova", flag: "🇲🇩" },
  { name: "Monaco", flag: "🇲🇨" },
  { name: "Montenegro", flag: "🇲🇪" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "North Macedonia", flag: "🇲🇰" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Romania", flag: "🇷🇴" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "San Marino", flag: "🇸🇲" },
  { name: "Serbia", flag: "🇷🇸" },
  { name: "Slovakia", flag: "🇸🇰" },
  { name: "Slovenia", flag: "🇸🇮" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Vatican City", flag: "🇻🇦" },

  // Americas
  { name: "Antigua and Barbuda", flag: "🇦🇬" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Bahamas", flag: "🇧🇸" },
  { name: "Barbados", flag: "🇧🇧" },
  { name: "Belize", flag: "🇧🇿" },
  { name: "Bolivia", flag: "🇧🇴" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Costa Rica", flag: "🇨🇷" },
  { name: "Cuba", flag: "🇨🇺" },
  { name: "Dominica", flag: "🇩🇲" },
  { name: "Dominican Republic", flag: "🇩🇴" },
  { name: "Ecuador", flag: "🇪🇨" },
  { name: "El Salvador", flag: "🇸🇻" },
  { name: "Grenada", flag: "🇬🇩" },
  { name: "Guatemala", flag: "🇬🇹" },
  { name: "Guyana", flag: "🇬🇾" },
  { name: "Haiti", flag: "🇭🇹" },
  { name: "Honduras", flag: "🇭🇳" },
  { name: "Jamaica", flag: "🇯🇲" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Nicaragua", flag: "🇳🇮" },
  { name: "Panama", flag: "🇵🇦" },
  { name: "Paraguay", flag: "🇵🇾" },
  { name: "Peru", flag: "🇵🇪" },
  { name: "Saint Kitts and Nevis", flag: "🇰🇳" },
  { name: "Saint Lucia", flag: "🇱🇨" },
  { name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  { name: "Suriname", flag: "🇸🇷" },
  { name: "Trinidad and Tobago", flag: "🇹🇹" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Uruguay", flag: "🇺🇾" },
  { name: "Venezuela", flag: "🇻🇪" },

  // Oceania
  { name: "Australia", flag: "🇦🇺" },
  { name: "Fiji", flag: "🇫🇯" },
  { name: "Kiribati", flag: "🇰🇮" },
  { name: "Marshall Islands", flag: "🇲🇭" },
  { name: "Micronesia", flag: "🇫🇲" },
  { name: "Nauru", flag: "🇳🇷" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Palau", flag: "🇵🇼" },
  { name: "Papua New Guinea", flag: "🇵🇬" },
  { name: "Samoa", flag: "🇼🇸" },
  { name: "Solomon Islands", flag: "🇸🇧" },
  { name: "Tonga", flag: "🇹🇴" },
  { name: "Tuvalu", flag: "🇹🇻" },
  { name: "Vanuatu", flag: "🇻🇺" },
]

const bettingSites = [
  { name: "1Win", color: "bg-red-500" },
  { name: "1XBet", color: "bg-blue-600" },
  { name: "22Bet", color: "bg-green-600" },
  { name: "Betika", color: "bg-orange-500" },
  { name: "Betway", color: "bg-purple-600" },
  { name: "Mozzart Bet", color: "bg-yellow-600" },
  { name: "Hollywood Bets", color: "bg-red-600" },
  { name: "SportPesa", color: "bg-blue-500" },
  { name: "Odibets", color: "bg-green-500" },
  { name: "Betfair", color: "bg-indigo-600" },
  { name: "Shabiki", color: "bg-pink-500" },
  { name: "M-Bet", color: "bg-teal-500" },
  { name: "Kibet", color: "bg-cyan-500" },
  { name: "Lucky2u", color: "bg-amber-500" },
  { name: "IzyBet", color: "bg-lime-500" },
  { name: "Bet254", color: "bg-emerald-500" },
  { name: "SportyBet", color: "bg-violet-500" },
  { name: "Premier Bet", color: "bg-rose-500" },
  { name: "World Bet", color: "bg-sky-500" },
  { name: "SunBet", color: "bg-orange-600" },
  { name: "BetZilla", color: "bg-slate-600" },
  { name: "BetKing", color: "bg-yellow-500" },
  { name: "Betwinner", color: "bg-red-700" },
  { name: "Parimatch", color: "bg-blue-700" },
  { name: "Melbet", color: "bg-green-700" },
  { name: "Betano", color: "bg-purple-700" },
  { name: "Betsafe", color: "bg-indigo-500" },
  { name: "Bet365", color: "bg-yellow-700" },
  { name: "William Hill", color: "bg-blue-800" },
  { name: "Ladbrokes", color: "bg-red-800" },
  { name: "Coral", color: "bg-orange-700" },
  { name: "Paddy Power", color: "bg-green-800" },
  { name: "Unibet", color: "bg-orange-800" },
  { name: "888Sport", color: "bg-teal-600" },
  { name: "Betfred", color: "bg-red-500" },
  { name: "SkyBet", color: "bg-blue-400" },
  { name: "BoyleSports", color: "bg-green-400" },
  { name: "Betfair Exchange", color: "bg-indigo-400" },
  { name: "Smarkets", color: "bg-purple-400" },
  { name: "Matchbook", color: "bg-pink-400" },
  { name: "Pinnacle", color: "bg-gray-600" },
  { name: "Bet-at-home", color: "bg-cyan-600" },
  { name: "Bwin", color: "bg-lime-600" },
  { name: "Tipico", color: "bg-amber-600" },
  { name: "Interwetten", color: "bg-emerald-600" },
  { name: "Betsson", color: "bg-violet-600" },
  { name: "NordicBet", color: "bg-rose-600" },
  { name: "ComeOn", color: "bg-sky-600" },
  { name: "LeoVegas", color: "bg-orange-400" },
]

export default function AviatorPredictor() {
  const [currentPage, setCurrentPage] = useState<Page>("language")
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en")
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    country: "",
    bettingSite: "",
    enteredPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loginError, setLoginError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // User management
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Admin panel state
  const [predictionRounds, setPredictionRounds] = useState<PredictionRound[]>([])
  const [autoMode, setAutoMode] = useState(false)
  const [currentRound, setCurrentRound] = useState<PredictionRound | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [adminPassword, setAdminPassword] = useState("")
  const [adminAuthenticated, setAdminAuthenticated] = useState(false)

  // Admin signals (6 slots)
  const [adminSignals, setAdminSignals] = useState<AdminSignal[]>([
    { id: 1, odds: "", duration: "" },
    { id: 2, odds: "", duration: "" },
    { id: 3, odds: "", duration: "" },
    { id: 4, odds: "", duration: "" },
    { id: 5, odds: "", duration: "" },
    { id: 6, odds: "", duration: "" },
  ])

  const t = translations[selectedLanguage] || translations.en
  const filteredBettingSites = bettingSites.filter((site) => site.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Backend API simulation (in real app, these would be server-side API calls)
  const getSecureData = async () => {
    // This would be a server-side API call
    return {
      adminPassword: process.env.ADMIN_PASSWORD || "sniffgamechangerpredictions",
      dashboardPassword: process.env.DASHBOARD_PASSWORD || "sniffgamechangerpredictions",
      whatsappNumber: process.env.WHATSAPP_NUMBER || "254753218553",
      whatsappGroup: process.env.WHATSAPP_GROUP || "https://chat.whatsapp.com/ICuHNh1Oi6PBeCq5KhiNMu",
    }
  }

  // Generate automatic predictions - FIXED
  const generateAutoPrediction = () => {
    const odds = Math.random() * 50 + 1.1
    const duration = odds > 10 ? Math.random() * 30 + 20 : Math.random() * 15 + 5

    return {
      id: Date.now() + Math.random(),
      odds: Math.round(odds * 100) / 100,
      duration: Math.round(duration),
      status: "pending" as const,
    }
  }

  // Auto prediction system - FIXED
  useEffect(() => {
    if (autoMode && currentPage === "dashboard") {
      const interval = setInterval(() => {
        // Only add new prediction if there are less than 3 pending predictions
        const pendingCount = predictionRounds.filter((r) => r.status === "pending").length
        if (pendingCount < 3) {
          const newPrediction = generateAutoPrediction()
          setPredictionRounds((prev) => [...prev, newPrediction])
        }
      }, 10000) // Generate new prediction every 10 seconds

      return () => clearInterval(interval)
    }
  }, [autoMode, currentPage, predictionRounds])

  // Process admin signals
  const processAdminSignals = () => {
    const validSignals = adminSignals.filter((signal) => signal.odds && signal.duration)
    const newRounds: PredictionRound[] = validSignals.map((signal, index) => ({
      id: Date.now() + index,
      odds: Number.parseFloat(signal.odds),
      duration: Number.parseInt(signal.duration),
      status: "pending" as const,
    }))

    setPredictionRounds((prev) => [...prev, ...newRounds])
    // Clear admin signals after processing
    setAdminSignals(
      adminSignals.map((signal) => ({
        ...signal,
        odds: "",
        duration: "",
      })),
    )
  }

  // Process next prediction
  useEffect(() => {
    if (currentPage === "dashboard" && predictionRounds.length > 0 && !currentRound) {
      const nextRound = predictionRounds.find((r) => r.status === "pending")
      if (nextRound) {
        setCurrentRound(nextRound)
        setCountdown(nextRound.duration)
        setPredictionRounds((prev) => prev.map((r) => (r.id === nextRound.id ? { ...r, status: "active" } : r)))
      }
    }
  }, [predictionRounds, currentRound, currentPage])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && currentRound) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && currentRound) {
      // Round completed
      setPredictionRounds((prev) => prev.map((r) => (r.id === currentRound.id ? { ...r, status: "completed" } : r)))
      setCurrentRound(null)
    }
  }, [countdown, currentRound])

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language)
    setCurrentPage("landing")
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate registration
    setTimeout(() => {
      const newUser: User = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      }
      setUsers((prev) => [...prev, newUser])
      setLoading(false)
      setCurrentPage("login")
    }, 2000)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setLoginError("")

    setTimeout(() => {
      const user = users.find((u) => u.username === formData.username && u.password === formData.password)
      if (user) {
        setCurrentUser(user)
        setCurrentPage("country")
      } else {
        setLoginError("Invalid username or password")
      }
      setLoading(false)
    }, 1500)
  }

  const handleCountrySelect = () => {
    setLoading(true)
    setCurrentPage("connecting")
    setTimeout(() => {
      setLoading(false)
      setCurrentPage("betting-sites")
    }, 3000)
  }

  const handleBettingSiteSelect = () => {
    setCurrentPage("confirmation")
  }

  const handleConfirmation = () => {
    setLoading(true)
    setCurrentPage("server-fixing")
    setTimeout(() => {
      setLoading(false)
      setCurrentPage("password")
    }, 4000)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("") // Clear any previous errors

    const secureData = await getSecureData()
    if (formData.enteredPassword === secureData.dashboardPassword) {
      setCurrentPage("dashboard")
    } else {
      setPasswordError("Wrong password. Please try again.")
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const secureData = await getSecureData()
    if (adminPassword === secureData.adminPassword) {
      setAdminAuthenticated(true)
    }
  }

  const handleWhatsAppContact = async () => {
    const secureData = await getSecureData()
    window.open(`https://wa.me/${secureData.whatsappNumber}`, "_blank")
  }

  const handleWhatsAppGroup = async () => {
    const secureData = await getSecureData()
    window.open(secureData.whatsappGroup, "_blank")
  }

  const updateAdminSignal = (id: number, field: "odds" | "duration", value: string) => {
    setAdminSignals((prev) => prev.map((signal) => (signal.id === id ? { ...signal, [field]: value } : signal)))
  }

  const renderLanguageSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 flex flex-col items-center justify-center p-4">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      <Card className="w-full max-w-2xl backdrop-blur-sm bg-red-900/20 border-white/20 mt-16">
        <CardHeader className="text-center">
          <Languages className="h-16 w-16 mx-auto mb-4 text-yellow-400 animate-pulse" />
          <CardTitle className="text-3xl text-white">🌍 Select Your Language</CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Choose your preferred language to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((language) => (
              <Button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code as Language)}
                className="h-16 bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105"
                variant="outline"
              >
                <div className="text-2xl mb-1">{language.flag}</div>
                <div className="text-sm">{language.name}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 relative overflow-hidden">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      {/* Language switcher */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          onClick={() => setCurrentPage("language")}
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Languages className="h-4 w-4 mr-2" />
          {languages.find((l) => l.code === selectedLanguage)?.flag}
        </Button>
      </div>

      {/* Animated planes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 animate-pulse">
          <Plane className="h-8 w-8 text-yellow-400 transform rotate-45 animate-bounce" />
        </div>
        <div className="absolute top-40 right-10 animate-pulse delay-1000">
          <Plane className="h-6 w-6 text-white transform -rotate-12 animate-bounce" />
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse delay-2000">
          <Plane className="h-10 w-10 text-yellow-300 transform rotate-12 animate-bounce" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Plane className="h-16 w-16 text-yellow-400 mr-3 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t.title}
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4 animate-pulse">{t.subtitle}</h2>
          <p className="text-xl text-gray-300 mb-8">{t.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setCurrentPage("signup")}
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              {t.signUpButton}
            </Button>
            <Button
              onClick={() => setCurrentPage("login")}
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
            >
              {t.loginButton}
            </Button>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-red-900/20 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <Target className="h-8 w-8 text-yellow-400 mb-2 animate-spin" />
              <CardTitle>{t.predictOutcomes}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t.predictDesc}</p>
            </CardContent>
          </Card>

          <Card className="bg-red-900/20 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <Globe className="h-8 w-8 text-yellow-400 mb-2 animate-pulse" />
              <CardTitle>{t.connectSites}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t.connectDesc}</p>
            </CardContent>
          </Card>

          <Card className="bg-red-900/20 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-yellow-400 mb-2 animate-bounce" />
              <CardTitle>{t.optimizeStrategy}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t.optimizeDesc}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="bg-black/30 py-8 mt-16 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-gray-300">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )

  const renderSignUpPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 animate-pulse">
          <Plane className="h-12 w-12 text-yellow-400/30 transform rotate-45" />
        </div>
        <div className="absolute bottom-10 left-10 animate-pulse delay-1000">
          <Plane className="h-8 w-8 text-white/30 transform -rotate-45" />
        </div>
      </div>

      <Card className="w-full max-w-md backdrop-blur-sm bg-red-900/20 border-white/20 mt-16">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-8 w-8 text-yellow-400 mr-2 animate-pulse" />
            <CardTitle className="text-2xl text-white">{t.createAccount}</CardTitle>
          </div>
          <CardDescription className="text-gray-300">{t.joinPredictors}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder={t.emailAddress}
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder={t.username}
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder={t.password}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-black font-bold"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {t.signUp}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-300">
              {t.alreadyAccount}{" "}
              <button onClick={() => setCurrentPage("login")} className="text-yellow-400 hover:underline font-semibold">
                {t.loginLink}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderLoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 animate-pulse">
          <Plane className="h-12 w-12 text-yellow-400/30 transform rotate-45" />
        </div>
        <div className="absolute bottom-10 left-10 animate-pulse delay-1000">
          <Plane className="h-8 w-8 text-white/30 transform -rotate-45" />
        </div>
      </div>

      <Card className="w-full max-w-md backdrop-blur-sm bg-red-900/20 border-white/20 mt-16">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-green-400 mr-2 animate-pulse" />
            <CardTitle className="text-2xl text-white">{t.loginAccount}</CardTitle>
          </div>
          <CardDescription className="text-gray-300">{t.welcomeBack}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder={t.username}
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder={t.password}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            {loginError && <p className="text-red-400 text-sm text-center">❌ {loginError}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {t.login}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-300">
              {t.noAccount}{" "}
              <button
                onClick={() => setCurrentPage("signup")}
                className="text-yellow-400 hover:underline font-semibold"
              >
                {t.signUpLink}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCountrySelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex flex-col items-center justify-center p-4">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      <Card className="w-full max-w-md backdrop-blur-sm bg-red-900/20 border-white/20 mt-16">
        <CardHeader className="text-center">
          <Globe className="h-12 w-12 mx-auto mb-4 text-red-400 animate-spin" />
          <CardTitle className="text-2xl text-white">{t.selectCountry}</CardTitle>
          <CardDescription className="text-gray-300">{t.chooseLocation}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={(value) => setFormData({ ...formData, country: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="🌍 Select your country" />
              </SelectTrigger>
              <SelectContent className="max-h-60 bg-gray-900 border-gray-700">
                {countriesWithFlags.map((country) => (
                  <SelectItem key={country.name} value={country.name} className="text-white hover:bg-gray-800 py-3">
                    <div className="flex flex-col items-start">
                      <div className="text-2xl mb-1">{country.flag}</div>
                      <div className="font-semibold">{country.name}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleCountrySelect}
              className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold"
              disabled={!formData.country}
            >
              {t.connectTo} {formData.country || "Selected Country"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderConnecting = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex flex-col items-center justify-center p-4">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      <Card className="w-full max-w-md text-center backdrop-blur-sm bg-red-900/20 border-white/20 mt-16">
        <CardContent className="pt-6">
          <div className="relative mb-4">
            <Server className="h-16 w-16 mx-auto text-red-400 animate-pulse" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">{t.connecting}</h2>
          <p className="text-gray-300 mb-6">{t.connectingDesc}</p>
          <div className="flex justify-center items-center space-x-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Establishing connection...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBettingSites = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black p-4">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      <div className="container mx-auto max-w-4xl pt-16">
        <Card className="backdrop-blur-sm bg-red-900/20 border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">{t.selectBettingSite}</CardTitle>
            <CardDescription className="text-gray-300">{t.choosePlatform}</CardDescription>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t.searchSites}
                  value={searchTerm}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
              {filteredBettingSites.map((site) => (
                <Button
                  key={site.name}
                  variant={formData.bettingSite === site.name ? "default" : "outline"}
                  className={`h-12 text-white font-semibold ${
                    formData.bettingSite === site.name
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : `${site.color} hover:opacity-80 border-white/20`
                  } transition-all duration-300 transform hover:scale-105`}
                  onClick={() => setFormData({ ...formData, bettingSite: site.name })}
                >
                  {site.name}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleBettingSiteSelect}
              className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold"
              disabled={!formData.bettingSite}
            >
              {t.nextStep}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderConfirmation = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex flex-col items-center justify-center p-4">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      <Card className="w-full max-w-md backdrop-blur-sm bg-red-900/20 border-white/20 mt-16">
        <CardHeader className="text-center">
          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400 animate-pulse" />
          <CardTitle className="text-2xl text-white">{t.confirmSelection}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-gray-300">
            You have selected <strong className="text-yellow-400">{formData.bettingSite}</strong> for the{" "}
            <strong className="text-yellow-400">{formData.country}</strong> server.
          </p>
          <div className="space-y-3">
            <Button
              onClick={handleConfirmation}
              className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold"
            >
              {t.confirmAndContinue}
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage("betting-sites")}
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              {t.goBack}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderServerFixing = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex flex-col items-center justify-center p-4">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      <Card className="w-full max-w-md text-center backdrop-blur-sm bg-red-900/20 border-white/20 mt-16">
        <CardContent className="pt-6">
          <div className="relative mb-4">
            <Server className="h-16 w-16 mx-auto text-red-400 animate-pulse" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">{t.fixingServers}</h2>
          <p className="text-gray-300 mb-6">{t.optimizingServer}</p>
          <div className="flex justify-center items-center space-x-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Optimizing connection...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPasswordEntry = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex flex-col items-center justify-center p-4">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      <Card className="w-full max-w-md backdrop-blur-sm bg-red-900/20 border-white/20 mt-16">
        <CardHeader className="text-center">
          <Lock className="h-12 w-12 mx-auto mb-4 text-yellow-400 animate-pulse" />
          <CardTitle className="text-2xl text-white">{t.enterPassword}</CardTitle>
          <CardDescription className="text-gray-300">{t.passwordDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="🔑 Password"
              value={formData.enteredPassword}
              onChange={(e) => setFormData({ ...formData, enteredPassword: e.target.value })}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            {passwordError && (
              <div className="text-center">
                <p className="text-red-400 text-sm">❌ {passwordError}</p>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold"
            >
              {t.submit}
            </Button>
          </form>

          {/* WhatsApp buttons */}
          <div className="space-y-3 mt-6">
            <Button
              onClick={handleWhatsAppContact}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {t.contactAdmin}
            </Button>
            <Button
              onClick={handleWhatsAppGroup}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold flex items-center justify-center"
            >
              <Users className="h-4 w-4 mr-2" />
              {t.joinGroup}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAdminPanel = () => {
    if (!adminAuthenticated) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 to-black flex flex-col items-center justify-center p-4">
          {/* Website Title Header */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
              AVIATOR PREDICTOR PRO
            </h1>
          </div>

          <Card className="w-full max-w-md backdrop-blur-sm bg-red-900/20 border-white/20 mt-16">
            <CardHeader className="text-center">
              <Settings className="h-12 w-12 mx-auto mb-4 text-red-400" />
              <CardTitle className="text-2xl text-white">{t.adminAccess}</CardTitle>
              <CardDescription className="text-gray-300">{t.enterAdminPassword}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="🔑 Admin Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                {adminPassword && adminPassword !== "sniffgamechangerpredictions" && (
                  <p className="text-red-400 text-sm text-center">{t.notAdmin}</p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold"
                >
                  {t.accessAdminPanel}
                </Button>
              </form>
              <Button
                variant="outline"
                onClick={() => setCurrentPage("dashboard")}
                className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
              >
                {t.backToDashboard}
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-black p-4">
        {/* Website Title Header */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
            AVIATOR PREDICTOR PRO
          </h1>
        </div>

        <div className="container mx-auto max-w-6xl pt-16">
          <Card className="mb-6 backdrop-blur-sm bg-red-900/20 border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Settings className="h-6 w-6 mr-2 text-red-400" />
                  <CardTitle className="text-white">{t.predictionControl}</CardTitle>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage("dashboard")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {t.backToDashboard}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Auto Mode Toggle */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">{t.automaticMode}</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-mode" checked={autoMode} onCheckedChange={setAutoMode} />
                    <Label htmlFor="auto-mode" className="text-gray-300">
                      {autoMode ? t.autoEnabled : t.manualOnly}
                    </Label>
                  </div>
                </div>

                {/* Process Signals Button */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">{t.processSignals}</h3>
                  <Button
                    onClick={processAdminSignals}
                    className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold"
                  >
                    {t.applySignals}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6 Signal Slots */}
          <Card className="mb-6 backdrop-blur-sm bg-red-900/20 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">{t.manualEditor}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminSignals.map((signal, index) => (
                  <Card key={signal.id} className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-sm text-white">Signal #{index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Input
                        type="number"
                        step="0.01"
                        min="1.01"
                        placeholder="Odds (e.g., 2.50)"
                        value={signal.odds}
                        onChange={(e) => updateAdminSignal(signal.id, "odds", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                      <Input
                        type="number"
                        min="1"
                        placeholder="Duration (seconds)"
                        value={signal.duration}
                        onChange={(e) => updateAdminSignal(signal.id, "duration", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prediction Queue */}
          <Card className="backdrop-blur-sm bg-red-900/20 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">
                {t.predictionQueue} ({predictionRounds.length} rounds)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {predictionRounds.map((round, index) => (
                  <div
                    key={round.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      round.status === "active"
                        ? "bg-green-500/20 border border-green-500/30"
                        : round.status === "completed"
                          ? "bg-gray-500/20 border border-gray-500/30"
                          : "bg-blue-500/20 border border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm text-gray-300">#{index + 1}</span>
                      <span className="font-bold text-lg text-white">{round.odds}x</span>
                      <span className="text-sm text-gray-300">{round.duration}s duration</span>
                      <Badge
                        className={
                          round.status === "active"
                            ? "bg-green-500"
                            : round.status === "completed"
                              ? "bg-gray-500"
                              : "bg-blue-500"
                        }
                      >
                        {round.status.toUpperCase()}
                      </Badge>
                    </div>
                    {round.status === "pending" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setPredictionRounds((prev) => prev.filter((r) => r.id !== round.id))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {predictionRounds.length === 0 && (
                  <p className="text-center text-gray-400 py-8">{t.noPredictionsQueue}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-black relative overflow-hidden">
      {/* Website Title Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent text-center">
          AVIATOR PREDICTOR PRO
        </h1>
      </div>

      {/* Animated planes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 animate-pulse">
          <Plane className="h-6 w-6 text-yellow-400/50 transform rotate-45 animate-bounce" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse delay-1000">
          <Plane className="h-4 w-4 text-white/50 transform -rotate-12 animate-bounce" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse delay-2000">
          <Plane className="h-8 w-8 text-yellow-300/50 transform rotate-12 animate-bounce" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-8 pt-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {t.dashboardTitle}
          </h1>
          <p className="text-xl text-gray-300">{t.dashboardSubtitle}</p>
        </header>

        {/* Main Prediction Circle - Normal Size */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-48 h-48 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-400 animate-pulse">
              <div className="text-center text-white">
                {currentRound ? (
                  <>
                    <div className="text-3xl font-bold mb-2">{currentRound.odds}x</div>
                    <div className="text-sm opacity-80">
                      {t.nextIn} {countdown}s
                    </div>
                  </>
                ) : (
                  <div className="text-xl font-bold">{t.waiting}</div>
                )}
              </div>
            </div>
            {currentRound && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-500 text-white px-4 py-2 text-lg font-bold animate-pulse">
                  {t.betNowSignal}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-red-900/20 border-white/20 text-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-400" />
                {t.successRate}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">99.99%</div>
                <Badge className="bg-green-500">LAST 24H</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-900/20 border-white/20 text-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-red-400" />
                {t.predictionsToday}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {predictionRounds.filter((r) => r.status === "completed").length}
                </div>
                <Badge className="bg-red-500">COMPLETED</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-900/20 border-white/20 text-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                {t.queueLength}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {predictionRounds.filter((r) => r.status === "pending").length}
                </div>
                <Badge className="bg-purple-500">PENDING</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Predictions */}
        <Card className="bg-red-900/20 border-white/20 text-white backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-yellow-400" />
              {t.recentPredictions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {predictionRounds
                .slice(-5)
                .reverse()
                .map((round, index) => (
                  <div key={round.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="font-bold text-lg">{round.odds}x</span>
                      <span className="text-sm text-gray-400">{round.duration}s duration</span>
                    </div>
                    <Badge
                      className={
                        round.status === "active"
                          ? "bg-green-500"
                          : round.status === "completed"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                      }
                    >
                      {round.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              {predictionRounds.length === 0 && <p className="text-center text-gray-400 py-4">{t.noPredictions}</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Access Button */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={() => setCurrentPage("admin")}
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10 opacity-50 hover:opacity-100 transition-all"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <footer className="bg-black/30 py-8 mt-16 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-gray-300">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "language":
        return renderLanguageSelection()
      case "landing":
        return renderLandingPage()
      case "signup":
        return renderSignUpPage()
      case "login":
        return renderLoginPage()
      case "country":
        return renderCountrySelection()
      case "connecting":
        return renderConnecting()
      case "betting-sites":
        return renderBettingSites()
      case "confirmation":
        return renderConfirmation()
      case "server-fixing":
        return renderServerFixing()
      case "password":
        return renderPasswordEntry()
      case "dashboard":
        return renderDashboard()
      case "admin":
        return renderAdminPanel()
      default:
        return renderLanguageSelection()
    }
  }

  return renderCurrentPage()
}
