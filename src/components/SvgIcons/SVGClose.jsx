import React from 'react';

/** @component SVGClose
 * @param {String} size "Tamanhos válidos em CSS (Ex: 10px, 10%, 10em, ...)".
 * @param {String} color "Cores válidas em CSS (formatos em HBS, Hexadecimal, ...)".
 * @param {String} margin "Margem válidas em CSS (Ex: 10px, 10%, 10em, ...)".
 */
const SVGClose = ({ size, color, margin }) => {
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
        <path d='M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z' />
      </svg>
    </>
  );
};

export default SVGClose;
