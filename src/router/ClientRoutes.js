import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/***************
 * Componentes *
 ***************/
import Login from '../views/Login/Login.jsx';
import Home from '../views/Home/Home.jsx';
import SupplierDetail from '../views/SupplierDetail/SupplierDetail.jsx';
import EmptyContent from '../components/EmptyContent/EmptyContent.jsx';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Alerts from '../components/Alerts/Alerts.jsx';

const ClientRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/entrar' element={<Login />} />
        <Route path='/fornecedor/:id' element={<SupplierDetail />} />
        <Route
          path='*'
          element={
            <EmptyContent
              type='warning'
              title='Erro 404!'
              text='Página não encontrada.'
            />
          }
        />
      </Routes>
      <Alerts />
      <Footer />
    </BrowserRouter>
  );
};

export default ClientRoutes;
