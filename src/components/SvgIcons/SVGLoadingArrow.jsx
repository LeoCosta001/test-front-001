import React from 'react';
import css from './SVGLoadingArrow.module.scss';

/** @component SVGLoadingArrow
 * @param {String} size "Tamanhos válidos em CSS (Ex: 10px, 10%, 10em, ...)".
 * @param {String} color "Cores válidas em CSS (formatos em HBS, Hexadecimal, ...).
 * (OBS: O valor 'default' vai aplicar uma cor pré-definida)".
 * @param {Boolean} effect "Se o valor for 'false' então nenhum efeito será aplicado".
 * @param {String} rotate "Define o lado para qual a animação irá girar ('left' ou 'right')".
 */
const SVGLoadingArrow = ({ size, color, effect, rotate }) => {
  let iconEffect = null;

  // Verifica se foi aplicado a cor padrão
  if (color === 'default') color = '#14c8bd';

  // Verifica se foi aplicado efeitos neste icone
  const effectCheck = () => {
    if (effect) {
      if (rotate === 'left') iconEffect = css.icon__effect__rotation__left;
      if (rotate === 'right') iconEffect = css.icon__effect__rotation__right;
    }
  };
  effectCheck();

  return (
    <>
      <svg
        className={effect ? iconEffect : null}
        viewBox='0 0 20 20'
        style={{ width: size ? size : '25px', height: size ? size : '25px' }}
      >
        <path
          fill={color ? color : '#000000'}
          d='M19.305,9.61c-0.235-0.235-0.615-0.235-0.85,0l-1.339,1.339c0.045-0.311,0.073-0.626,0.073-0.949
								c0-3.812-3.09-6.901-6.901-6.901c-2.213,0-4.177,1.045-5.44,2.664l0.897,0.719c1.053-1.356,2.693-2.232,4.543-2.232
								c3.176,0,5.751,2.574,5.751,5.751c0,0.342-0.037,0.675-0.095,1l-1.746-1.39c-0.234-0.235-0.614-0.235-0.849,0
								c-0.235,0.235-0.235,0.615,0,0.85l2.823,2.25c0.122,0.121,0.282,0.177,0.441,0.172c0.159,0.005,0.32-0.051,0.44-0.172l2.25-2.25
								C19.539,10.225,19.539,9.845,19.305,9.61z M10.288,15.752c-3.177,0-5.751-2.575-5.751-5.752c0-0.276,0.025-0.547,0.062-0.813
								l1.203,1.203c0.235,0.234,0.615,0.234,0.85,0c0.234-0.235,0.234-0.615,0-0.85l-2.25-2.25C4.281,7.169,4.121,7.114,3.961,7.118
								C3.802,7.114,3.642,7.169,3.52,7.291l-2.824,2.25c-0.234,0.235-0.234,0.615,0,0.85c0.235,0.234,0.615,0.234,0.85,0l1.957-1.559
								C3.435,9.212,3.386,9.6,3.386,10c0,3.812,3.09,6.901,6.902,6.901c2.083,0,3.946-0.927,5.212-2.387l-0.898-0.719
								C13.547,14.992,12.008,15.752,10.288,15.752z'
        ></path>
      </svg>
    </>
  );
};

export default SVGLoadingArrow;
