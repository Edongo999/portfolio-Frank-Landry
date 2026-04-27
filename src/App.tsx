import React from "react";
import Layout from "@/components/layout/Layout";
import Home from "@/components/pages/HomePages";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";

function App() {
  return (
    <Layout>
    <Home />
    <WhatsAppFloatingButton />
    </Layout>
  );
}

export default App;
