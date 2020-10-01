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
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path d='M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z' />
      </svg>
    </>
  );
};

export default SVGWarning;
