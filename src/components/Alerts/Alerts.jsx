import React from 'react';
import { connect } from 'react-redux';

/***************
 * Componentes *
 ***************/
import SVGSuccess from '../SvgIcons/SVGSuccess.jsx';
import SVGWarning from '../SvgIcons/SVGWarning.jsx';
import SVGError from '../SvgIcons/SVGError.jsx';
import SVGClose from '../SvgIcons/SVGClose.jsx';

/*******
 * CSS *
 *******/
import css from './Alerts.module.scss';

/** Componente que cria os blocos de alertas
 * @function AlertButton()
 * @param {*String} id "ID do alerta."
 * @param {String} title "Título do alerta."
 * @param {String} message "Texto do alerta."
 * @param {String} type "Tipo do alerta. Valores válidos:
 *      -   'success' = Cor verde e icone de "OK".
 *      -   'warning' = Cor vermelha e icone de "Erro".
 *      -   'alert' = Cor amarela e icone de "Alerta.)
 * (OBS: A cor padrão é 'success' mas caso não seja passado nenhum valor então não será exibido nenhum icone)."
 * @param {*Function} deleteAlert "Função que irá deletar o alerta do alerta."
 * @param {Bollean} autoClose "'true' Indica que o alerta desaparecerá automaticamente após um determinado tempo."
 */
const AlertButton = ({ id, title, message, type, deleteAlert, autoClose }) => {
  const defaultTime = 5500;
  /*********
   * Hooks *
   *********/
  const [applyOutEffect, setApplyOutEffect] = React.useState(false);

  // Ativar o fechamento automático caso o parâmetro "autoClose" seja 'true'
  React.useEffect(() => {
    if (autoClose) {
      const timerForDeleteAlert = setTimeout(deleteAlertInit, defaultTime);
      const timerForApplyOutEffect = setTimeout(
        outEffectInit,
        defaultTime - 1000
      );
      return () => {
        clearTimeout(timerForDeleteAlert);
        clearTimeout(timerForApplyOutEffect);
      };
    }
  }, [autoClose]);

  /*************
   * Functions *
   *************/
  /** Inicia a função de deletar o componente deste alerta
   * @function outEffectInit()
   */
  function deleteAlertInit() {
    deleteAlert(id);
  }

  /** Inicia a animação de saida do alerta
   * @function outEffectInit()
   */
  function outEffectInit() {
    setApplyOutEffect(true);
  }
  /*******
   * JSX *
   *******/
  return (
    <div
      className={`${css.main__alerts__block} ${css[type]} ${
        applyOutEffect ? css['out--effect'] : ''
      }`}
    >
      <div className={css.icon__container}>
        {type === 'success' && <SVGSuccess color='#ffffff' size='40px' />}
        {type === 'warning' && <SVGWarning color='#ffffff' size='40px' />}
        {type === 'error' && <SVGError color='#ffffff' size='40px' />}
      </div>
      <div className={css.text__container}>
        <p>{title}</p>
        <p>{message}</p>
      </div>
      <button className={css.close__container} onClick={deleteAlertInit}>
        <SVGClose color='#ffffff' size='40px' />
      </button>
    </div>
  );
};

/** Componente que exibe a lista de alertas que estiverem no Redux 'state.alerts.list'
 * @function Alerts()
 */
const Alerts = ({ dispatch, alertsList }) => {
  /*************
   * Functions *
   *************/
  /** Função para remover um alerta da lista de alertas
   * @function deleteAlert()
   * @param {*Number} id "Número que corresponde ao ID do alerta que deverá ser fechado"
   */
  function deleteAlert(id) {
    dispatch({
      type: 'REMOVE_ALERT',
      data: { id: id },
    });
  }

  /*******
   * JSX *
   *******/
  return (
    <div className={css.main__alerts}>
      {alertsList.map((value) => (
        <AlertButton
          key={value.id}
          id={value.id}
          title={value.title}
          message={value.message}
          type={value.type}
          autoClose={value.autoClose}
          deleteAlert={deleteAlert}
        />
      ))}
    </div>
  );
};

export default connect((state) => ({
  alertsList: state.alerts.list,
}))(Alerts);
