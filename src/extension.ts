import { commands, ExtensionContext, workspace } from 'vscode';
import { cmds, strings } from './helpers/constants';
import { getCurrentSize, statusBarItems, updateStatusBar } from './helpers/statusBar';
import { openQuickPick } from './helpers/quickPickMenu';

function increaseFontSize() {
  setFontSize(getCurrentSize() + 1);
}

function decreaseFontSize() {
  setFontSize(getCurrentSize() - 1);
}

export function setFontSize(newSetting: number) {
  workspace.getConfiguration().update(strings.terminalFontSize, newSetting, true);
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(cmds.decreaseSize, () => decreaseFontSize()),
    commands.registerCommand(cmds.increaseSize, () => increaseFontSize()),
    commands.registerCommand(cmds.setSize, () => openQuickPick()),
    ...statusBarItems
  );

  workspace.onDidChangeConfiguration(() => updateStatusBar());
}

export function deactivate() {}
