import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
    selector: '[immediateClick]',
})
export class ImmadiateClickDirective implements OnInit { 

    constructor(
        private element: ElementRef<any>,
        private platFormDetector: PlatformDetectorService
    ){ }

    ngOnInit(): void {
        this.platFormDetector.isPlataformBrowser &&
        this.element.nativeElement.click();
    }
}