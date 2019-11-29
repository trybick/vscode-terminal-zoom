import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const terminalFontSize = 'terminal.integrated.fontSize';

  async function increaseFontSize() {
    const config = vscode.workspace.getConfiguration();
    const currentSize = config.get<number>(terminalFontSize) || 12;
    config.update(terminalFontSize, currentSize + 2, true);
  }

  async function decreaseFontSize() {
    const config = vscode.workspace.getConfiguration();
    const currentSize = config.get<number>(terminalFontSize) || 12;
    config.update(terminalFontSize, currentSize - 2, true);
  }

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
