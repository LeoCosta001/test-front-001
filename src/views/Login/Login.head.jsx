import React from 'react';
import { Helmet } from 'react-helmet';

const Login_head = () => {
  return (
    <>
      <Helmet>
        <title>TestFront | Entrar</title>
        <meta
          name='description'
          content="Entre agora e encontre os melhores fornecedores para o seu empreendimento."
        />
      </Helmet>
    </>
  );
};

export default Login_head;
