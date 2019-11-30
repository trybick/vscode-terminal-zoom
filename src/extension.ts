import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const terminalFontSize = 'terminal.integrated.fontSize';
  const cmds = {
    increaseSize: 'terminalFontSize.increase',
    decreaseSize: 'terminalFontSize.decrease',
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

  const setFontSize = (newSetting: number): Thenable<void> =>
    vscode.workspace.getConfiguration().update(terminalFontSize, newSetting, true);

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

  context.subscriptions.push(
    vscode.commands.registerCommand(cmds.decreaseSize, () => decreaseFontSize()),
    vscode.commands.registerCommand(cmds.increaseSize, () => increaseFontSize()),
    vscode.commands.registerCommand(cmds.setSize, () => openQuickPick())
  );
}

export function deactivate() {}
