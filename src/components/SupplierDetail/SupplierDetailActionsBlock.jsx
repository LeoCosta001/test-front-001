import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios/config';

/***************
 * Componentes *
 ***************/
import SimpleButton from '../Buttons/SimpleButton.jsx';

/*******
 * CSS *
 *******/
import css from './SupplierDetailActionsBlock.module.scss';

/** Componente que cria os cards/blocos que compõe a lista de fornecedores da página principal
 * @function SupplierDetailActionsBlock()
 */
const SupplierDetailActionsBlock = ({ dispatch, darkTheme }) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';

  /*********
   * Hooks *
   *********/
  const navigate = useNavigate();
  const params = useParams();

  /*************
   * Functions *
   *************/
  /** Cancelar o modo de "Edição" deste componente
   * @function cancelEdit()
   */
  function returnPage() {
    navigate(`/`);
  }

  /** Aplicar a "Edição" deste componente
   * @function applyEdit()
   */
  function editModeInit() {
    dispatch({ type: 'SUPPLIER_DETAIL_EDIT_MODE', value: true });
  }

  /** Deleta o fornecedor
   * @function deleteSupplier()
   */
  async function deleteSupplier() {
    // Iniciar a requisição
    try {
      const getToken = localStorage.getItem('token');

      const res = await axios.delete(`/suppliers/${params.id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      dispatch({ type: 'SUPPLIER_DETAIL_EDIT_MODE', value: false });

      dispatch({
        type: 'ADD_ALERT',
        data: {
          type: 'success',
          title: 'Sucesso!',
          message: 'O fornecedor foi apagado.',
          autoClose: true,
        },
      });
      navigate(`/`);
    } catch (error) {
      if (error.name === 'Error' && error.message === 'Network Error') {
        // Esta resposta também aparece para quando a autenticação foi invalidada
        dispatch({
          type: 'ADD_ALERT',
          data: {
            type: 'error',
            title: 'Falha de conexão!',
            message: 'Não foi possivel se conectar com o servidor.',
            autoClose: true,
          },
        });
      } else {
        dispatch({
          type: 'ADD_ALERT',
          data: {
            type: 'error',
            title: 'Oops!',
            message: 'Encontramos um problema, tente novamente mais tarde.',
            autoClose: true,
          },
        });
      }
    }
  }

  /*******
   * JSX *
   *******/
  return (
    <div className={`${css.main} ${applyDarkTheme}`}>
      <div className={css.action__left}>
        <SimpleButton text='Voltar' color='default' onClickEvent={returnPage} />
        <div className={css.info}></div>
      </div>
      <div className={`${css.action__right} ${applyDarkTheme}`}>
        <SimpleButton
          text='Deletar'
          color='red'
          onClickEvent={deleteSupplier}
        />
        <SimpleButton
          text='Editar'
          color='default'
          onClickEvent={editModeInit}
          margin='0px 0px 0px 15px'
        />
        <div className={css.info}></div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
  editMode: state.editMode.supplierDetail,
}))(SupplierDetailActionsBlock);
