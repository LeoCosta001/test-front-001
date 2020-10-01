const INITIAL_STATE = {
  supplierDetail: false,
};

/** @function editMode(*)
 * @param {*Object} state "Valor do "state" antes dele ser atualizado"
 * @param {*Object} action "Valor passado no parâmetro do "dispatch""
 * @returns {*Object} "Será retornada o valor do novo "state"
 */
function editMode(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Define se o modo de edição da página "SuplierDetail" estará ativado ou não
    case 'SUPPLIER_DETAIL_EDIT_MODE':
      return {
        ...state,
        supplierDetail: action.value,
      };
    default:
      return state;
  }
}

export default editMode;
