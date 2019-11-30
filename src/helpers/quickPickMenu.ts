import { QuickPickItem, window } from 'vscode';
import { strings } from './constants';
import { setFontSize } from '../extension';

export async function openQuickPick() {
  const placeHolder = strings.quickPickPlaceholder;
  const optionsRange = [...Array(25).keys()].filter(i => i >= 8 && i % 2 === 0); // even numbers from 8-24
  const options: QuickPickItem[] = optionsRange.map(num => {
    return { label: `${num.toString()}-pt` };
  });

  const userSelection = await window.showQuickPick(options, { placeHolder });
  const newFontSize = userSelection && userSelection.label.slice(0, -3);

  if (newFontSize) {
    setFontSize(Number(newFontSize));
  }
}
