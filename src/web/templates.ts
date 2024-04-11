import * as vscode from 'vscode';
import { Parsed, parseLine } from '../parser';

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