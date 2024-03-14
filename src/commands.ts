import * as vscode from 'vscode';
import { focusTemplate, manualTemplate, contextTemplate } from './templates';

const extName = 'pip-requirements';

export const installCmd = vscode.commands.registerCommand(`${extName}.install`, (event) => {
    focusTemplate(event, 'install -r');
});

export const freezeCmd = vscode.commands.registerCommand(`${extName}.freeze`, (event) => {
    focusTemplate(event, 'freeze >');
});

export const installManual = vscode.commands.registerCommand(`${extName}.install-manual`, () => {
    manualTemplate('install -r');
});

export const freezeManual = vscode.commands.registerCommand(`${extName}.freeze-manual`, () => {
    manualTemplate('freeze >');
});

export const installRow = vscode.commands.registerCommand(`${extName}.install-row`, () => {
    contextTemplate((parsed) => {
        let query = parsed.name;
        if (parsed.version !== null) {
            query += `==${parsed.version}`;
        }
        const terminal = vscode.window.createTerminal();
        terminal.sendText(`python -m pip install ${query}`);
        terminal.show();
    });
});

export const browseRow = vscode.commands.registerCommand(`${extName}.browse-row`, () => {
    contextTemplate((parsed) => {
        const link = `https://pypi.org/project/${parsed.name}/`;
        vscode.env.openExternal(vscode.Uri.parse(link));
    });
});
