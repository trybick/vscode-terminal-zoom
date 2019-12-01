import { getCurrentSize } from './statusBar';
import { QuickPickItem, window } from 'vscode';
import { strings } from './constants';
import { setFontSize } from '../extension';

const placeHolder = strings.quickPickPlaceholder;
const customInputLabel = strings.customInputLabel;

export async function openQuickPick() {
  const options = _createQuickPickOptions();
  const userSelection = await window.showQuickPick(options, { placeHolder });

  // If "custom size" is chosen
  if (userSelection && userSelection.label === customInputLabel) {
    openCustomInput();
    return;
  }

  // If number is selected, extract number from string
  const newFontSize = userSelection && userSelection.label.slice(13, -3);
  if (newFontSize) {
    setFontSize(Number(newFontSize));
  }
}

function _createQuickPickOptions() {
  // Create array of even numbers 8-24
  const numbers = [...Array(25).keys()].filter(i => i >= 8 && i % 2 === 0);
  // Each item becomes a quick pick label containing its number
  const options: QuickPickItem[] = numbers.map(n => {
    return { label: `$(text-size) ${n.toString()}-pt` };
  });
  // Add "custom size" option
  options.unshift({
    label: customInputLabel
  });

  return options;
}

async function openCustomInput() {
  const enteredSize = await window.showInputBox({
    prompt: strings.customSizePrompt,
    value: String(getCurrentSize())
  });
  if (enteredSize) {
    setFontSize(Number(enteredSize));
  }
}
