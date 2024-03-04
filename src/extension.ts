import * as vscode from 'vscode';

const defaultPath = 'requirements.txt';

export function activate(context: vscode.ExtensionContext) {
	function runCommand(path: string, command: string) {
		const terminal = vscode.window.createTerminal();
		terminal.sendText(`python -m pip ${command} "${path}"`);
		terminal.show();
	}
	function focusTemplate(textEditor: any, command: string) {
		if (textEditor) {
			runCommand(textEditor.fsPath, command);
		} else {
			const editor = vscode.window.activeTextEditor;
			if (editor !== undefined) {
				runCommand(editor.document.uri.fsPath, command);
			} else {
				vscode.window.showErrorMessage('You are not focused on any text editor');
			}
		}
	}
	function manualTemplate(command: string) {
		const ignoreFocusOutSetting: boolean = vscode.workspace.getConfiguration(
			'pip-requirements'
		).get('ignoreFocusOut')!;
		vscode.window.showInputBox({
			title: 'Path to the requirements.txt file',
			value: defaultPath,
			placeHolder: defaultPath,
			ignoreFocusOut: ignoreFocusOutSetting
		}).then(path => {
			if (path !== undefined) {
				if (path === '') {
					path = defaultPath;
				}
				runCommand(path, command);
			}
		});
	}
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
