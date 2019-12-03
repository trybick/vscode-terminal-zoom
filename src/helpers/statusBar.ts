import { StatusBarAlignment, StatusBarItem, window, workspace } from 'vscode';
import { cmds, IStatusBarItem, strings, tooltips } from './constants';

export function getCurrentSize(): number {
  const config = workspace.getConfiguration();
  return config.get<number>(strings.terminalFontSize) || 12;
}

function _createStatusBarItem({ text, tooltip, command, priority }: IStatusBarItem): StatusBarItem {
  const item = window.createStatusBarItem(StatusBarAlignment.Right, priority);
  item.text = text;
  item.tooltip = tooltip;
  item.command = command;

  return item;
}

export const statusBarItems = [
  _createStatusBarItem({
    text: '+',
    tooltip: tooltips.increase,
    command: cmds.increaseSize,
    priority: 999997
  }),
  _createStatusBarItem({
    text: `Terminal ${getCurrentSize()}-pt`,
    tooltip: tooltips.set,
    command: cmds.setSize,
    priority: 999998
  }),
  _createStatusBarItem({
    text: '-',
    tooltip: tooltips.decrease,
    command: cmds.decreaseSize,
    priority: 999999
  })
];

export function updateStatusBar() {
  statusBarItems[1].text = `Terminal ${getCurrentSize()}-pt`;
}
