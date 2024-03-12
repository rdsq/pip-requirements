export type Parsed = {
    name: string,
    version?: string
};

export function parseLine(line: string): Parsed | {} {
    const commentPosition = line.indexOf('#');
    if (commentPosition !== -1) {
        line = line.slice(0, commentPosition);
    }
    if (line.trim() !== '') {
        const splited = line.split('==');
        return {
            name: splited[0].trim(),
            version: splited[1].trim()
        };
    }
    return {};
}

export function parseRequirements(content: string) {
    const parsed: string[][] = [];
    for (let row of content.split('\n')) {
        const parsedLine = Object.values(parseLine(row));
        if (parsedLine.length !== 0) {
            parsed.push(parsedLine);
        }
    }
    return parsed;
}