import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        animate('1s ease-in-out', keyframes([
          style({ transform: 'translateX(-20px)', opacity: 0, offset: 0 }),
          style({ transform: 'translateX(20px)', opacity: 1, offset: 0.5 }),
          style({ transform: 'translateX(0)', opacity: 1, offset: 1 })
        ]))
      ])
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
slideLeft() {
throw new Error('Method not implemented.');
}
slideRight() {
throw new Error('Method not implemented.');
}
  @ViewChild('clientSlider') clientSlider!: ElementRef;
  @ViewChild('productSlider') productSlider!: ElementRef;
  @ViewChild('videoElement') videoElement!: ElementRef;

  clients = [
    { name: 'Red Cross Organization', image: 'assets/image/Red Cross Organization.svg' },
    { name: 'Dream Land', image: 'assets/image/dream-land-logo.jpg' },
    { name: 'Banque Misr', image: 'assets/image/Banque Misr.png' },
    { name: 'Al Tadamun Finance Corporation', image: 'assets/image/tdamunlogo.svg' },
    { name: 'Modern Building Chemicals - Dari', image: 'assets/image/Modern Building Chemicals.png' },
    { name: 'Al Shroouk Scan', image: 'assets/image/Al Shroouk Scan.png' },
    { name: 'Kalemat', image: 'assets/image/kalemat.png' },
    { name: 'IDF', image: 'assets/image/idf.png' },
    { name: 'Insha', image: 'assets/image/insha.png' },
    { name: 'El Abd Patisserie', image: 'assets/image/El Abd Patisserie.png' },
    { name: 'Maven Development', image: 'assets/image/Maven Development.png' },
    { name: 'ISIS and Sekem', image: 'assets/image/ISIS and Sekem.png' },
    { name: 'Mega Scan', image: 'assets/image/Mega Scan.webp' },
    { name: 'Unitec', image: 'assets/image/Unitec.png' },
    { name: 'Global Napi Pharmaceuticals', image: 'assets/image/logoWithTextTransparent.png' }
  ];

  products = [
    { type: 'T-shirts', name: 'T-shirts', image: 'assets/image/product7.png' },
    { type: 'CUP', name: 'CUP', image: '../../../assets/image/product2.png' },
    { type: 'BAG', name: 'BAG', image: '../../../assets/image/product3.png' },
    { type: 'BAG', name: 'BAG', image: '../../../assets/image/product4.png' },
    { type: 'shield', name: 'shield', image: '../../../assets/image/product5.png' },
    { type: 'PENS', name: 'PENS', image: '../../../assets/image/product6.png' },
    { type: 'T-shirts', name: 'T-shirts', image: '../../../assets/image/product8.png' }
  ];


  private clientScrollAmount = 0;
  private clientScrollStep = 200;
  private clientDirection = 2;
  private clientIntervalId: any;

  private productScrollAmount = 0;
  private productScrollStep = 220;
  private productDirection = 1;
  private productIntervalId: any;

  showModal = false;
  selectedImage: string | null = null;

  ngAfterViewInit() {
    if (this.videoElement) {
      this.videoElement.nativeElement.muted = true;
    }
    this.startAutoSlideClients();
    this.startAutoSlideProducts();
  }

  // --- CLIENT SLIDER ---
  slideLeftClients() {
    const slider = this.clientSlider.nativeElement;
    this.clientScrollAmount -= this.clientScrollStep;
    if (this.clientScrollAmount < 0) {
      this.clientScrollAmount = 0;
      this.clientDirection = 1;
    }
    slider.scrollTo({ left: this.clientScrollAmount, behavior: 'smooth' });
  }

  slideRightClients() {
    const slider = this.clientSlider.nativeElement;
    this.clientScrollAmount += this.clientScrollStep;
    if (this.clientScrollAmount > (slider.scrollWidth - slider.clientWidth)) {
      this.clientScrollAmount = slider.scrollWidth - slider.clientWidth;
      this.clientDirection = -1;
    }
    slider.scrollTo({ left: this.clientScrollAmount, behavior: 'smooth' });
  }

  private autoSlideClients() {
    this.clientDirection === 1 ? this.slideRightClients() : this.slideLeftClients();
  }

  private startAutoSlideClients() {
    this.clientIntervalId = setInterval(() => this.autoSlideClients(), 2300);
  }

  // --- PRODUCT SLIDER ---
  slideLeftProducts() {
    const slider = this.productSlider.nativeElement;
    this.productScrollAmount -= this.productScrollStep;
    if (this.productScrollAmount < 0) {
      this.productScrollAmount = 0;
      this.productDirection = 1;
    }
    slider.scrollTo({ left: this.productScrollAmount, behavior: 'smooth' });
  }

  slideRightProducts() {
    const slider = this.productSlider.nativeElement;
    this.productScrollAmount += this.productScrollStep;
    if (this.productScrollAmount > (slider.scrollWidth - slider.clientWidth)) {
      this.productScrollAmount = slider.scrollWidth - slider.clientWidth;
      this.productDirection = -1;
    }
    slider.scrollTo({ left: this.productScrollAmount, behavior: 'smooth' });
  }

  private autoSlideProducts() {
    this.productDirection === 1 ? this.slideRightProducts() : this.slideLeftProducts();
  }

  private startAutoSlideProducts() {
    this.productIntervalId = setInterval(() => this.autoSlideProducts(), 3000);
  }

  // --- MODAL ---
  openModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.showModal = true;
  }

  closeModal(event?: MouseEvent) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal')) {
        this.showModal = false;
        this.selectedImage = null;
      }
    } else {
      this.showModal = false;
      this.selectedImage = null;
    }
  }

  contactUs() {
    const whatsappNumber = '+201062157623';
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  }

  ngOnDestroy() {
    clearInterval(this.clientIntervalId);
    clearInterval(this.productIntervalId);
  }
}
