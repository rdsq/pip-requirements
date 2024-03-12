import * as vscode from "vscode";
import { parseRequirements } from './parser';

export default function showWebView() {
    const editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
        vscode.window.showErrorMessage('You are not focused on any text editor');
    } else {
        const parsed = parseRequirements(editor.document.getText());
        const renderedList: string[] = [];
        for (let element of parsed) {
            let content = `<span class="package">${element[0]}</span>`;
            if (element[1] !== undefined) {
                content += `<span class="version">${element[1]}</span>`;
            }
            renderedList.push(content);
        }
        const document =
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                .package {
                    background-color: #808080a2;
                    border-radius: 4px;
                }
                .version {
                    background-color: #8080804d;
                    border-radius: 4px;
                }
            </style>
            <title>${editor.document.fileName}</title>
        </head>
        <body>
            ${renderedList.join('<br>\n')}
        </body>
        </html>`;
        const view = vscode.window.createWebviewPanel(
            'requirementsRender',
            editor.document.fileName,
            vscode.ViewColumn.Beside
        );
        view.webview.html = document;
    }
}
