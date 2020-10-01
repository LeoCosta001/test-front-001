/** Esta função irá ver se o valor inserido no parâmetro é o nome de um tema válido ou não.
 * E inclui a opção de definir uma classe para o elemento <body>.
 * @function checkThemeName()
 * @param {String} themeSelected "Valor que será verificado se é um nome de tema válido"
 * @param {Boolean} setBodyTheme "Se o valor for 'true' então será aplicada uma classe especifica para o
 * elemento <body> que irá variar de acordo com o tema."
 * @return {String} "Se o valor passado no parâmetro for válido então será retornado este mesmo valor,
 * caso contrário será retornado o valor do tema padrão."
 */
exports.checkThemeName = (themeSelected, setBodyTheme) => {
  const themesList = ["light", "dark"];
  let themeName;

  // Verifica se o tema passado como parâmetro corresponde a um tema da lista
  themesList.forEach((value) => {
    if (themeSelected === value) themeName = value;
  });

  // Se nenhum tema válido for passado então será aplicado o tema padrão
  if (!themeName) themeName = themesList[0];

  // Se o parâmetro 'setBodyTheme' for incluído então será aplicada uma classe no elemento <body> de acordo com o tema
  if (setBodyTheme) {
    themesList.forEach((value) => {
      document.body.classList.remove(`global__${value}__theme`);
    });

    document.body.classList.add(`global__${themeName}__theme`);
  }

  localStorage.setItem("theme-color", themeName);
  return themeName;
};
