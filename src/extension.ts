import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const terminalFontSize = 'terminal.integrated.fontSize';
  const cmds = {
    increaseSize: 'fontshortcuts.increaseTerminalFontSize',
    decreaseSize: 'fontshortcuts.decreaseTerminalFontSize',
    setSize: 'terminalFontSize.openQuickPick'
  };

  function getCurrentSize() {
    const config = vscode.workspace.getConfiguration();
    return config.get<number>(terminalFontSize) || 12;
  }

  async function increaseFontSize() {
    setFontSize(getCurrentSize() + 1);
  }

  async function decreaseFontSize() {
    setFontSize(getCurrentSize() - 1);
  }

  const setFontSize = (newLevel: number): Thenable<void> =>
    vscode.workspace.getConfiguration().update(terminalFontSize, newLevel, true);

  const increaseLabel = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  increaseLabel.text = '+';
  increaseLabel.tooltip = 'Increase Terminal Font Size';
  increaseLabel.command = cmds.increaseSize;
  context.subscriptions.push(increaseLabel);
  increaseLabel.show();

  const setLabel = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  setLabel.text = 'Terminal';
  setLabel.command = cmds.setSize;
  context.subscriptions.push(setLabel);
  setLabel.show();

  const decreaseLabel = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  decreaseLabel.text = '-';
  decreaseLabel.tooltip = 'Decrease Terminal Font Size';
  decreaseLabel.command = cmds.decreaseSize;
  context.subscriptions.push(decreaseLabel);
  decreaseLabel.show();

  async function openQuickPick() {
    const options: vscode.QuickPickItem[] = [{ label: '20' }, { label: '10' }];

    const selection = await vscode.window.showQuickPick(options, {
      placeHolder: 'Please choose a terminal font-size:'
    });

    const newFontSize = selection && selection.label;
    setFontSize(Number(newFontSize));
  }

  context.subscriptions.push(
    vscode.commands.registerCommand(cmds.decreaseSize, () => decreaseFontSize()),
    vscode.commands.registerCommand(cmds.increaseSize, () => increaseFontSize()),
    vscode.commands.registerCommand(cmds.setSize, () => openQuickPick())
  );
}

export function deactivate() {}
