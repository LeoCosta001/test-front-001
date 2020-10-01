import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

/***************
 * Componentes *
 ***************/
import InfoItem from '../TitleWithText/InfoItem';

/*******
 * CSS *
 *******/
import css from './SuppliersBlock.module.scss';

/** Componente que cria os cards/blocos que compõe a lista de fornecedores da página principal
 * @function SuppliersBlock() "Componente que será exportado."
 * @param {*String} id "Id púbico do fornecedor que será usado para a requisição quando for clicado."
 * @param {*String} name "Nome do fornecedor que será exibido no bloco."
 * @param {...} etc "São as outras informações que serão exibidas no componente, não são obrigatórias."
 */
const SuppliersBlock = ({
  darkTheme,
  id,
  name,
  state,
  city,
  cnpj,
  phoneNumber,
}) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';

  /*********
   * Hooks *
   *********/
  const navigate = useNavigate();

  /*************
   * Functions *
   *************/
  // Função usada para redirecionar o usuário para a página de informações do fornecedor
  const productRoute = (pathName) => {
    navigate(`/fornecedor/${pathName}`);
  };

  /*******
   * JSX *
   *******/
  return (
    <div
      className={`${css.main} ${applyDarkTheme}`}
      onClick={() => productRoute(id)}
    >
      <div className={css.title}>{name}</div>
      <hr />
      <div className={css.info__container}>
        <table>
          <tbody>
            <tr>
              <td>
                <InfoItem field='Telefone:' text={phoneNumber} />
                <InfoItem field='CNPJ:' text={cnpj} />
              </td>
              <td>
                <InfoItem field='Estado:' text={state} />
                <InfoItem field='Cidade:' text={city} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
}))(SuppliersBlock);
