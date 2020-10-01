import React from 'react';
import { Helmet } from 'react-helmet';

const SupplierDetail_head = ({supplierName}) => {
  return (
    <>
      <Helmet>
        <title>TestFront | {supplierName ? supplierName : 'Detalhes do Fornecedor'}</title>
        <meta
          name="description"
          content="Veja as informações relácionadas ao fornecedor."
        />
      </Helmet>
    </>
  );
};

export default SupplierDetail_head;
