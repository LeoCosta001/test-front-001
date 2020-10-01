import React from 'react';

/** @component SVGLightTheme
 * @param {String} size "Tamanhos válidos em CSS (Ex: 10px, 10%, 10em, ...)".
 * @param {String} color "Cores válidas em CSS (formatos em HBS, Hexadecimal, ...)".
 * @param {String} margin "Margem válidas em CSS (Ex: 10px, 10%, 10em, ...)".
 */
const SVGLightTheme = ({ size, color, margin }) => {
  return (
    <>
      <svg
        height='24'
        viewBox='0 0 24 24'
        width='24'
        style={{ width: size ? size : '25px', height: size ? size : '25px', margin: margin ? margin : '0px' }}
        fill={color ? color : '#000000'}
      >
        <path d='M0 0h24v24H0z' fill='none' />
        <path d='M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z' />
      </svg>
    </>
  );
};

export default SVGLightTheme;
