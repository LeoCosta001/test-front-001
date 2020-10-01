/** Função que checa se o valor do input esta vazio.
 * @function required()
 * @param {String} inputValue "Valor a ser verificado."
 * @returns {*Boolen} "'true' caso o valor esteja dentro dos requisitos."
 */
exports.required = (inputValue) => {
  return inputValue;
};

/** Função que checa se o valor do input dentro dos limites especificados.
 * @function size()
 * @param {String} inputValue "Valor a ser verificado."
 * @param {Object} limit "Valores máximos e mínimos que serão usados para a checagem:
 *      -   'max': Quantidade máxima de caracteres.
 *      -   'min': Quantidade mínima de caracteres."
 *      -   'only': Quantidade exata de caracteres."
 * @returns {*Boolen} "'true' caso o valor esteja dentro dos requisitos."
 */
exports.size = (inputValue, limit = { max: null, min: null, only: null }) => {
  if (limit.only && inputValue.length === limit.only) {
    return true;
  }

  if (limit.only && inputValue.length !== limit.only) {
    return false;
  }

  if (
    limit.min &&
    limit.max &&
    inputValue.length >= limit.min &&
    inputValue.length <= limit.max
  )
    return true;

  if (limit.min && !limit.max && inputValue.length >= limit.min) return true;

  if (!limit.min && limit.max && inputValue.length <= limit.max) return true;

  return false;
};

/** Função que checa se o valor do input é o mesmo que algum dos que estão na lista.
 * @function enum()
 * @param {String} inputValue "Valor a ser verificado."
 * @param {*Array} enumValues "Valores que serão usados para realizar a comparação de valores"
 * @returns {*Boolen} "'true' caso o valor esteja dentro dos requisitos."
 */
exports.enum = (inputValue, enumValues) => {
  let result = false;

  enumValues.forEach((value) => {
    if (value === inputValue) result = true;
  });

  return result;
};

/** Função que verifica se o CNPJ é válido.
 * @function cnpj()
 * @param {String} inputValue "Valor a ser verificado."
 * @param {Boolean} ignorePoints "'true' significa que a checagem não deve levar em consideração os pontos."
 */
exports.cnpj = (inputValue, ignorePoints) => {
  if (!ignorePoints) {
    if (
      inputValue[2] !== '.' ||
      inputValue[6] !== '.' ||
      inputValue[10] !== '/' ||
      inputValue[15] !== '-'
    ) {
      return false;
    }
  }

  let cnpj = inputValue.replace(/[^\d]+/g, '');

  if (cnpj === '') return false;
  if (cnpj.length !== 14) return false;
  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return false;
  }

  let cnpjNumbersLength = cnpj.length - 2;
  let cnpjNumbers = cnpj.substring(0, cnpjNumbersLength);
  let cnpjCheckDigit = cnpj.substring(cnpjNumbersLength);
  let calcValue = 0;
  let valueIdentify = cnpjNumbersLength - 7;

  for (let i = cnpjNumbersLength; i >= 1; i--) {
    calcValue += cnpjNumbers.charAt(cnpjNumbersLength - i) * valueIdentify--;
    if (valueIdentify < 2) valueIdentify = 9;
  }

  let calcResult = calcValue % 11 < 2 ? 0 : 11 - (calcValue % 11);

  if (`${calcResult}` !== cnpjCheckDigit.charAt(0)) return false;

  cnpjNumbersLength = cnpjNumbersLength + 1;
  cnpjNumbers = cnpj.substring(0, cnpjNumbersLength);
  calcValue = 0;
  valueIdentify = cnpjNumbersLength - 7;

  for (let i = cnpjNumbersLength; i >= 1; i--) {
    calcValue += cnpjNumbers.charAt(cnpjNumbersLength - i) * valueIdentify--;
    if (valueIdentify < 2) valueIdentify = 9;
  }

  calcResult = calcValue % 11 < 2 ? 0 : 11 - (calcValue % 11);

  if (`${calcResult}` !== cnpjCheckDigit.charAt(1)) return false;

  return true;
};
