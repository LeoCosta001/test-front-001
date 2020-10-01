import React from 'react';
import { connect } from 'react-redux';

/*******
 * CSS *
 *******/
import css from './InputBlock.module.scss';

/** Input do tipo "Caixa de Texto"
 * @summary "Cria um input do tipo "Caixa de Texto" com estilo padrão da página."
 * @param {*String} formValue "Valor do hook 'useState' do formulário."
 * @param {*Function} setFormValue "Função que atualizará o valor do hook 'useState' do formulário."
 * @param {*Function} checkState "Função que receberá o ID do input e será executada quando este input sair do foco."
 * @param {*String} id "Este atributo é obrigatório porque ele será usado tanto para atualizar o hook 'useState' do formulário quanto para associar o label. (OBS: O ID tem que ter o mesmo nome de uma propriedade no hook 'useState' do formulário)."
 * @param {String} label "O texto digitado neste parâmetro sera dado ao um label do input, mas caso o valor sejá omitido então o label não será renderizado."
 * @param {Object} props "Outros atributos do input."
 * @param {String} etc... "Outros parâmetros também são atributos do input."
 */

const InputBlock = ({
  dispatch,
  darkTheme,
  label,
  type,
  name,
  id,
  formValue,
  setFormValue,
  checkState,
  ...props
}) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';

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

  return (
    <div className={css.main__input}>
      {label && (
        <label className={css.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`${css.input} ${applyDarkTheme}`}
        type={type}
        name={name}
        id={id}
        onChange={attForm}
        value={formValue[id]}
        {...props}
        onBlur={onBlur}
      />
    </div>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
}))(InputBlock);
