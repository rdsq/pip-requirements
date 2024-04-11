import * as vscode from 'vscode';
import { Parsed, parseLine } from './parser';
import { defaultPath } from './general';

function runCommand(path: string, command: string) {
    const terminal = vscode.window.createTerminal();
    terminal.sendText(`python -m pip ${command} "${path}"`);
    terminal.show();
}

export function focusTemplate(event: any, command: string) {
    if (event) {
        runCommand(event.fsPath, command);
    } else {
        const editor = vscode.window.activeTextEditor;
        if (editor !== undefined) {
            runCommand(editor.document.uri.fsPath, command);
        } else {
            vscode.window.showErrorMessage('You are not focused on any text editor');
        }
    }
}

export function manualTemplate(command: string) {
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

// reexport templates with web support
export { contextTemplate } from './web/templates';
