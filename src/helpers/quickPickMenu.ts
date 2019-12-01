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
  // Create array with 8-26
  const numbers = [...Array(27).keys()].filter(i => i >= 8).map(String);
  const options: QuickPickItem[] = numbers.map(num => {
    return { label: `$(text-size) ${num}-pt` };
  });

  const options2: QuickPickItem[] = options.map(num => {
    if (num.label.slice(13, -3) === getCurrentSize().toString()) {
      num.description = '(current)';
      return num;
    }
    return num;
  });

  // Add "custom size" option
  options2.unshift({
    label: customInputLabel
  });

  return options2;
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
