import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "pip-requirements" is now active!');

	let disposable = vscode.commands.registerCommand('pip-requirements.install', () => {
		vscode.window.showInformationMessage('Hello World from pip requirements!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
