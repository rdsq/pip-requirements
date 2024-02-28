import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	function fromTemplate(textEditor: any, text: string) {
		if (textEditor) {
			const terminal = vscode.window.createTerminal();
			terminal.sendText(text);
			terminal.show();
		} else {
			vscode.window.showErrorMessage('Cannot run this command. Try to use it by clicking on the icon in pip requirements');
		}
	}
	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.install', (textEditor, edit) => {
		fromTemplate(textEditor, `python -m pip install -r "${textEditor.fsPath}"`);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('pip-requirements.freeze', (textEditor, edit) => {
		fromTemplate(textEditor, `python -m pip freeze > "${textEditor.fsPath}"`);
	}));
}

export function deactivate() {}
