import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import POSPage from './pages/pos/POSPage';
import { HeldOrdersPage, SalesHistoryPage } from './pages/pos/HeldOrdersAndHistory';
import { AllProductsPage, CategoriesPage, BrandsPage, UnitsPage, PricingPage } from './pages/products/ProductPages';
import { NewPurchasePage, PurchaseHistoryPage, SuppliersPage } from './pages/purchase/PurchasePages';
import { StockPage, StockMutationPage, StockAdjustmentPage, StockOpnamePage } from './pages/inventory/InventoryPages';
import { AllCustomersPage, MembersPage, SalesTransactionPage, SalesReturnPage, ExpensesPage } from './pages/customer/CustomerAndTransactionPages';
import { SalesReportPage, ProductReportPage, PurchaseReportPage, StockReportPage, ProfitReportPage, CashReportPage } from './pages/reports/ReportPages';
import { StoreSettingsPage, BranchSettingsPage, UserSettingsPage, RolesPage, PaymentMethodSettingsPage, PrinterSettingsPage, ReceiptSettingsPage } from './pages/settings/SettingsPages';

function AppContent() {
  const { currentUser, currentPage } = useStore();

  if (!currentUser) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'pos-new': return <POSPage />;
      case 'pos-held': return <HeldOrdersPage />;
      case 'pos-history': return <SalesHistoryPage />;
      case 'products-all': return <AllProductsPage />;
      case 'products-categories': return <CategoriesPage />;
      case 'products-brands': return <BrandsPage />;
      case 'products-units': return <UnitsPage />;
      case 'products-pricing': return <PricingPage />;
      case 'purchase-new': return <NewPurchasePage />;
      case 'purchase-history': return <PurchaseHistoryPage />;
      case 'purchase-suppliers': return <SuppliersPage />;
      case 'inventory-stock': return <StockPage />;
      case 'inventory-mutation': return <StockMutationPage />;
      case 'inventory-adjustment': return <StockAdjustmentPage />;
      case 'inventory-opname': return <StockOpnamePage />;
      case 'customer-all': return <AllCustomersPage />;
      case 'customer-members': return <MembersPage />;
      case 'transaction-sales': return <SalesTransactionPage />;
      case 'transaction-return': return <SalesReturnPage />;
      case 'transaction-expenses': return <ExpensesPage />;
      case 'reports-sales': return <SalesReportPage />;
      case 'reports-product': return <ProductReportPage />;
      case 'reports-purchase': return <PurchaseReportPage />;
      case 'reports-stock': return <StockReportPage />;
      case 'reports-profit': return <ProfitReportPage />;
      case 'reports-cash': return <CashReportPage />;
      case 'settings-store': return <StoreSettingsPage />;
      case 'settings-branch': return <BranchSettingsPage />;
      case 'settings-users': return <UserSettingsPage />;
      case 'settings-roles': return <RolesPage />;
      case 'settings-payment': return <PaymentMethodSettingsPage />;
      case 'settings-printer': return <PrinterSettingsPage />;
      case 'settings-receipt': return <ReceiptSettingsPage />;
      default: return <DashboardPage />;
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
