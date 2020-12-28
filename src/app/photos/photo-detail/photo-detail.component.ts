import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Photo } from '../photo/photo';
import { PhotoComment } from '../photo/photo-comment';
import { PhotoService } from '../photo/photo.service';

@Component({
  templateUrl: './photo-detail.component.html'
})
export class PhotoDetailComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(() => {}, err => {
      this.router.navigate(['not-found']);
    });
  }

  remove() {
    this.photoService
      .removePhoto(this.photoId)
      .subscribe(
        () => {
          this.alertService.success("Photo removed")
          this.router.navigate([''], {replaceUrl: true});
        },
        err => {
          this.alertService.warning("Could not delete the photo!");
        });
  }

  like(photo: Photo) {
    this.photoService.like(photo.id)
      .subscribe(liked => {
        if(liked) {
          this.photo$ = this.photoService.findById(photo.id);
        }
      });
  }

}
