import { checkThemeName } from '../../actions/checkThemeName'

// Verifica se já tem algum tema válido adicionado no 'localStorage'
const themeSelected = checkThemeName(localStorage.getItem('theme-color'), true)

const INITIAL_STATE = {
  themeColor: themeSelected,
};

/** @function reducerThemeOptions(*)
 * @param {*Object} state "Valor do "state" antes dele ser atualizado"
 * @param {*Object} action "Valor passado no parâmetro do "dispatch""
 * @returns {*Object} "Será retornada o valor do novo "state"
 */
function reducerThemeOptions(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Define o nome do tema que deverá ser aplicado
    case 'SET_THEME_COLOR':
      return {
        ...state,
        themeColor: action.themeColor,
      };
    default:
      return state;
  }
}

export default reducerThemeOptions;
