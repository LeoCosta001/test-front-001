const INITIAL_STATE = {
  accessToken: '',
  publicId: '',
  name: '',
  email: '',
  phone: '',
};

/** @function reducerUserInfo(*)
 * @param {*Object} state "Valor do "state" antes dele ser atualizado"
 * @param {*Object} action "Valor passado no parâmetro do "dispatch""
 * @returns {*Object} "Será retornada o valor do novo "state"
 */
function reducerUserInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Atualiza as informações do usuário
    case 'SET_USER_INFO':
      return {
        ...action.userInfo,
        accessToken: state.accessToken,
      };
    // Atualiza o token de acesso do usuário e também o adiciona no "localStorage"
    case 'SET_USER_TOKEN':
      localStorage.setItem('token', action.userInfo.accessToken);

      return {
        ...state,
        accessToken: action.userInfo.accessToken,
      };
    // Remove as informações do usuário
    case 'REMOVE_USER_INFO':
      localStorage.removeItem('token');

      return INITIAL_STATE;
    default:
      return state;
  }
}

export default reducerUserInfo;
