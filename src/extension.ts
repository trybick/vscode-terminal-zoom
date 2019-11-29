import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World!');
    })
  );

  const config = vscode.workspace.getConfiguration();
	const fontSize = config.get<number>('terminal.integrated.fontSize') || 12;
  config.update('terminal.integrated.fontSize', (fontSize + 5), true);





	
  // Functions created above will be used here
  // context.subscriptions.push(
  //   vscode.commands.registerCommand(
  //     'fontshortcuts.increaseTerminalFontSize',
  //     () => increaseFontSize(true) // replace this function
  //   ),
  //   vscode.commands.registerCommand(
  //     'fontshortcuts.decreaseTerminalFontSize',
  //     () => decreaseFontSize(true)
  //   )
  // );
}

export function deactivate() {}
