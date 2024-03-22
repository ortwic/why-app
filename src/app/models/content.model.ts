export interface MarkdownContent {
    type: 'text';
    value: string;
}

export interface QuoteContent {
    type: 'quote';
    value: {
        text: string;
        cite: string;
    };
}

export interface IFrameContent {
    type: 'iframe';
    value: {
        src: string;
        title: string;
    };
}

export interface ImagesContent {
    type: 'images';
    value: string[];
}

export interface SectionContent {
    type: 'section';
    value: {
        title: string;
        content: string; // Markdown
        link: string; // URL
        image: string; // URL
    }
}

export interface SliderContent {
    type: 'slider';
    value: Array<{
        title: string;
        image: string;
    }>;
}

export interface StepperContent {
    type: 'content';
    value: Array<SelectList | Textarea>;
}

interface SelectList {
    type: 'select';
    value: {
        caption: string;
        options: string[];
    };
}

interface Textarea {
    type: 'textarea';
    value: {
        caption: string;
        placeholder: string;
    };
}