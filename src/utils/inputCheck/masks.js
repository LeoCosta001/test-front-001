/** Força uma sintaxe especifica para a string recebida (Sintaxe: "00.000.000/0000-00")
 * @method autoComplete
 * String que corresponde ao número que será verificado
 * @param {String} inputValue "Valor a ser verificado."
 * @return {String} "Resultado final"
 * ### Regras ###
 * 1 - Só é possivel números.
 * 2 - A quantidade máxima de caracteres é 14 números + 4 pontuação (total = 18).
 */
exports.cnpj = (inputValue) => {
  let cnpjNumber = inputValue.replace(/\D/g, '');
  let cnpjSize = cnpjNumber.length;
  if (cnpjSize === 0) {
    return '';
  } else if (cnpjSize === 1 || cnpjSize === 2) {
    return `${cnpjNumber}`;
  } else if (cnpjSize >= 3 && cnpjSize <= 5) {
    return `${cnpjNumber.slice(0, 2)}.${cnpjNumber.slice(2, 5)}`;
  } else if (cnpjSize >= 6 && cnpjSize <= 8) {
    return `${cnpjNumber.slice(0, 2)}.${cnpjNumber.slice(
      2,
      5
    )}.${cnpjNumber.slice(5, 8)}`;
  } else if (cnpjSize >= 9 && cnpjSize <= 12) {
    return `${cnpjNumber.slice(0, 2)}.${cnpjNumber.slice(
      2,
      5
    )}.${cnpjNumber.slice(5, 8)}/${cnpjNumber.slice(8, 12)}`;
  } else if (cnpjSize >= 13) {
    return `${cnpjNumber.slice(0, 2)}.${cnpjNumber.slice(
      2,
      5
    )}.${cnpjNumber.slice(5, 8)}/${cnpjNumber.slice(8, 12)}-${cnpjNumber.slice(
      12,
      14
    )}`;
  }
};
