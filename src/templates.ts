import * as vscode from 'vscode';
import { Parsed, parseLine } from './parser';

const defaultPath = 'requirements.txt';

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

type actionFunc = (parsed: Parsed) => void;

export function contextTemplate(action: actionFunc) {
    const editor = vscode.window.activeTextEditor;
    // Check if the action was triggered from a text editor
    if (editor) {
        const line = editor.selection.isEmpty ? editor.selection.active : editor.selection.start;
        const text = editor.document.lineAt(line).text;
        const parsed = parseLine(text);
        if (parsed === null) {
            vscode.window.showErrorMessage(
                'Pip package was not found on that line'
            );
        } else {
            action(parsed);
        }
    } else {
        vscode.window.showErrorMessage(
            'You are not focused on any text editor'
        );
    }
}
