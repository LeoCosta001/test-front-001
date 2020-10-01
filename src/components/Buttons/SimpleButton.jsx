import React from 'react';
import { connect } from 'react-redux';

/*******
 * CSS *
 *******/
import css from './SimpleButton.module.scss';

/** Botão padrão
 * @function SimpleButton()
 * @summary "Cria um input do tipo "Caixa de Texto" com estilo padrão da página."
 * @param {*String} text "Texto que será exibido no centro do botão."
 * @param {String} margin "Aplica margem no botão."
 * @param {String} color "Cores do fundo do botão (OBS: Estas cores ja são pré definidas):
 *    -   'default', 'red', 'green'.
 * (OBS: A cor padrão é a cor principal do tema)"
 * @param {Function} onClickEvent "Função que será ativada ao clicar no botão."
 */
const SimpleButton = ({
  darkTheme,
  text,
  color = 'default',
  onClickEvent,
  margin,
}) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';

  return (
    <button
      className={`${css.main__button} ${css[color]} ${applyDarkTheme}`}
      onClick={onClickEvent}
      style={{ margin: margin }}
    >
      {text}
    </button>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
}))(SimpleButton);
