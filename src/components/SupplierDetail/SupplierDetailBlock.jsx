import React from 'react';
import { connect } from 'react-redux';
import environment from '../../utils/environment';
import axios from '../../axios/config';
import inputCheckMasks from '../../utils/inputCheck/masks';
import inputCheckValues from '../../utils/inputCheck/checkValues';

/***************
 * Componentes *
 ***************/
import InfoItem from '../TitleWithText/InfoItem';

/*******
 * CSS *
 *******/
import css from './SupplierDetailBlock.module.scss';
import SimpleButton from '../Buttons/SimpleButton';

/** Componente que cria os cards/blocos que compõe a lista de fornecedores da página principal
 * @function SupplierDetailBlock() "Componente que será exportado."
 * @param {*String} supplierInfo "Informações do fornecedor que serão exibidos no bloco."
 * @param {*Function} setSupplierInfo "Função para atualizar as informações do fornecedor que serão exibidos no bloco."
 */
const SupplierDetailBlock = ({
  dispatch,
  darkTheme,
  editMode,
  supplierInfo,
  setSupplierInfo,
}) => {
  const applyDarkTheme = darkTheme ? css['dark--theme'] : '';

  /*********
   * Hooks *
   *********/
  // Armazena os valores dos input deste formulário
  const [formValue, setFormValue] = React.useState({
    // Caso você esteja usando inputs de componentes importados (Ex: 'InputBlock' e 'InputCheckRulesbox') então o nome destas propriedades tem que ser o mesmo dos ID dos Inputs
    name: supplierInfo.name,
    phoneNumber: supplierInfo.phoneNumber,
    cnpj: supplierInfo.cnpj,
    state: supplierInfo.state,
    city: supplierInfo.city,
    neighborhood: supplierInfo.neighborhood,
    address: supplierInfo.address,
    number: supplierInfo.number,
    complement: supplierInfo.complement,
    zipCode: supplierInfo.zipCode,
  });

  // Guarda as informações se os valores dos input deste formulário são válidos
  const [inputStatus, setInputStatus] = React.useState({
    name: null,
    phoneNumber: null,
    cnpj: null,
    state: null,
    city: null,
    neighborhood: null,
    address: null,
    number: null,
    complement: null,
    zipCode: null,
  });

  // Desativa o modo de edição
  React.useEffect(() => {
    dispatch({ type: 'SUPPLIER_DETAIL_EDIT_MODE', value: false });
  }, []);

  /*************
   * Functions *
   *************/
  /** Atualiza o valor e o status do input
   * @summary "Função executada toda vez que o valor de um input é alterado"
   * @function attFormValue()
   * @param {*Object} inputNewValue "ID e Valor do input (OBS: A key do objeto ja é o ID do input)"
   */
  function attFormValue(inputNewValue) {
    const inputId = Object.keys(inputNewValue)[0];

    switch (Object.keys(inputNewValue)[0]) {
      case 'cnpj':
        inputNewValue.cnpj = inputCheckMasks.cnpj(inputNewValue.cnpj);
        break;
    }

    attInputStatus({
      id: inputId,
      value: inputNewValue[inputId],
    });

    setFormValue({
      ...formValue,
      ...inputNewValue,
    });
  }

  /** Função usada para atualizar o status do input
   * @summary "Esta função recebe como parãmetro o ID do input e o seu valor atual para que seja realizada a verificação dos valores
   * e atualiza o useState 'setInputStatus' com o status do input, para exibir uma determinanda mensagem de erro."
   * @function attInputStatus()
   * @param {*Object} inputValue "ID e Valor do input:
   *    -   'id': Id do Input.
   *    -   'value': Valor do input"
   * @param {Boolean} onlyCheck "Alterna entre atualizar o estado ou apenas retornar o resultado (para usar em iterações):
   *    -   false: Atualiza o estado do hook 'setInputStatus'.
   *    -   true: Apenas retorna o resultado sem atualizar o hook."
   * @returns {Object} "Retorna o novo valor que deveria ser usado para atualizar o hook 'setInputStatus'
   * (OBS: Este retorno só funciona caso o parâmetro 'onlyCheck' for 'true')"
   */
  function attInputStatus(inputValue, onlyCheck) {
    const newInputStatus = inputCheckValues.SupplierDetailBlock(inputValue);

    if (onlyCheck) {
      return {
        [inputValue.id]: newInputStatus,
      };
    } else {
      setInputStatus({
        ...inputStatus,
        [inputValue.id]: newInputStatus,
      });
    }
  }

  /** Função para atualizar o status todos os inputs
   * @summary "Antes de ser enviado o formulário é realizada as seguintes funções:
   *    -   Atualização de status de todos os inputs.
   *    -   Verificação se tem algum input com status inválido."
   * @function attAllInputStatus(*)
   * @param {*Object} formData "Objeto com os dados dos formulários (Sintaxe: { idDoInput: 'ValorDoInput'})"
   * @param {*Object} valueHookOfInputState "Objeto com os atuais dos status dos input."
   * @param {*Function} functionAttInputStatus "Função que irá checar o status do input recebendo um objeto como parâmetro:
   *    -   'id': É o ID do input.
   *    -   'value': Valor do input."
   * @param {*Function} setHookOfInputState "Função que irá atualizar a hook que guarda as informações do estado do input:
   *    -   'id': É o ID do input.
   *    -   'value': Status do input."
   * @returns {*Object} "O mesmo objeto usado para atualizar o estado do input."
   */
  function attAllInputStatus(
    formData,
    valueHookOfInputState,
    functionAttInputStatus,
    setHookOfInputState
  ) {
    let newInputStatus = {};

    Object.keys(formData).forEach((value) => {
      const inputStatusResult = functionAttInputStatus(
        {
          id: value,
          value: formData[value],
        },
        true
      );

      newInputStatus = {
        ...newInputStatus,
        ...inputStatusResult,
      };
    });

    setHookOfInputState({
      ...valueHookOfInputState,
      ...newInputStatus,
    });

    return newInputStatus;
  }

  /** Envia o formulário com a edição dos dados do fornecedor
   * @summary "Antes de ser enviado o formulário é realizada as seguintes funções:
   *    -   Atualização de status de todos os inputs.
   *    -   Verificação se tem algum input com status inválido."
   * @function sendForm()
   */
  async function sendForm() {
    let invalidInputs = [];
    let newInputStatus = attAllInputStatus(
      formValue,
      inputStatus,
      attInputStatus,
      setInputStatus
    );

    // Checar os valores dos input
    Object.keys(newInputStatus).forEach((value) => {
      if (newInputStatus[value])
        invalidInputs.push({
          id: value,
          value: newInputStatus[value],
        });
    });

    if (invalidInputs.length > 0) return;

    // Iniciar a requisição
    try {
      const getToken = localStorage.getItem('token');

      const res = await axios.put(
        '/suppliers',
        {
          publicId: supplierInfo.publicId,
          ...formValue,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      dispatch({ type: 'SUPPLIER_DETAIL_EDIT_MODE', value: false });

      dispatch({
        type: 'ADD_ALERT',
        data: {
          type: 'success',
          title: 'Sucesso!',
          message: 'Suas alterações foram salvas.',
          autoClose: true,
        },
      });

      setSupplierInfo(res.data);
    } catch (error) {
      if (error.name === 'Error' && error.message === 'Network Error') {
        // Esta resposta também aparece para quando a autenticação foi invalidada
        dispatch({
          type: 'ADD_ALERT',
          data: {
            type: 'error',
            title: 'Falha de conexão!',
            message: 'Não foi possivel se conectar com o servidor.',
            autoClose: true,
          },
        });
      } else if (error.message === 'Request failed with status code 400') {
        dispatch({
          type: 'ADD_ALERT',
          data: {
            type: 'warning',
            title: 'Formulário inválido!',
            message:
              'Verifique se todos os dados foram preenchidos corretamente.',
            autoClose: true,
          },
        });
      } else {
        dispatch({
          type: 'ADD_ALERT',
          data: {
            type: 'error',
            title: 'Oops!',
            message: 'Encontramos um problema, tente novamente mais tarde.',
            autoClose: true,
          },
        });
      }
    }
  }

  /** Cancelar o modo de "Edição" deste componente
   * @function cancelEdit()
   */
  function cancelEdit() {
    setFormValue(supplierInfo);
    attAllInputStatus(
      supplierInfo,
      inputStatus,
      attInputStatus,
      setInputStatus
    );

    dispatch({ type: 'SUPPLIER_DETAIL_EDIT_MODE', value: false });
  }

  /** Criar uma lista de estados para o input 'state'
   * @function stateListForSelect
   * @returns {*Array} "Array com os objetos no formato usado nos componente de input select"
   */
  function stateListForSelect() {
    return environment.ENUM.STATE_LIST.map((value) => {
      return {
        name: value.state,
        value: value.initials,
        selected: value.initials === supplierInfo.state ? true : false,
        props: {},
      };
    });
  }

  /*******
   * JSX *
   *******/
  return (
    <div className={css.main}>
      <div className={css.title}>Distribuidora</div>
      <div className={`${css.info__container} ${applyDarkTheme}`}>
        <div className={css.info}>
          <table>
            <tbody>
              <tr>
                <td>
                  <InfoItem
                    field='Nome:'
                    text={supplierInfo.name}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Ex: Distribuidora Abcd'
                    spellCheck='false'
                    autoComplete='off'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode && inputStatus.name && `${inputStatus.name}`}
                  </div>
                  <InfoItem
                    field='Telefone:'
                    text={supplierInfo.phoneNumber}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='text'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='Ex: (11) 12345-6789'
                    spellCheck='false'
                    autoComplete='off'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode &&
                      inputStatus.phoneNumber &&
                      `${inputStatus.phoneNumber}`}
                  </div>
                  <InfoItem
                    field='CNPJ:'
                    text={supplierInfo.cnpj}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='text'
                    name='cnpj'
                    id='cnpj'
                    placeholder='Ex: 12.345.678/0001-23'
                    spellCheck='false'
                    autoComplete='off'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode && inputStatus.cnpj && `${inputStatus.cnpj}`}
                  </div>
                  <InfoItem
                    field='Estado:'
                    text={supplierInfo.state}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='select'
                    optionList={stateListForSelect()}
                    name='state'
                    id='state'
                    spellCheck='false'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode && inputStatus.state && `${inputStatus.state}`}
                  </div>
                  <InfoItem
                    field='Cidade:'
                    text={supplierInfo.city}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='text'
                    name='city'
                    id='city'
                    placeholder='Nome da cidade'
                    spellCheck='false'
                    autoComplete='off'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode && inputStatus.city && `${inputStatus.city}`}
                  </div>
                </td>
                <td>
                  <InfoItem
                    field='Bairro:'
                    text={supplierInfo.neighborhood}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='text'
                    name='neighborhood'
                    id='neighborhood'
                    placeholder='Ex: Nome do bairro'
                    spellCheck='false'
                    autoComplete='off'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode &&
                      inputStatus.neighborhood &&
                      `${inputStatus.neighborhood}`}
                  </div>
                  <InfoItem
                    field='Endereço:'
                    text={supplierInfo.address}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='text'
                    name='address'
                    id='address'
                    placeholder='Nome da rua'
                    spellCheck='false'
                    autoComplete='off'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode &&
                      inputStatus.address &&
                      `${inputStatus.address}`}
                  </div>
                  <InfoItem
                    field='Nº:'
                    text={supplierInfo.number}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='text'
                    name='number'
                    id='number'
                    placeholder='Número do imóvel distribuidora'
                    spellCheck='false'
                    autoComplete='off'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode && inputStatus.number && `${inputStatus.number}`}
                  </div>
                  <InfoItem
                    field='Complemento:'
                    text={supplierInfo.complement}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='text'
                    name='complement'
                    id='complement'
                    placeholder='Complemento do endereço do imóvel'
                    spellCheck='false'
                    autoComplete='off'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode &&
                      inputStatus.complement &&
                      `${inputStatus.complement}`}
                  </div>
                  <InfoItem
                    field='CEP:'
                    text={supplierInfo.zipCode}
                    columnDirection={true}
                    editMode={editMode ? true : false}
                    type='text'
                    name='zipCode'
                    id='zipCode'
                    placeholder='Ex: 01234-567'
                    spellCheck='false'
                    autoComplete='off'
                    setFormValue={attFormValue}
                    formValue={formValue}
                    checkState={attInputStatus}
                  />
                  <div className={css.form__warning}>
                    {editMode &&
                      inputStatus.zipCode &&
                      `${inputStatus.zipCode}`}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Botão para Confirmar/Cancelar alterações */}
          {editMode && (
            <div className={css.footer__button}>
              <SimpleButton
                text='Cancelar'
                color='red'
                onClickEvent={cancelEdit}
              />
              <SimpleButton
                text='Salvar'
                color='green'
                onClickEvent={sendForm}
                margin='0px 0px 0px 15px'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
  editMode: state.editMode.supplierDetail,
}))(SupplierDetailBlock);
