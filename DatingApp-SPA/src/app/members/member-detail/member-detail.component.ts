import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/User.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  gallerOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertifyservice: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.loaduser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.gallerOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview : false
      }
    ];
      this.galleryImages = this.getImages();
  }

getImages() {
    const ImageUrls = [];
    for (let i = 0 ; i < this.user.photos.length ; i++) {
      ImageUrls.push({
        small: this.user.photos[i].url,
        medium : this.user.photos[i].url,
        big : this.user.photos[i].url,
        description : this.user.photos[i].description,
      });
    }
    return ImageUrls;
  }
}
// member/4
//  loaduser() {
//    this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
//      user => {
//      this.user = user;
//     },
//     error => {
//       this.alertifyservice.error(error);
//    }
//   ); // + For Convert to number
