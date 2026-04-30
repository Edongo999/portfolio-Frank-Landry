import React from "react";
import Layout from "@/components/layout/Layout";
import Home from "@/components/pages/HomePages";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";
import AlertModal from "@/components/ui/AlertModal";

function App() {
  const showLock = true; 

  return (
    <Layout>
      <Home /> {/* Ton portfolio reste affiché */}
      <WhatsAppFloatingButton />
      <AlertModal show={showLock} /> {/* Modal par-dessus */}
    </Layout>
  );
}

export default App;
