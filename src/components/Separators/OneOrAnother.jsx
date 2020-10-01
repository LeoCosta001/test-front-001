import React from 'react';
import css from './OneOrAnother.module.scss';

const OneOrAnother = ({
  text,
  textSize,
  textColor,
  margin,
  borderSize,
  borderColor,
  borderOpacity,
}) => {
  return (
    <div className={css.main} style={{ margin: margin ? margin : '40px 0px' }}>
      <hr
        style={{
          opacity: borderOpacity ? borderOpacity : '0.1',
          borderTop: `solid ${borderSize ? borderSize : '2px'} ${
            borderColor ? borderColor : 'black'
          }`,
        }}
      />

      <span
        className={css.text}
        style={{
          fontSize: textSize ? textSize : '1em',
          color: textColor ? textColor : '#9c9c9c',
        }}
      >
        {text ? text : 'OU'}
      </span>

      <hr
        style={{
          opacity: borderOpacity ? borderOpacity : '0.1',
          borderTop: `solid ${borderSize ? borderSize : '2px'} ${
            borderColor ? borderColor : 'black'
          }`,
        }}
      />
    </div>
  );
};

export default OneOrAnother;
