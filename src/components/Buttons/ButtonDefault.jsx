import React from 'react';
import css from './ButtonDefault.module.scss';

/** Botão padrão
 * @summary "Cria um input do tipo "Caixa de Texto" com estilo padrão da página."
 * @param {*String} text "Texto que será exibido no centro do botão."
 * @param {Object} props "Outros atributos do input."
 */
const ButtonDefault = ({ text, ...props }) => {
  return (
    <button className={css.main} {...props}>
      {text}
    </button>
  );
};

export default ButtonDefault;
