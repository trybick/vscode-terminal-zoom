import * as vscode from 'vscode';

interface IStatusBarItem {
  text: string;
  tooltip: string;
  command: string;
}

const terminalFontSize = 'terminal.integrated.fontSize';
const cmds = {
  increaseSize: 'terminalFontSize.increase',
  decreaseSize: 'terminalFontSize.decrease',
  setSize: 'terminalFontSize.openQuickPick'
};

function createStatusBarItem({ text, tooltip, command }: IStatusBarItem) {
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  item.text = text;
  item.tooltip = tooltip;
  item.command = command;
  item.show();
  return item;
}

const statusBarItems = [
  createStatusBarItem({
    text: '+',
    tooltip: 'Increase Terminal Font Size',
    command: cmds.increaseSize
  }),
  createStatusBarItem({
    text: 'Terminal',
    tooltip: 'Set Terminal Font Size',
    command: cmds.setSize
  }),
  createStatusBarItem({
    text: '-',
    tooltip: 'Decrease Terminal Font Size',
    command: cmds.decreaseSize
  })
];

function getCurrentSize(): number {
  const config = vscode.workspace.getConfiguration();
  return config.get<number>(terminalFontSize) || 12;
}

function increaseFontSize(): void {
  setFontSize(getCurrentSize() + 1);
}

function decreaseFontSize(): void {
  setFontSize(getCurrentSize() - 1);
}

function setFontSize(newSetting: number): void {
  vscode.workspace.getConfiguration().update(terminalFontSize, newSetting, true);
}

async function openQuickPick() {
  const placeHolder = 'Select a font-size for your terminal:';
  const optionsRange = [...Array(25).keys()].filter(i => i >= 8 && i % 2 === 0); // even numbers from 8-24
  const options: vscode.QuickPickItem[] = optionsRange.map(num => {
    return { label: `${num.toString()}-pt` };
  });

  const userSelection = await vscode.window.showQuickPick(options, { placeHolder });
  const newFontSize = userSelection && userSelection.label.slice(0, -3);

  if (newFontSize) {
    setFontSize(Number(newFontSize));
  }
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(cmds.decreaseSize, () => decreaseFontSize()),
    vscode.commands.registerCommand(cmds.increaseSize, () => increaseFontSize()),
    vscode.commands.registerCommand(cmds.setSize, () => openQuickPick()),
    ...statusBarItems
  );
}

export function deactivate() {}
