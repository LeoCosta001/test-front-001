import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios/config';
import inputCheckValues from '../../utils/inputCheck/checkValues';
import { useNavigate } from 'react-router-dom';

/***************
 * Componentes *
 ***************/
import Head from './Login.head.jsx';
import { Link } from 'react-router-dom';
import TitleDefault from '../../components/Titles/TitleDefault.jsx';
import InputBlock from '../../components/Inputs/InputBlock.jsx';
import ButtonDefault from '../../components/Buttons/ButtonDefault.jsx';
import OneOrAnother from '../../components/Separators/OneOrAnother.jsx';

/*******
 * CSS *
 *******/
import css from './Login.module.scss';

const Login = ({ dispatch, darkTheme }) => {
  /*********
   * Hooks *
   *********/
  const navigate = useNavigate();

  // Armazena os valores dos input deste formulário
  const [formValue, setFormValue] = React.useState({
    // Caso você esteja usando inputs de componentes importados (Ex: 'InputBlock' e 'InputCheckbox') então o nome destas propriedades tem que ser o mesmo dos ID dos Inputs
    username: '',
    password: '',
  });

  // Guarda as informações se os valores dos input deste formulário são válidos
  const [inputStatus, setInputStatus] = React.useState({
    username: null,
    password: null,
  });

  // Remove as informações do usuário do Redux e do "localStorage"
  React.useEffect(() => {
    dispatch({
      type: 'REMOVE_USER_INFO',
    });
  }, []);

  /*************
   * Functions *
   *************/
  /** Atualiza o valor e o statu do input
   * @summary "Função executada toda vez que o valor de um input é alterado"
   * @function attFormValue()
   * @param {*Object} inputNewValue "ID e Valor do input (OBS: A key do objeto ja é o ID do input)"
   */
  function attFormValue(inputNewValue) {
    const inputId = Object.keys(inputNewValue)[0];

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
    const newInputStatus = inputCheckValues.Login(inputValue);

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

  /** Envia o formulário para acessar a conta
   * @summary "Antes de ser enviado o formulário é realizada as seguintes funções:
   *    -   Atualização de status de todos os inputs.
   *    -   Verificação se tem algum input com status inválido."
   * @function sendForm(*)
   * @param {*Object} event "Objeto emitido pela função nativa do formulário"
   */
  async function sendForm(event) {
    event.preventDefault();
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
      let formData = new FormData();
      formData.append('grant_type', 'password');
      formData.append('username', formValue.username);
      formData.append('password', formValue.password);

      const res = await axios.post('/oauth/token', formData, {
        auth: {
          username: 'rest-api',
          password: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        },
      });

      navigate('/');

      dispatch({
        type: 'SET_USER_TOKEN',
        userInfo: {
          accessToken: res.data.access_token,
        },
      });
    } catch (error) {
      if (error.name === 'Error' && error.message === 'Network Error') {
        // OBS: Esta resposta também aparece para quando a autenticação foi invalidada
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
        // OBS: Esta resposta também aparece quando se passa um valor de 'grant_type' inválido
        dispatch({
          type: 'ADD_ALERT',
          data: {
            type: 'error',
            title: 'Usuário ou senha inválido!',
            message: 'Verifique os dados inseridos e tente novamente.',
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

  /*******
   * JSX *
   *******/

  return (
    <section className={css.main}>
      <Head />
      <div className={css.photo__container}></div>
      <div className={css.content__container}>
        <div className={css.content}>
          <form className={css.form} onSubmit={sendForm}>
            <TitleDefault text='Entrar' margin='0px 0px 20px 0px' />
            <div className={css.form__item}>
              <InputBlock
                type='text'
                name='username'
                id='username'
                placeholder='Usuário'
                spellCheck='false'
                autoComplete='off'
                setFormValue={attFormValue}
                formValue={formValue}
                checkState={attInputStatus}
              />
              <div className={css.form__warning}>
                {inputStatus.username && `${inputStatus.username}`}
              </div>
            </div>
            <div className={css.form__item}>
              <InputBlock
                type='password'
                name='password'
                id='password'
                placeholder='Senha'
                setFormValue={attFormValue}
                formValue={formValue}
                checkState={attInputStatus}
              />
              <div className={css.form__warning}>
                {inputStatus.password && `${inputStatus.password}`}
              </div>
            </div>
            <div className={css.form__button}>
              <ButtonDefault text='Entrar' type='submit' />
            </div>
          </form>
          <OneOrAnother
            text='OU'
            textSize='1em'
            textColor='#9c9c9c'
            margin='40px 0px'
            borderSize='2px'
            borderColor={`${darkTheme ? 'white' : 'black'}`}
            borderOpacity='0.1'
          />
          <Link
            to=''
            className={css.link}
            onClick={() => {
              dispatch({
                type: 'ADD_ALERT',
                data: {
                  type: 'warning',
                  title: 'Oops!',
                  message: 'Esta função está desativada no momento.',
                  autoClose: true,
                },
              });
            }}
          >
            Criar uma conta
          </Link>
        </div>
      </div>
    </section>
  );
};

export default connect((state) => ({
  darkTheme: state.themeOptions.themeColor === 'dark',
}))(Login);
