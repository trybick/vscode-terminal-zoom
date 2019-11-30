import { commands, ExtensionContext, workspace } from 'vscode';
import { cmds, strings } from './helpers/constants';
import { statusBarItems } from './helpers/statusBar';
import { openQuickPick } from './helpers/quickPickMenu';

function getCurrentSize(): number {
  const config = workspace.getConfiguration();
  return config.get<number>(strings.terminalFontSize) || 12;
}

function increaseFontSize(): void {
  setFontSize(getCurrentSize() + 1);
}

function decreaseFontSize(): void {
  setFontSize(getCurrentSize() - 1);
}

export function setFontSize(newSetting: number): void {
  workspace.getConfiguration().update(strings.terminalFontSize, newSetting, true);
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(cmds.decreaseSize, () => decreaseFontSize()),
    commands.registerCommand(cmds.increaseSize, () => increaseFontSize()),
    commands.registerCommand(cmds.setSize, () => openQuickPick()),
    ...statusBarItems
  );
}

export function deactivate() {}
