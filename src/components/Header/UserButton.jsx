import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/***************
 * Componentes *
 ***************/
import SVGMainManu from '../SvgIcons/SVGMainManu';

/*******
 * CSS *
 *******/
import css from './UserButton.module.scss';

/** Botão do usuário do headerbar
 * @function UserButton()
 * @param {*Object} userInfo "Usado para pegar o nome do usuário que esta no Redux."
 */
const UserButton = ({ darkTheme, userInfo }) => {
  const darkThemeStyle = darkTheme ? css['dark--theme'] : '';

  /*********
   * Hooks *
   *********/
  const navigate = useNavigate();

  /*************
   * Functions *
   *************/
  /** Função usada para redirecionar o usuário para outra página
   * @function
   * @param {*String} pageRoute "Rota da página para qual o usuário será redirecionado"
   */
  function redirect(pageRoute) {
    navigate(pageRoute);
  }

  /*******
   * JSX *
   *******/
  if (userInfo.name)
    return (
      <div className={css.main}>
        <div className={css.menu__icon}>
          <SVGMainManu color='#14c8bd' size='40px' />
        </div>
        <button className={css.info__button}>{userInfo.name}</button>
        <div className={`${css.info__dropdown__container} ${darkThemeStyle}`}>
          <button
            className={`${css.dropdown__item} ${darkThemeStyle}`}
          >
            Perfil
          </button>
          <button
            className={`${css.dropdown__item} ${css['dropdown--logout']} ${darkThemeStyle}`}
            onClick={() => redirect('entrar')}
          >
            Sair
          </button>
        </div>
      </div>
    );

  return null;
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
  userInfo: {
    publicId: state.userInfo.publicId,
    name: state.userInfo.name,
    email: state.userInfo.email,
    phone: state.userInfo.phone,
  },
}))(UserButton);
