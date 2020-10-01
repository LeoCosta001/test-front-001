import inputCheckRules from './rules';
import environment from '../environment';

/** Regras de validação dos inputs
 * @global "Os parâmetros e retornos serão iguais para todos estes métodos."
 * @global "Os nomes dos métodos devem ser os mesmos que o componente que o utiliza."
 * @param {*Object} inputValue "Objeto com o ID e valor do input:
 *    -   'id': ID do input.
 *    -   'value': Valor do Input que será verificado."
 * @return {String or Null} "Resultado da verificação de validação do valor."
 */
const checkValues = {
  Login(inputValue) {
    switch (inputValue.id) {
      case 'username':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else {
          return null;
        }
      case 'password':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else {
          return null;
        }
      default:
        return null;
    }
  },

  SupplierDetailBlock(inputValue) {
    switch (inputValue.id) {
      case 'name':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else {
          return null;
        }
      case 'phoneNumber':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else {
          return null;
        }
      case 'cnpj':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else if (!inputCheckRules.cnpj(inputValue.value, true)) {
          return '*CNPJ inválido.';
        } else {
          return null;
        }
      case 'state':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else if (
          !inputCheckRules.enum(
            inputValue.value,
            environment.ENUM.STATE_LIST.map((value) => value.initials)
          )
        ) {
          return '*Selecione um estado válido.';
        } else {
          return null;
        }
      case 'city':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else {
          return null;
        }
      case 'neighborhood':
        return null;
      case 'address':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else {
          return null;
        }
      case 'number':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else {
          return null;
        }
      case 'complement':
        return null;
      case 'zipCode':
        if (!inputCheckRules.required(inputValue.value)) {
          return '*Este campo é obrigatório!';
        } else if (!inputCheckRules.size(inputValue.value, { only: 9 })) {
          return '*É necessário 6 caracteres.';
        } else {
          return null;
        }
      default:
        return null;
    }
  },
};
export default checkValues;
