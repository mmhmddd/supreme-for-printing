import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-printing-home',
  templateUrl: './printing-home.component.html',
  styleUrls: ['./printing-home.component.scss']
})
export class PrintingHomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('productSlider') productSlider!: ElementRef;



  products = [
    { type: 'Indoor', name: '', image: '../../../assets/image/outdoor1.jpg' },
    { type: 'Outdoor', name: '', image: '../../../assets/image/outdoor2.jpg' },
    { type: 'Indoor', name: '', image: '../../../assets/image/outdoor3.jpg' },
    { type: 'Outdoor', name: '', image: '../../../assets/image/outdoor4.jpg' },
    { type: 'Indoor', name: '', image: '../../../assets/image/outdoor6.jpg' },
    { type: 'Indoor', name: '', image: '../../../assets/image/outdoor7.jpg' },
    { type: 'Indoor', name: '', image: '../../../assets/image/outdoor8.jpg' },
  ];

  private scrollAmount = 0;
  private scrollStep = 220;
  private direction = 1;
  private intervalId: any;

  showModal = false;
  selectedImage: string | null = null;

  contactUs() {
    const whatsappNumber = '+201062157623';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  }

  ngAfterViewInit() {
    if (this.videoElement) {
      this.videoElement.nativeElement.muted = true;
    }
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => this.autoSlide(), 3000); // يتحرك كل 3 ثواني
  }

  autoSlide() {
    const slider = this.productSlider.nativeElement;
    this.scrollAmount += this.scrollStep * this.direction;
    if (this.scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      this.scrollAmount = slider.scrollWidth - slider.clientWidth;
      this.direction = -1; // عكس الاتجاه لما يوصل للنهاية
    } else if (this.scrollAmount <= 0) {
      this.scrollAmount = 0;
      this.direction = 1; // عكس الاتجاه لما يرجع للبداية
    }
    slider.scrollTo({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

  openModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedImage = null;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}