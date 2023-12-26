import { Component, OnInit } from '@angular/core';
import { Equipment } from '../model/equipment.model';
import { Profile } from '../model/profile.model';
import { HttpClient } from '@angular/common/http';
import { AdministrationService } from '../administration.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthorReview } from '../../tourist/model/author-review.model';
import { AuthorReviewService } from '../../tourist/author-review.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-profile2',
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.css']
})
export class Profile2Component implements OnInit{
  profile: Profile[] = [];
  selectedProfile: Profile;
  showProfileForm: boolean = false;
  showPictureForm: boolean = false;
  showMessage: boolean = false;
  showProfilePictureForm: boolean = false;
  showEditProfileForm: boolean = false;
  authorReviews: AuthorReview[] = [];
  authorReviewsVisible = false
  currentUser: User;

  toggleEditProfileForm() {
    this.showEditProfileForm = !this.showEditProfileForm;
  }

  toggleProfilePictureForm() {
    this.showProfilePictureForm = !this.showProfilePictureForm;
  }  

  constructor(private service: AdministrationService, private authorReviewService: AuthorReviewService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getByUserId();
    this.delayedShowMessage();

    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }
  
  delayedShowMessage() {
    setTimeout(() => {
      this.showMessage = true;
    }, 1000);
  }

  getByUserId(): void {
    this.service.getByUserId2().subscribe({
      next: (result: Profile) => {
        console.log('Result from API:', result);
        this.profile = [result]; // Wrap the result in an array, as it's a single Profile object
        console.log('Profile data in component:', this.profile);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  onEditClicked(profile: Profile): void {
    this.selectedProfile = profile;
    console.log(this.selectedProfile); 
    this.toggleEditProfileForm();
  }

  onChangeClicked(profile: Profile): void {
    this.selectedProfile = profile;
    console.log(this.selectedProfile);
    this.toggleProfilePictureForm();
  }

  showAuthorReviews() {
    this.authorReviewService.getAuthorReviews(this.currentUser.id).subscribe({
      next: (result: PagedResults<AuthorReview>) => {
        this.authorReviews = result.results;
        this.authorReviewsVisible = true;
      },
      error: () => {
      }
    });
  }
  
  close() {
    this.authorReviewsVisible = false;
  }
}