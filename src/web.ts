import * as vscode from 'vscode';
import { browseRow } from './commands';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(browseRow);
}

export function deactivate() {}
