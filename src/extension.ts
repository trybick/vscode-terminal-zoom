import { commands, ExtensionContext, workspace, window } from 'vscode';
import { cmds, strings } from './helpers/constants';
import {
  getCurrentSize,
  hideStatusBarItems,
  showStatusBarItems,
  statusBarItems,
  updateStatusBar,
} from './helpers/statusBar';
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

function registerListeners() {
  workspace.onDidChangeConfiguration(updateStatusBar);
  window.onDidOpenTerminal(showStatusBarItems);
  window.onDidCloseTerminal(() => {
    if (!window.terminals.length) {
      hideStatusBarItems();
    }
  });
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(cmds.decreaseSize, () => decreaseFontSize()),
    commands.registerCommand(cmds.increaseSize, () => increaseFontSize()),
    commands.registerCommand(cmds.setSize, () => openQuickPick()),
    ...statusBarItems
  );

  if (window.terminals.length) {
    showStatusBarItems();
  }

  registerListeners();
}

export function deactivate() {}
