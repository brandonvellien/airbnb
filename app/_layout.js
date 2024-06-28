import { Stack, Tabs, Slot, useSegments, router } from "expo-router";
import { UserProvider } from "../context/UserContext";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";

export default RootLayout = () => {
  return (
    <UserProvider>
      <SlotProvider />
    </UserProvider>
  );
};

const SlotProvider = () => {
  const { user } = useContext(UserContext);

  const token = user.token;
  const id = user.id;

  // Si l'utilisateur n'est pas connecté et que la position actuelle n'est pas "(auth)", redirige vers la page d'accueil
  useEffect(() => {
    if (!token && !id) {
      router.replace("/");
    }
    // Si l'utilisateur est connecté et que la position actuelle n'est pas "(app)", redirige vers la page "/asyncStorage"
    if (token && id) {
      router.replace("/home");
    }
  }, [user]);
  return <Slot />;
};
