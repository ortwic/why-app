import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { SliderImages } from '../../models/content.model';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './image-slider.component.html',
  styleUrls: [
    '../../../../node_modules/keen-slider/keen-slider.min.css',
    './image-slider.component.scss'
  ]
})
export class ImageSliderComponent {
  @Input('images') images = [] as SliderImages[];
  @Input('height') height = '300px';

  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;

  slider!: KeenSliderInstance;

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      mode: "free-snap",
      loop: true,      
      slides: {
        origin: "center",
        perView: 1.25,
        spacing: 15,
      },
    });
  }

  ngOnDestroy() {
    this.slider?.destroy();
  }
}
