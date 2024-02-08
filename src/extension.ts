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

  // This only fires when a terminal is trashed, not when the panel is closed so
  // it's currently possible to have no terminals visible and still see the
  // status bar items. Ideally we'd have a way to check if the terminal panel is
  // open.
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
