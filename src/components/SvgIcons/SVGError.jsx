import React from 'react';

/** @component SVGError
 * @param {String} size "Tamanhos válidos em CSS (Ex: 10px, 10%, 10em, ...)".
 * @param {String} color "Cores válidas em CSS (formatos em HBS, Hexadecimal, ...)".
 * @param {String} margin "Margem válidas em CSS (Ex: 10px, 10%, 10em, ...)".
 */
const SVGError = ({ size, color, margin }) => {
  return (
    <>
      <svg
        height='24'
        viewBox='0 0 24 24'
        width='24'
        style={{
          width: size ? size : '25px',
          height: size ? size : '25px',
          margin: margin ? margin : '0px',
        }}
        fill={color ? color : '#000000'}
      >
        <path d='M0 0h24v24H0z' fill='none' />
        <path d='M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z' />
      </svg>
    </>
  );
};

export default SVGError;
