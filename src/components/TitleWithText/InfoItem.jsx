import React from 'react';
import { connect } from 'react-redux';

/*******
 * CSS *
 *******/
import css from './InfoItem.module.scss';

/** Componente que cria os campos de informações dos cards/blocos
 * @function InfoItem()
 * @param {String} field "Nome do campo da informação."
 * @param {String} name "Dados que serão exibidos no campo (OBS: Caso não tenha dados para serem exibidos
 * então será adicionado a mensagem 'Não informado')."
 * @param {String} columnDirection "Se o valor for 'true' então os títulos ficaram em cima e não na esquerda do texto."
 * @param {*Bollean} editMode "transforma o campo de texto em um campo de input."
 * "OBS: Estes parâmetros a baixo só serão utilizados caso o parâmetro 'editMode' esteja como 'true'"
 * @param {Array} optionList "Esta opção só é usada caso o parâmetro 'type' tenha o valor 'select' e então esta array será usada para criar as <options>.
 * Cada valor da array terá que ser um objeto com 3 chaves:
 * 		-		'name': Nome que será exibido na opção.
 * 		-		'value': Valor que cada opção terá.
 * 		-		'selected': (Boolean) Indica o valor da primeira opção que deverá ser selecionada."
 * 		-		'props': São os atribudos que serão inseridos dentro daquela opção."
 * @param {*String} formValue "Valor do hook 'useState' do formulário."
 * @param {*Function} setFormValue "Função que atualizará o valor do hook 'useState' do formulário."
 * @param {*Function} checkState "Função que receberá o ID do input e será executada quando este input sair do foco."
 * @param {*String} id "Este atributo é obrigatório porque ele será usado tanto para atualizar o hook 'useState' do formulário quanto para associar o label. (OBS: O ID tem que ter o mesmo nome de uma propriedade no hook 'useState' do formulário)."
 * @param {String} label "O texto digitado neste parâmetro sera dado ao um label do input, mas caso o valor sejá omitido então o label não será renderizado."
 * @param {Object} props "Outros atributos do input."
 */
const InfoItem = ({
  dispatch,
  darkTheme,
  field,
  text,
  columnDirection,
  editMode,
  optionList,
  type,
  name,
  id,
  formValue,
  setFormValue,
  checkState,
  ...props
}) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';
  let emptyField = false;

  // Tratando campos vazios
  if (!text) {
    text = 'Não informado';
    emptyField = true;
  }

  /** Atualizar o hook 'useState' do componente pai.
   * @function attForm
   * @summary "Atualiza o hook useState dos formulários que estiverem usando este componente (OBS: Para isto funcionar o hook precisa ter uma propriedade com o mesmo nome do ID atribuido ao atribudo "id" dado a este componente )."
   * @param {*Object} target "Objeto com as informações do input."
   */
  function attForm({ target }) {
    const { id, value } = target;
    setFormValue({ [id]: value });
  }

  /** Executa um função do componente pai quando é retirado o foco deste componente.
   * @function onBlur
   * @param {*Object} target "Objeto com as informações do input."
   */
  function onBlur({ target }) {
    const { id, value } = target;
    checkState({ id, value });
  }

  /*******
   * JSX *
   *******/
  return (
    <div
      className={`${css.main} ${!editMode && emptyField ? css.empty__field : ''}`}
      style={
        columnDirection ? { flexDirection: 'column' } : { flexDirection: 'row' }
      }
    >
      <span className={css.info__field}>{field}</span>
      {editMode ? (
        // Input do tipo "select"
        type === 'select' ? (
          <select
            className={`${css.info__text__edit} ${applyDarkTheme}`}
            id={id}
            defaultValue={
              optionList
                .filter((value) => value.selected === true)
                .map((value) => {
                  return value.value;
                })[0]
            }
            name={name}
            onChange={attForm}
            onBlur={onBlur}
          >
            {optionList.map((value) => {
              return (
                <option key={value.value} value={value.value} {...value.props}>
                  {value.name}
                </option>
              );
            })}
          </select>
        ) : (
          // Input do tipo "text, number, email, etc" (qualquer tipo que seja uma caixa de texto)
          <input
            className={`${css.info__text__edit} ${applyDarkTheme}`}
            style={
              columnDirection
                ? { margin: '5px 0px 0px 0px' }
                : { margin: '0px 0px 0px 5px' }
            }
            type={type}
            name={name}
            id={id}
            onChange={attForm}
            value={formValue[id]}
            onBlur={onBlur}
            {...props}
          ></input>
        )
      ) : (
        // Modo de input desativado (apenas exibirá valores)
        <span
          className={css.info__text}
          style={
            columnDirection
              ? { margin: '5px 0px 0px 0px' }
              : { margin: '0px 0px 0px 5px' }
          }
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
}))(InfoItem);
