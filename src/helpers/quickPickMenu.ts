import { getCurrentSize } from './statusBar';
import { QuickPickItem, window } from 'vscode';
import { icons, strings } from './constants';
import { setFontSize } from '../extension';

const placeHolder = strings.quickPickPlaceholder;
const customInputLabel = strings.customInputLabel;

export async function openQuickPick() {
  const options: QuickPickItem[] = _createQuickPickOptions();
  const userSelection: QuickPickItem | undefined = await window.showQuickPick(options, {
    placeHolder
  });

  if (userSelection && userSelection.label === customInputLabel) {
    _openCustomInput();
    return;
  }

  const newFontSize = userSelection && userSelection.label.slice(13, -3);
  if (newFontSize) {
    setFontSize(Number(newFontSize));
  }
}

function _createQuickPickOptions(): QuickPickItem[] {
  const numbers: string[] = [...Array(27).keys()].filter(i => i >= 8).map(String);

  const options: QuickPickItem[] = numbers.map(num => {
    const opt: QuickPickItem = { label: `${icons.typography} ${num}-pt` };
    if (num === getCurrentSize().toString()) {
      opt.description = strings.current;
    }
    return opt;
  });

  options.unshift({
    label: customInputLabel
  });

  return options;
}

async function _openCustomInput() {
  const enteredSize = await window.showInputBox({
    prompt: strings.customSizePrompt,
    value: String(getCurrentSize())
  });

  if (enteredSize) {
    setFontSize(Number(enteredSize));
  }
}
