import { getCurrentSize } from './statusBar';
import { QuickPickItem, window } from 'vscode';
import { strings } from './constants';
import { setFontSize } from '../extension';

export async function openQuickPick() {
  const placeHolder = strings.quickPickPlaceholder;
  const optionsRange = [...Array(25).keys()].filter(i => i >= 8 && i % 2 === 0); // even numbers from 8-24
  const options: QuickPickItem[] = optionsRange.map(num => {
    return { label: `$(text-size) ${num.toString()}-pt` };
    // FIXME ^^ the text-size is interferring with setting the number
  });

  options.push({
    label: `$(pencil) Input font-size`
  });

  const userSelection = await window.showQuickPick(options, { placeHolder });

  if (userSelection && userSelection.label === `$(pencil) Input font-size`) {
    const enteredSize = await window.showInputBox({
      prompt: 'Enter custom font-size',
      value: String(getCurrentSize())
    });
    if (undefined !== enteredSize) {
      setFontSize(Number(enteredSize));
    }
    return;
  }

  const newFontSize = userSelection && userSelection.label.slice(0, -3);

  if (newFontSize) {
    setFontSize(Number(newFontSize));
  }
}
