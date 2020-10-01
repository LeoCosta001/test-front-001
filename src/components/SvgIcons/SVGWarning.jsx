import React from 'react';

/** @component SVGWarning
 * @param {String} size "Tamanhos válidos em CSS (Ex: 10px, 10%, 10em, ...)".
 * @param {String} color "Cores válidas em CSS (formatos em HBS, Hexadecimal, ...)".
 * @param {String} margin "Margem válidas em CSS (Ex: 10px, 10%, 10em, ...)".
 */
const SVGWarning = ({ size, color, margin }) => {
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
        <path d='M2.73 21h18.53c.77 0 1.25-.83.87-1.5l-9.27-16c-.39-.67-1.35-.67-1.73 0l-9.27 16c-.38.67.1 1.5.87 1.5zM13 18h-2v-2h2v2zm-1-4c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z' />
      </svg>
    </>
  );
};

export default SVGWarning;
