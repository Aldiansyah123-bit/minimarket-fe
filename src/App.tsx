import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import POSPage from './pages/POSPage';
import ProductsPage from './pages/ProductsPage';
import AllPages from './pages/AllPages';

function AppContent() {
  const { currentUser, currentPage } = useStore();

  if (!currentUser) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'pos-new':
        return <POSPage />;
      case 'products-all':
        return <ProductsPage />;
      default:
        return <AllPages />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
