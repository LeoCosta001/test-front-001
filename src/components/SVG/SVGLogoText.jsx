import React from 'react';

/** Logo do site.
 * @function TitleDefault
 * @param {String} size "Tamanhos válidos em CSS (Ex: 10px, 10%, 10em, ...)".
 * @param {String} color "Cores válidas em CSS (formatos em HBS, Hexadecimal, ...)".
*/
const SVGLogoText = ({ size, color }) => {
  let iconSize = {
    width: '',
    height: '',
  };

  // Verifica se foi aplicado a cor padrão
  if (color === 'default') color = '#14c8bd';
  
  /** Aumenta o tamanho dos SVG porporcionalmente com base no atributo "size"
   * @summary "A altura sempre será 1/3 do "size" enquanto a largura será o "size" inteiro.
   * É possivel utilizar qualquer tipo de valor aceito pelo CSS, caso seja passado um "number" então será adicionado automáticamente em "pixels""
   * @function calcSize
   */
  function calcSize() {
    let sizeValue = '';
    let sizeType = '';

    if (typeof size === 'number') {
      sizeValue = size;
      sizeType = 'px';
    }

    if (typeof size === 'string' && size.indexOf('.') !== -1) {
      sizeValue = size.match(/([0-9]*).([0-9]*)/)[0];
      sizeType = size.match(/[^0-9.]*$/)[0];
    }

    if (typeof size === 'string' && size.indexOf('.') === -1) {
      sizeValue = size.match(/([0-9]*)/)[0];
      sizeType = size.match(/[^0-9.]*$/)[0];
    }

    iconSize = {
      width: `${sizeValue}${sizeType}`,
      height: `${sizeValue / 3}${sizeType}`,
    };
  }

  calcSize();

  return (
    <svg
      className="SVG--MainLogoText"
      style={{
        width: size ? iconSize.width : '130px',
        height: size ? iconSize.height : '28px',
      }}
      viewBox="0 0 130 28"
      fill={color ? color : '#000000'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="SVG--MainLogoText"
        d="M21.708 0.864C22.428 0.864 23.16 0.804 23.904 0.684C24.648 0.539999 25.308 0.347998 25.884 0.107999C25.86 1.644 25.464 2.796 24.696 3.564C23.952 4.308 22.848 4.68 21.384 4.68C20.688 4.68 19.908 4.62 19.044 4.5C18.204 4.38 17.124 4.176 15.804 3.888L10.836 27H5.652L10.764 3.168H10.332C8.004 3.168 6.288 3.768 5.184 4.968C4.104 6.144 3.564 7.968 3.564 10.44C3.564 10.896 3.588 11.292 3.636 11.628C3.708 11.964 3.816 12.288 3.96 12.6C4.008 12.696 4.032 12.768 4.032 12.816C4.056 12.84 4.068 12.864 4.068 12.888C2.724 12.888 1.74 12.612 1.116 12.06C0.516 11.484 0.216 10.596 0.216 9.396C0.216 6.54 1.284 4.272 3.42 2.592C5.58 0.887999 8.604 0.0359995 12.492 0.0359995C13.284 0.0359995 14.04 0.0719991 14.76 0.143998C15.504 0.191999 16.452 0.299999 17.604 0.467998C18.612 0.635999 19.392 0.743999 19.944 0.791998C20.52 0.839999 21.108 0.864 21.708 0.864ZM30.544 12.132C30.544 14.124 29.728 15.864 28.096 17.352C26.464 18.816 24.52 19.608 22.264 19.728C22.24 20.136 22.216 20.448 22.192 20.664C22.192 20.856 22.192 21.024 22.192 21.168C22.192 22.272 22.372 23.052 22.732 23.508C23.116 23.964 23.8 24.192 24.784 24.192C25.912 24.192 26.944 23.94 27.88 23.436C28.84 22.908 29.932 21.948 31.156 20.556H32.38C30.988 22.812 29.476 24.492 27.844 25.596C26.212 26.676 24.424 27.216 22.48 27.216C20.632 27.216 19.228 26.736 18.268 25.776C17.332 24.816 16.864 23.388 16.864 21.492C16.864 20.124 17.08 18.672 17.512 17.136C17.944 15.6 18.52 14.232 19.24 13.032C20.128 11.592 21.184 10.512 22.408 9.792C23.656 9.048 25.048 8.676 26.584 8.676C27.904 8.676 28.888 8.964 29.536 9.54C30.208 10.092 30.544 10.956 30.544 12.132ZM26.872 10.584C26.056 10.584 25.228 11.316 24.388 12.78C23.572 14.22 22.96 15.96 22.552 18C23.944 17.904 25.156 17.268 26.188 16.092C27.244 14.892 27.772 13.548 27.772 12.06C27.772 11.556 27.7 11.184 27.556 10.944C27.412 10.704 27.184 10.584 26.872 10.584ZM41.7845 20.988C41.7845 21.276 41.7725 21.528 41.7485 21.744C41.7245 21.96 41.6885 22.164 41.6405 22.356C42.1205 22.068 42.5885 21.768 43.0445 21.456C43.5005 21.144 43.8965 20.844 44.2325 20.556H45.7445C45.0005 21.42 44.1725 22.224 43.2605 22.968C42.3725 23.688 41.3645 24.384 40.2365 25.056C39.5885 25.752 38.7605 26.292 37.7525 26.676C36.7445 27.036 35.6885 27.216 34.5845 27.216C32.9765 27.216 31.6925 26.784 30.7325 25.92C29.7965 25.032 29.3285 23.928 29.3285 22.608C29.3285 21.864 29.5085 21.192 29.8685 20.592C30.2285 19.968 30.6845 19.524 31.2365 19.26C32.0525 17.796 32.8085 16.236 33.5045 14.58C34.2245 12.9 34.9445 10.908 35.6645 8.604L40.9925 7.884C41.0645 9.684 41.1485 11.328 41.2445 12.816C41.3405 14.304 41.4605 15.924 41.6045 17.676C41.6765 18.684 41.7245 19.392 41.7485 19.8C41.7725 20.208 41.7845 20.604 41.7845 20.988ZM35.8805 12.492C35.5685 13.476 35.1845 14.508 34.7285 15.588C34.2965 16.644 33.7085 17.88 32.9645 19.296C33.2285 19.416 33.4325 19.584 33.5765 19.8C33.7205 20.016 33.7925 20.268 33.7925 20.556C33.7925 21.012 33.6365 21.42 33.3245 21.78C33.0125 22.14 32.6405 22.32 32.2085 22.32C31.9685 22.32 31.7645 22.284 31.5965 22.212C31.4285 22.116 31.3085 21.996 31.2365 21.852C31.2365 22.74 31.4045 23.388 31.7405 23.796C32.1005 24.18 32.6645 24.372 33.4325 24.372C34.4165 24.372 35.1845 24.084 35.7365 23.508C36.2885 22.932 36.5645 22.104 36.5645 21.024C36.5645 20.688 36.5525 20.352 36.5285 20.016C36.5045 19.656 36.4565 19.068 36.3845 18.252C36.2645 17.124 36.1685 16.128 36.0965 15.264C36.0245 14.4 35.9525 13.476 35.8805 12.492ZM45.4866 9H46.6746L47.7546 4.032L53.0826 3.312L51.8586 9H54.0186L53.7306 10.44H51.5706L49.2666 21.24C49.2186 21.456 49.1826 21.66 49.1586 21.852C49.1346 22.02 49.1226 22.2 49.1226 22.392C49.1226 22.872 49.2306 23.22 49.4466 23.436C49.6866 23.628 50.0706 23.724 50.5986 23.724C51.2706 23.724 51.9066 23.436 52.5066 22.86C53.1066 22.26 53.5506 21.492 53.8386 20.556H55.3506C54.5826 22.74 53.5506 24.396 52.2546 25.524C50.9586 26.652 49.4706 27.216 47.7906 27.216C46.5906 27.216 45.6426 26.844 44.9466 26.1C44.2746 25.332 43.9386 24.264 43.9386 22.896C43.9386 22.584 43.9626 22.236 44.0106 21.852C44.0586 21.444 44.1306 21.012 44.2266 20.556L46.3866 10.44H45.1986L45.4866 9ZM72.2202 4.32C71.5722 4.32 70.8522 4.272 70.0602 4.176C69.2922 4.056 68.3322 3.876 67.1802 3.636L65.6682 10.8H70.9242L70.3482 13.464H65.0922L62.1762 27H56.9922L62.1762 2.952C60.5202 3.024 59.3202 3.66 58.5762 4.86C57.8562 6.06 57.4962 7.908 57.4962 10.404C57.4962 10.86 57.5202 11.256 57.5682 11.592C57.6402 11.928 57.7482 12.252 57.8922 12.564C57.9402 12.66 57.9642 12.732 57.9642 12.78C57.9882 12.804 58.0002 12.828 58.0002 12.852C56.6562 12.852 55.6722 12.576 55.0482 12.024C54.4482 11.448 54.1482 10.56 54.1482 9.36C54.1482 6.504 55.2162 4.236 57.3522 2.556C59.5122 0.851998 62.5362 -2.14577e-06 66.4242 -2.14577e-06C66.6402 -2.14577e-06 66.9042 0.0119984 67.2162 0.0359995C67.5282 0.0599992 68.0442 0.107999 68.7642 0.179998C69.7242 0.275998 70.4562 0.347998 70.9602 0.395999C71.4882 0.419999 71.9682 0.431999 72.4002 0.431999C73.0482 0.431999 73.6362 0.395998 74.1642 0.323998C74.6922 0.251999 75.1842 0.143999 75.6402 -2.14577e-06C75.6162 0.0479987 75.5082 0.419999 75.3162 1.116C75.1242 1.812 74.8962 2.364 74.6322 2.772C74.3682 3.18 74.0322 3.516 73.6242 3.78C73.2402 4.02 72.7722 4.2 72.2202 4.32ZM74.1637 27H68.9797L72.7957 9H77.9797L77.5117 11.232C78.5677 10.344 79.3957 9.756 79.9957 9.468C80.6197 9.156 81.2437 9 81.8677 9C82.6117 9 83.2117 9.264 83.6677 9.792C84.1237 10.296 84.3517 10.932 84.3517 11.7C84.3517 12.444 84.1117 13.068 83.6317 13.572C83.1517 14.076 82.5277 14.328 81.7597 14.328C81.3517 14.328 81.0277 14.232 80.7877 14.04C80.5717 13.848 80.4157 13.452 80.3197 12.852C80.2477 12.468 80.1637 12.228 80.0677 12.132C79.9717 12.012 79.8397 11.952 79.6717 11.952C79.2637 11.952 78.8797 12.036 78.5197 12.204C78.1597 12.372 77.6677 12.744 77.0437 13.32L74.1637 27ZM83.2733 21.456C83.2733 20.088 83.4893 18.636 83.9213 17.1C84.3773 15.564 84.9893 14.196 85.7573 12.996C86.6453 11.58 87.7133 10.512 88.9613 9.792C90.2093 9.048 91.6013 8.676 93.1373 8.676C94.6733 8.676 95.8253 9.156 96.5933 10.116C97.3613 11.076 97.7453 12.516 97.7453 14.436C97.7933 14.46 97.8413 14.484 97.8893 14.508C97.9613 14.508 98.0453 14.508 98.1413 14.508C98.8853 14.508 99.7733 14.304 100.805 13.896C101.837 13.488 102.797 12.972 103.685 12.348L104.009 13.32C103.337 14.04 102.437 14.664 101.309 15.192C100.205 15.72 98.9813 16.092 97.6373 16.308C97.3493 19.548 96.4133 22.164 94.8293 24.156C93.2453 26.148 91.3133 27.144 89.0333 27.144C87.1613 27.144 85.7333 26.664 84.7493 25.704C83.7653 24.744 83.2733 23.328 83.2733 21.456ZM93.4253 10.872C92.2733 10.872 91.1813 12.036 90.1493 14.364C89.1413 16.692 88.6373 18.9 88.6373 20.988C88.6373 22.116 88.7573 22.884 88.9973 23.292C89.2613 23.7 89.7533 23.904 90.4733 23.904C91.3613 23.904 92.2013 23.184 92.9933 21.744C93.8093 20.304 94.3613 18.528 94.6493 16.416C94.3133 16.344 94.0613 16.188 93.8933 15.948C93.7493 15.684 93.6773 15.336 93.6773 14.904C93.6773 14.448 93.7733 14.052 93.9653 13.716C94.1573 13.38 94.4333 13.128 94.7933 12.96C94.7453 12.192 94.6133 11.652 94.3973 11.34C94.2053 11.028 93.8813 10.872 93.4253 10.872ZM108.521 23.148C108.521 22.716 108.569 22.176 108.665 21.528C108.785 20.88 109.013 19.848 109.349 18.432C109.685 17.064 109.901 16.08 109.997 15.48C110.093 14.88 110.141 14.376 110.141 13.968C110.141 13.368 110.033 12.912 109.817 12.6C109.601 12.288 109.277 12.132 108.845 12.132C108.269 12.132 107.729 12.432 107.225 13.032C106.745 13.608 106.349 14.412 106.037 15.444L103.589 27H98.4054L102.221 9H107.405L107.009 10.872C107.609 10.2 108.257 9.696 108.953 9.36C109.649 9.024 110.405 8.856 111.221 8.856C112.493 8.856 113.477 9.204 114.173 9.9C114.869 10.596 115.217 11.604 115.217 12.924C115.217 13.476 115.145 14.136 115.001 14.904C114.881 15.648 114.629 16.8 114.245 18.36C113.933 19.584 113.729 20.448 113.633 20.952C113.537 21.456 113.489 21.876 113.489 22.212C113.489 22.716 113.609 23.1 113.849 23.364C114.089 23.604 114.449 23.724 114.929 23.724C115.529 23.724 116.045 23.52 116.477 23.112C116.909 22.704 117.401 21.852 117.953 20.556H119.465C118.697 22.788 117.761 24.456 116.657 25.56C115.577 26.664 114.281 27.216 112.769 27.216C111.425 27.216 110.381 26.856 109.637 26.136C108.893 25.392 108.521 24.396 108.521 23.148ZM119.209 9H120.397L121.477 4.032L126.805 3.312L125.581 9H127.741L127.453 10.44H125.293L122.989 21.24C122.941 21.456 122.905 21.66 122.881 21.852C122.857 22.02 122.845 22.2 122.845 22.392C122.845 22.872 122.953 23.22 123.169 23.436C123.409 23.628 123.793 23.724 124.321 23.724C124.993 23.724 125.629 23.436 126.229 22.86C126.829 22.26 127.273 21.492 127.561 20.556H129.073C128.305 22.74 127.273 24.396 125.977 25.524C124.681 26.652 123.193 27.216 121.513 27.216C120.313 27.216 119.365 26.844 118.669 26.1C117.997 25.332 117.661 24.264 117.661 22.896C117.661 22.584 117.685 22.236 117.733 21.852C117.781 21.444 117.853 21.012 117.949 20.556L120.109 10.44H118.921L119.209 9Z"
      />
    </svg>
  );
};

export default SVGLogoText;
