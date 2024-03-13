import * as vscode from 'vscode';
import { focusTemplate, manualTemplate } from './templates';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.install', (textEditor, edit) => {
		focusTemplate(textEditor, 'install -r');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.freeze', (textEditor, edit) => {
		focusTemplate(textEditor, 'freeze >');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.install-manual', () => {
		manualTemplate('install -r');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.freeze-manual', () => {
		manualTemplate('freeze >');
	}));
}

export function deactivate() {}
