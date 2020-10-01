import React from 'react';
import { connect } from 'react-redux';
import { checkThemeName } from '../../redux/actions/checkThemeName';

/***************
 * Componentes *
 ***************/
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import UserButton from './UserButton.jsx';
import SVGLogoText from '../SVG/SVGLogoText.jsx';
import SVGLightTheme from '../SvgIcons/SVGLightTheme.jsx';
import SVGDarkTheme from '../SvgIcons/SVGDarkTheme';

/*******
 * CSS *
 *******/
import css from './Header.module.scss';

/** Headerbar
 * @function Header()
 */
const Header = ({ dispatch, darkTheme, userInfo }) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';

  // Estado do botão que liga e desliga o tema padrão
  const [toggleTheme, setToggleTheme] = React.useState(true);

  // Muda o posicionamento inicial do toggle button caso o tema salvo no 'localStorage' seja o 'dark'
  React.useEffect(() => {
    if (darkTheme) setToggleTheme(!toggleTheme);
  }, []);

  function attDefaultTheme() {
    let themeName;

    setToggleTheme(!toggleTheme);

    if (!toggleTheme) themeName = 'light';
    else themeName = 'dark';

    dispatch({
      type: 'SET_THEME_COLOR',
      themeColor: checkThemeName(themeName, true),
    });
  }

  return (
    <header className={`${css.main} ${applyDarkTheme}`}>
      <Link to='/'>
        <SVGLogoText size='120px' color='default' />
      </Link>
      <div className={css.right__content}>
        <Switch
          onChange={attDefaultTheme}
          checked={!darkTheme}
          className={`${css.content__toggle} ${
            !userInfo.name ? css['no--login'] : ''
          }`}
          onColor='#14c8bd'
          onHandleColor='#fff'
          activeBoxShadow='none'
          handleDiameter={24}
          uncheckedIcon={
            <SVGDarkTheme size={20} color='#FFFFFF' margin='4px 0px 0px 3px' />
          }
          checkedIcon={
            <SVGLightTheme size={20} color='#FFFFFF' margin='4px 0px 0px 2px' />
          }
          height={28}
          width={50}
        />
        {userInfo.name && <UserButton />}
      </div>
    </header>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
  userInfo: {
    publicId: state.userInfo.publicId,
    name: state.userInfo.name,
    email: state.userInfo.email,
    phone: state.userInfo.phone,
  },
}))(Header);
