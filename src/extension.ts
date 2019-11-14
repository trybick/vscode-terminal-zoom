import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let main = vscode.commands.registerCommand(
    "extension.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World!");

      const result = vscode.window.createStatusBarItem();
      result.text = "test";
      console.log("result:", result);
    }
  );

  context.subscriptions.push(main);
}

// this method is called when your extension is deactivated
export function deactivate() {}
