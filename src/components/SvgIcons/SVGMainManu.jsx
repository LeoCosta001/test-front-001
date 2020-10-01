import React from 'react';

/** @component SVGMainManu
 * @param {String} size "Tamanhos válidos em CSS (Ex: 10px, 10%, 10em, ...)".
 * @param {String} color "Cores válidas em CSS (formatos em HBS, Hexadecimal, ...)".
 * @param {String} margin "Margem válidas em CSS (Ex: 10px, 10%, 10em, ...)".
 */
const SVGMainManu = ({ size, color, margin }) => {
  return (
    <>
      <svg
        viewBox='0 0 24 24'
        height='24'
        width='24'
        style={{
          width: size ? size : '25px',
          height: size ? size : '25px',
          margin: margin ? margin : '0px',
        }}
        fill={color ? color : '#000000'}
      >
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path d='M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z' />
      </svg>
    </>
  );
};

export default SVGMainManu;
