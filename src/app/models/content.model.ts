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
    value: SliderImages[];
}

export interface SliderImages {
    title: string;
    file: string;
    url: string;
}

export interface FormStepperContent {
    type: 'stepper';
    value: FormContent[];
}

export type FormContent = SelectList | Textarea;

interface SelectList {
    type: 'select';
    value: {
        id: string;
        caption: string;
        options: string[];
        multiple: boolean;
        multiline: boolean;
    };
}

interface Textarea {
    type: 'textarea';
    value: {
        id: string;
        caption: string;
        placeholder: string;
    };
}