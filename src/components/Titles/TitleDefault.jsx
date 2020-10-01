import React from 'react';
import { connect } from 'react-redux';
import css from './TitleDefault.module.scss';

/** Título principal das páginas (geralmente o <h1>).
 * @function TitleDefault
 * @param {String} size "Tamanhos válidos em CSS (Ex: 10px, 10%, 10em, ...)".
 * @param {String} margin "Margem válidas em CSS (Ex: 10px, 10%, 10em, ...)".
*/
const TitleDefault = ({ darkTheme, text, margin }) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';

  return (
    <h1 className={`${css.main} ${applyDarkTheme}`} style={{ margin }}>
      {text}
    </h1>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
}))(TitleDefault);
