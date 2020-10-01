import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios/config';
import { useNavigate, useParams } from 'react-router-dom';
import environment from '../../utils/environment';

/***************
 * Componentes *
 ***************/
import Head from './SupplierDetail.head.jsx';
import SVGLoadingArrow from '../../components/SvgIcons/SVGLoadingArrow.jsx';
import TitleDefault from '../../components/Titles/TitleDefault.jsx';
import SupplierDetailBlock from '../../components/SupplierDetail/SupplierDetailBlock.jsx';

/*******
 * CSS *
 *******/
import css from './SupplierDetail.module.scss';
import SupplierDetailOwnerBlock from '../../components/SupplierDetail/SupplierDetailOwnerBlock';
import SupplierDetailActionsBlock from '../../components/SupplierDetail/SupplierDetailActionsBlock';
import EmptyContent from '../../components/EmptyContent/EmptyContent';

const SupplierDetail = ({ dispatch }) => {
  /*********
   * Hooks *
   *********/
  const navigate = useNavigate();
  const params = useParams();

  // Dados do fornecedor encontrado
  const [supplier, setSupplier] = React.useState(null);

  // Verifica a existencia do token no "LocalStorage" e sua autenticidade
  React.useEffect(() => {
    const getToken = localStorage.getItem('token');

    if (!getToken) {
      dispatch({
        type: 'ADD_ALERT',
        data: {
          type: 'warning',
          title: 'Acesso inválido!',
          message: 'Para acessar esta página é necessário entar na sua conta.',
          autoClose: true,
        },
      });
      navigate('/entrar');
      return;
    }

    const initialRequest = async () => {
      // Checagem do token de acesso
      try {
        const res = await axios.get(`/users/${environment.USER_PUBLIC_ID}`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });

        dispatch({
          type: 'SET_USER_INFO',
          userInfo: {
            publicId: res.data.publicId,
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phoneNumber,
          },
        });
      } catch (error) {
        dispatch({
          type: 'ADD_ALERT',
          data: {
            type: 'warning',
            title: 'Token de acesso expirado!',
            message: 'Você será redirecionado para a página de Login.',
            autoClose: true,
          },
        });

        navigate('/entrar');
        return;
      }

      // Buscar os dados do Fornecedor
      try {
        const supplierDetail = await axios.get(`/suppliers/${params.id}`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });

        setSupplier(supplierDetail.data);
      } catch (error) {
        dispatch({
          type: 'ADD_ALERT',
          data: {
            type: 'error',
            title: 'Oops!',
            message: 'Não foi possivel buscar os dados deste fornecedor.',
            autoClose: true,
          },
        });

        setSupplier({
          error: true,
        });
      }
    };

    initialRequest();
  }, []);

  /*******
   * JSX *
   *******/
  if (supplier && !supplier.error)
    return (
      <section className={css.main}>
        <Head supplierName={supplier.name} />
        <div className={css.header__container}>
          <TitleDefault
            text='Informações do fornecedor'
            margin='0px 0px 20px 0px'
          />
        </div>
        <article className={css.supplier__container}>
          <SupplierDetailActionsBlock />
          <SupplierDetailBlock
            supplierInfo={supplier}
            setSupplierInfo={setSupplier}
          />
          <SupplierDetailOwnerBlock ownerInfo={supplier.owner} />
        </article>
      </section>
    );

  // Falha ao buscar os dados do fornecedor
  if (supplier && supplier.error)
    return (
      <EmptyContent
        type='error'
        title='ERRO!'
        text='Não foi possivel buscar os dados deste fornecedor.'
      />
    );

  // Icone de "Carregando dados"
  return (
    <section className={css.main__loading__container}>
      <div className={css.loading__icon__container}>
        <SVGLoadingArrow
          size='50px'
          color='default'
          effect={true}
          rotate='right'
        />
      </div>
    </section>
  );
};

export default connect()(SupplierDetail);
