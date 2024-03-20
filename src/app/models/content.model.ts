export type Content = MarkupContent | QuoteContent | IFrameContent | ImagesContent;

interface MarkupContent {
    type: 'text';
    value: string;
}

interface QuoteContent {
    type: 'quote';
    value: {
        text: string;
        cite: string;
    };
}

interface IFrameContent {
    type: 'iframe';
    value: {
        src: string;
        title: string;
    };
}

interface ImagesContent {
    type: 'images';
    value: string[];
}
