const INITIAL_STATE = {
  newAlertId: 0,
  list: [],
};

/** @function alerts(*)
 * @param {*Object} state "Valor do "state" antes dele ser atualizado"
 * @param {*Object} action "Valor passado no parâmetro do "dispatch""
 * @returns {*Object} "Será retornada o valor do novo "state"
 */
function alerts(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Recebe como valor as informações que serão incluídas no alerta (Texto, Cor, Icone, Tempo) incluido na lista
    case 'ADD_ALERT':
      state.newAlertId++;

      return {
        ...state,
        newAlertId: state.newAlertId,
        list: [
          ...state.list,
          {
            id: state.newAlertId,
            title: action.data.title,
            message: action.data.message,
            type: action.data.type,
            autoClose: action.data.autoClose,
          },
        ],
      };
    // Recebe como valor o ID de um dos Alertas ao qual será removido da lista
    case 'REMOVE_ALERT':
      return {
        ...state,
        list: [...state.list.filter((value) => value.id !== action.data.id)],
      };

    default:
      return state;
  }
}

export default alerts;
