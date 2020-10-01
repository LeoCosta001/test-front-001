import React from 'react';
import { connect } from 'react-redux';
import SVGWarning from '../SvgIcons/SVGWarning.jsx';
import SVGError from '../SvgIcons/SVGError.jsx';

/*******
 * CSS *
 *******/
import css from './EmptyContent.module.scss';

/** Componente que será exibido quando não for encontrado nenhum dado para ser exibido na página
 * @function EmptyContent()
 * @param {String} type "Define qual icone será exibido na página:
 *    -   'warning' = Icone amarelo de 'Avido'.
 *    -   'error' = Icone vermelho de 'Erro'."
 * @param {String} title "Título da página."
 * @param {String} text "Texto da página."
 */
const EmptyContent = ({  type, title, text }) => {

  /*******
   * JSX *
   *******/
  return (
    <section className={css.main}>
      {type === 'warning' && (
        <div className={`${css.icon} ${css.warning}`}>
          <SVGWarning color='#ffffff' size='100%' />
        </div>
      )}
      {type === 'error' && (
        <div className={`${css.icon} ${css.error}`}>
          <SVGError color='#ffffff' size='100%' />
        </div>
      )}
      <div className={css.title}>{title}</div>
      <div className={css.text}>{text}</div>
    </section>
  );
};

export default connect()(EmptyContent);
