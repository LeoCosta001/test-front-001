import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios/config';
import { useNavigate } from 'react-router-dom';
import environment from '../../utils/environment';

/***************
 * Componentes *
 ***************/
import Head from './Home.head.jsx';
import SVGLoadingArrow from '../../components/SvgIcons/SVGLoadingArrow.jsx';
import TitleDefault from '../../components/Titles/TitleDefault.jsx';
import SuppliersBlock from '../../components/Home/SuppliersBlock.jsx';
import EmptyContent from '../../components/EmptyContent/EmptyContent.jsx';

/*******
 * CSS *
 *******/
import css from './Home.module.scss';

const Home = ({ dispatch }) => {
  /*********
   * Hooks *
   *********/
  const navigate = useNavigate();

  // Lista de fornecedores encontrados
  const [suppliers, setSuppliers] = React.useState(null);

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

      // Buscar a lista de suplimentos
      try {
        const suppliersList = await axios.get(`/suppliers`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });

        setSuppliers(suppliersList.data);
      } catch (error) {
        dispatch({
          type: 'ADD_ALERT',
          data: {
            type: 'error',
            title: 'Oops!',
            message: 'Não foi possivel listar os suplimentos.',
            autoClose: true,
          },
        });

        setSuppliers({
          error: true,
        });
      }
    };

    initialRequest();
  }, []);

  /*******
   * JSX *
   *******/
  if (suppliers && !suppliers.error)
    return (
      <section className={css.main}>
        <Head />
        <div className={css.header__container}>
          <TitleDefault
            text='Lista de fornecedores'
            margin='0px 0px 20px 0px'
          />
        </div>
        <article className={css.suppliers__container}>
          {suppliers &&
            suppliers.map((value) => {
              return (
                <span className={css.suppliers__block} key={value.publicId}>
                  <SuppliersBlock
                    className={css.suppliers__block}
                    id={value.publicId}
                    name={value.name}
                    state={value.state}
                    city={value.city}
                    cnpj={value.cnpj}
                    phoneNumber={value.phoneNumber}
                  />
                </span>
              );
            })}
        </article>
      </section>
    );

  // Falha ao listar fornecedores
  if (suppliers && suppliers.error)
    return (
      <EmptyContent
        type='error'
        title='ERRO!'
        text='Não foi possivel buscar a lista de fornecedores.'
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

export default connect()(Home);
