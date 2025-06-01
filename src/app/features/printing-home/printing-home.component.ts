import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-printing-home',
  templateUrl: './printing-home.component.html',
  styleUrls: ['./printing-home.component.scss']
})
export class PrintingHomeComponent implements AfterViewInit {
  works = [
    { title: 'Custom Banner', image: '../../../assets/image/outdoor1.png' },
    { title: 'Flyer Design', image: '../../../assets/image/banner.jpg' },
    { title: 'Poster Creation', image: '../../../assets/image/poster.jpg' }
  ];

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  contactUs() {
    const whatsappNumber = '+201062157623';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  }

  ngAfterViewInit() {
    if (this.videoElement) {
      this.videoElement.nativeElement.muted = true; // Ensure video is muted
    }
  }
}