import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}


// * Version 2 *

// let myStatusBarItem: vscode.StatusBarItem;

// export function activate({ subscriptions }: vscode.ExtensionContext) {

// 	// register a command that is invoked when the status bar item is selected
// 	const myCommandId = 'sample.showSelectionCount';
// 	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
// 		let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
// 		vscode.window.showInformationMessage(`Yeah, ${n} line(s) selected... Keep going!`);
// 	}));

// 	// create a new status bar item that we can now manage
// 	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
// 	myStatusBarItem.command = myCommandId;
// 	subscriptions.push(myStatusBarItem);
// 	console.log('subscriptions:', subscriptions)

// 	// register some listener that make sure the status bar item always up-to-date
// 	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
// 	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

// 	// update status bar item once at start
// 	updateStatusBarItem();
// }

// function updateStatusBarItem(): void {
// 	let n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
// 	if (n > 0) {
// 		myStatusBarItem.text = `$(megaphone) ${n} line(s) selected`;
// 		myStatusBarItem.show();
// 	} else {
// 		myStatusBarItem.hide();
// 	}
// }

// function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
// 	let lines = 0;
// 	if (editor) {
// 		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
// 	}
// 	return lines;
// }