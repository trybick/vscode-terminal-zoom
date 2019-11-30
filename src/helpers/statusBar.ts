import { StatusBarAlignment, window } from 'vscode';
import { cmds, IStatusBarItem, tooltips } from './constants';

function _createStatusBarItem({ text, tooltip, command }: IStatusBarItem) {
  const item = window.createStatusBarItem(StatusBarAlignment.Right, 100);
  item.text = text;
  item.tooltip = tooltip;
  item.command = command;
  item.show();
  return item;
}

export const statusBarItems = [
  _createStatusBarItem({
    text: '+',
    tooltip: tooltips.increase,
    command: cmds.increaseSize
  }),
  _createStatusBarItem({
    text: 'Terminal',
    tooltip: tooltips.decrease,
    command: cmds.setSize
  }),
  _createStatusBarItem({
    text: '-',
    tooltip: tooltips.set,
    command: cmds.decreaseSize
  })
];
