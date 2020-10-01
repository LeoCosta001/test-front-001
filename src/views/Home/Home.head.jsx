import React from 'react';
import { Helmet } from 'react-helmet';

const Home_head = () => {
  return (
    <>
      <Helmet>
        <title>TestFront | Fornecedores</title>
        <meta
          name="description"
          content="Encontre os melhores fornecedores para o seu empreendimento."
        />
      </Helmet>
    </>
  );
};

export default Home_head;
