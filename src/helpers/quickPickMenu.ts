import { getCurrentSize } from './statusBar';
import { QuickPickItem, window } from 'vscode';
import { strings } from './constants';
import { setFontSize } from '../extension';

export async function openQuickPick() {
  const placeHolder = strings.quickPickPlaceholder;
  const customInputLabel = strings.customInputLabel;

  // Create array of even numbers 8-24
  const optionsRange = [...Array(25).keys()].filter(i => i >= 8 && i % 2 === 0);
  // Populate array
  const options: QuickPickItem[] = optionsRange.map(num => {
    return { label: `$(text-size) ${num.toString()}-pt` };
  });
  // Add "custom" option
  options.unshift({
    label: customInputLabel
  });

  // Show QuickPick menu
  const userSelection = await window.showQuickPick(options, { placeHolder });

  // If "Custom size" is chosen
  if (userSelection && userSelection.label === customInputLabel) {
    openCustomInput();
    return;
  }

  // Extract number
  const newFontSize = userSelection && userSelection.label.slice(13, -3);

  if (newFontSize) {
    setFontSize(Number(newFontSize));
  }
}

async function openCustomInput() {
  const enteredSize = await window.showInputBox({
    prompt: 'Enter custom font-size',
    value: String(getCurrentSize())
  });
  if (enteredSize) {
    setFontSize(Number(enteredSize));
  }
}
