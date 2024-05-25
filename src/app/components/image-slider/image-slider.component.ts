import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { SliderImage } from '../../models/content.model';
import { MediaStorageService } from '../../services/common/media-storage.service';

@Component({
    selector: 'app-image-slider',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './image-slider.component.html',
    styleUrls: ['../../../../node_modules/keen-slider/keen-slider.min.css', './image-slider.component.scss'],
})
export class ImageSliderComponent {
    private readonly _storageService = inject(MediaStorageService);

    images = input([] as SliderImage[]);
    height = input('300px');
    sliderRef = viewChild<ElementRef<HTMLElement>>('sliderRef');

    slider!: KeenSliderInstance;
    images$!: Promise<Omit<SliderImage, 'file'>[]>;

    ngOnInit() {
        this.images$ = Promise.all(this.images().map((img) => this.resolveUrl(img))).finally(() =>
            setTimeout(this.slider.update, 0)
        );
    }

    ngAfterViewInit() {
        this.slider = new KeenSlider(this.sliderRef()!.nativeElement, {
            mode: 'free-snap',
            loop: true,
            slides: {
                origin: 'center',
                perView: 1.25,
                spacing: 15,
            },
        });
    }

    ngOnDestroy() {
        this.slider?.destroy();
    }

    private async resolveUrl({ title, file, url }: SliderImage) {
        url = file ? await this._storageService.downloadUrl(file) : url;
        return { title, url };
    }
}
