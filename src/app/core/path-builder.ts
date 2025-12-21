export class PathBuilder implements ArrayLike<string> {
    [n: number]: string;
    readonly length: number;

    constructor(private readonly collectionIds: readonly string[]) {
        this.length = collectionIds.length;
        collectionIds.forEach((id, i) => {
            this[i] = id;
        });
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
