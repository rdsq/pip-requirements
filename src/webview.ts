import * as vscode from "vscode";

function parseRequirements(content: string) {
    const parsed: string[][] = [];
    for (let row of content.split('\n')) {
        const commentPosition = row.indexOf('#');
        if (commentPosition !== -1) {
            row = row.slice(0, commentPosition);
        }
        if (row.trim() !== '') {
            const splited = row.split('==');
            parsed.push([
                splited[0].trim(),
                splited[1].trim()
            ]);
        }
    }
    return parsed;
}

export default function showWebView(textEditor: any) {
    const editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
        vscode.window.showErrorMessage('You are not focused on any text editor');
    } else {
        const parsed = parseRequirements(editor.document.getText());
        const renderedList: string[] = [];
        for (let element of parsed) {
            renderedList.push(
                `<span class="package">${element[0]}</span>`
                + (element[1] !== undefined) ? `<span class="version>${element[1]}</span>`: ''
            );
        }
        const document =
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            ${renderedList.join('\n')}
        </body>
        </html>`;
    }
}
