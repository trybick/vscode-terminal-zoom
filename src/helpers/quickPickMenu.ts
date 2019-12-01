import { getCurrentSize } from './statusBar';
import { QuickPickItem, window } from 'vscode';
import { icons, strings } from './constants';
import { setFontSize } from '../extension';

const placeHolder = strings.quickPickPlaceholder;
const customInputLabel = strings.customInputLabel;

export async function openQuickPick() {
  const options = _createQuickPickOptions();
  const userSelection = await window.showQuickPick(options, { placeHolder });

  if (userSelection && userSelection.label === customInputLabel) {
    openCustomInput();
    return;
  }

  const newFontSize = userSelection && userSelection.label.slice(13, -3);
  if (newFontSize) {
    setFontSize(Number(newFontSize));
  }
}

function _createQuickPickOptions() {
  // Create array of 8-26
  const numbers = [...Array(27).keys()].filter(i => i >= 8).map(String);

  // Populate array
  const options: QuickPickItem[] = numbers.map(num => {
    const opt: QuickPickItem = { label: `${icons.typography} ${num}-pt` };

    // Tag the current size
    if (num === getCurrentSize().toString()) {
      opt.description = strings.current;
    }

    return opt;
  });

  // Add custom input
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
