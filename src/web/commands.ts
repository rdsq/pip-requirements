import * as vscode from 'vscode';
import { contextTemplate } from './templates';
import { extName } from '../general';

export const browseRow = vscode.commands.registerCommand(`${extName}.browse-row`, () => {
    contextTemplate((parsed) => {
        const link = `https://pypi.org/project/${parsed.name}/`;
        vscode.env.openExternal(vscode.Uri.parse(link));
    });
});