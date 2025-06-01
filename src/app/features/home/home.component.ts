import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('clientSlider') clientSlider!: ElementRef;

  clients = [
    { name: 'Red Cross Organization', image: 'assets/image/Red Cross Organization.svg' },
    { name: 'Dream Land', image: 'assets/image/dream-land-logo.jpg' },
    { name: 'Banque Misr', image: 'assets/image/Banque Misr.png' },
    { name: 'Al Tadamun Finance Corporation', image: 'assets/image/tdamunlogo.svg' },
    { name: 'Modern Building Chemicals - Dari', image: 'assets/image/Modern Building Chemicals.png' },
    { name: 'Al Shroouk Scan', image: 'assets/image/Al Shroouk Scan.png' },
    { name: 'El Abd Patisserie', image: 'assets/image/El Abd Patisserie.png' },
    { name: 'Maven Development', image: 'assets/image/Maven Development.png' },
    { name: 'ISIS and Sekem', image: 'assets/image/ISIS and Sekem.png' },
    { name: 'Mega Scan', image: 'assets/image/Mega Scan.webp' },
    { name: 'Unitec', image: 'assets/image/Unitec.png' },
    { name: 'Global Napi Pharmaceuticals', image: 'assets/image/logoWithTextTransparent.png' }
  ];

  private scrollAmount = 0;
  private scrollStep = 200; // Amount to scroll per step (adjust as needed)
  private direction = 2; // 1 for right, -1 for left
  private intervalId: any;

  ngAfterViewInit() {
    this.startAutoSlide();
  }

  slideLeft() {
    const slider = this.clientSlider.nativeElement;
    this.scrollAmount -= this.scrollStep;
    if (this.scrollAmount < 0) {
      this.scrollAmount = 0;
      this.direction = 1; // Switch to right
    }
    slider.scrollTo({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

  slideRight() {
    const slider = this.clientSlider.nativeElement;
    this.scrollAmount += this.scrollStep;
    if (this.scrollAmount > (slider.scrollWidth - slider.clientWidth)) {
      this.scrollAmount = slider.scrollWidth - slider.clientWidth;
      this.direction = -1; // Switch to left
    }
    slider.scrollTo({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

  private autoSlide() {
    if (this.direction === 1) {
      this.slideRight();
    } else {
      this.slideLeft();
    }
  }

  private startAutoSlide() {
    this.intervalId = setInterval(() => this.autoSlide(), 2300); // Auto-slide every 3 seconds
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clean up interval on component destroy
    }
  }
}