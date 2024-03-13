export type Parsed = {
    name: string,
    version: string | null
};

export function parseLine(line: string): Parsed | null {
    const commentPosition = line.indexOf('#');
    if (commentPosition !== -1) {
        line = line.slice(0, commentPosition);
    }
    if (line.trim() !== '') {
        const splited = line.split('==');
        const packageName = splited[0].trim();
        const packageVersion = splited[1].trim();
        return {
            name: packageName,
            version: packageVersion === '' ? null : packageVersion
        };
    }
    return null;
}
