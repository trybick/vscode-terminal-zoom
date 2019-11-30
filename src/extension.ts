import * as vscode from 'vscode';
import { cmds, strings } from './helpers/constants';
import { statusBarItems } from './helpers/statusBar';
import { openQuickPick } from './helpers/quickPickMenu';

function getCurrentSize(): number {
  const config = vscode.workspace.getConfiguration();
  return config.get<number>(strings.terminalFontSize) || 12;
}

function increaseFontSize(): void {
  setFontSize(getCurrentSize() + 1);
}

function decreaseFontSize(): void {
  setFontSize(getCurrentSize() - 1);
}

export function setFontSize(newSetting: number): void {
  vscode.workspace.getConfiguration().update(strings.terminalFontSize, newSetting, true);
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
