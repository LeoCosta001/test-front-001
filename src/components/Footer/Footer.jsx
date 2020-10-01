import React from 'react';
import { connect } from 'react-redux';

/*******
 * CSS *
 *******/
import css from './Footer.module.scss';

/** Rodapé da página
 * @function Footer()
 */
const Footer = ({ darkTheme }) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';

  return (
    <footer className={`${css.main} ${applyDarkTheme}`}>
      <div className={`${css.content} ${applyDarkTheme}`}>
        Alguns direitos reservados.
      </div>
    </footer>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
}))(Footer);
