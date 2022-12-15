export const replaceMulCharInString = (_string, _charToReplace) => {
  const _replaceWith = [];
  _charToReplace.forEach((element) => {
    if (_string.includes(element)) {
      _replaceWith.push(`<strong>${element}</strong>`);
    }
  });
  for (let i = 0; i < _charToReplace.length; i++) {
    _string = _string.replace(
      new RegExp(_charToReplace[i], "gi"),
      _replaceWith[i]
    );
  }
  return _string;
};
