export class PathBuilder {
    constructor(private readonly collectionIds: readonly string[]) {
    }

    at(index: number): string | undefined {
        return this.collectionIds[index];
    }

    build(...docIds: readonly string[]): string {
        if (docIds.length < this.collectionIds.length - 1) {
            throw new Error('Invalid argument: docIds');
        }

        return this.collectionIds
            .flatMap((col, i) => (docIds[i] ? [col, docIds[i]] : [col]))
            .join('/');
    }

    toString(): string {
        return this.build();
    }
}
