'use babel';
/**
 * Function to convert json range to atom Range.
 * @param  {object} jsonRange - FileMark Range from json
 * @return {Range} Range in atom format
 */
export function getAtomRange(jsonRange) {
  return [
    getAtomPoint(jsonRange.start),
    getAtomPoint(jsonRange.end)
  ];
}
/**
 * Function to convert json  point to atom Point.
 * @param  {object} jsonPoint - FileMark Point form json
 * @return {Point} Point in atom format.
 */
export function getAtomPoint(jsonPoint) {
  return [jsonPoint.line, jsonPoint.character];
}

/**
 * Function that returns file path of acrive editor.
 * @return {string} Absolute file path.
 */
export function getCurrentFilePath() {
  let textEditor = atom.workspace.getActiveTextEditor();
  if (textEditor !== undefined) {
    return textEditor.getPath();
  } else {
    return '';
  }
}
