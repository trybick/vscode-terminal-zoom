import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const terminalFontSize = 'terminal.integrated.fontSize';

  function getCurrentSize() {
    const config = vscode.workspace.getConfiguration();
    return config.get<number>(terminalFontSize) || 12;
  }

  async function increaseFontSize() {
    setZoomLevel(getCurrentSize() + 1);
  }

  async function decreaseFontSize() {
    setZoomLevel(getCurrentSize() - 1);
  }

  const setZoomLevel = (newLevel: number): Thenable<void> =>
    vscode.workspace.getConfiguration().update(terminalFontSize, newLevel, true);

  // async function setFontSize() {
  //   vscode.window.showQuickPick(['test', 'test2']);
  // }

  const increaseLabel = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  increaseLabel.text = '+';
  increaseLabel.tooltip = 'Increase Terminal Font Size';
  increaseLabel.command = 'fontshortcuts.increaseTerminalFontSize';
  context.subscriptions.push(increaseLabel);
  increaseLabel.show();

  const resetLabel = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  resetLabel.text = 'Terminal';
  // resetLabel.command = 'fontshortcuts.decreaseTerminalFontSize';
  context.subscriptions.push(resetLabel);
  resetLabel.show();

  const decreaseLabel = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  decreaseLabel.text = '-';
  decreaseLabel.tooltip = 'Decrease Terminal Font Size';
  decreaseLabel.command = 'fontshortcuts.decreaseTerminalFontSize';
  context.subscriptions.push(decreaseLabel);
  decreaseLabel.show();

  context.subscriptions.push(
    vscode.commands.registerCommand('fontshortcuts.decreaseTerminalFontSize', () =>
      decreaseFontSize()
    ),
    vscode.commands.registerCommand('fontshortcuts.increaseTerminalFontSize', () =>
      increaseFontSize()
    )
  );
}

export function deactivate() {}
