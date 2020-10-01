import React from 'react';
import { connect } from 'react-redux';
import InfoItem from '../TitleWithText/InfoItem';

/*******
 * CSS *
 *******/
import css from './SupplierDetailOwnerBlock.module.scss';

/** Componente que cria os cards/blocos que compõe a lista de fornecedores da página principal
 * @function SupplierDetailOwnerBlock() "Componente que será exportado."
 * @param {*String} ownerInfo "Informações do fornecedor que serão exibidos no bloco."
 */
const SupplierDetailOwnerBlock = ({ darkTheme, ownerInfo }) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';

  /*******
   * JSX *
   *******/
  return (
    <div className={css.main}>
        <div className={css.title}>Proprietário</div>
      <div
        className={`${css.info__container} ${applyDarkTheme}`}
      >
        <div className={css.info}>
          <InfoItem field='Nome:' text={ownerInfo.name} />
          <InfoItem field='Email:' text={ownerInfo.email} />
          <InfoItem field='Telefone:' text={ownerInfo.phoneNumber} />
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
}))(SupplierDetailOwnerBlock);
