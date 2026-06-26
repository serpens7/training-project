type ScrollByPath = Record<string, number>;

const scrollByPath: ScrollByPath = {};

export const scrollSaver = {
    getScroll(path: string): number {
        return scrollByPath[path] ?? 0;
    },
    setScroll(path: string, position: number): void {
        scrollByPath[path] = position;
    },
};
