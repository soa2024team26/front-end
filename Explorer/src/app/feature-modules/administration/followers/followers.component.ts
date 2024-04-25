import { Component, OnInit } from '@angular/core';
import { Profile } from '../model/profile.model';
import { AdministrationService } from '../administration.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'xp-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  loggedInProfile: Profile | null = null;
  followers: Profile[] = [];
  profiles: Profile[];
  selectedFollower: Profile | null = null; // Initialize as null
  showMessageForm: boolean = false;
  hasNoFollowers: boolean = false;

  toggleChat() {
    this.showMessageForm = !this.showMessageForm;
  }

  closeChat() {
    this.showMessageForm = false;
  }

  constructor(private service: AdministrationService,private router: Router, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    // Get the currently logged-in user's profile
    this.service.getByUserId().subscribe({
      next: (loggedInProfile: Profile) => {
        this.loggedInProfile = loggedInProfile;


        //===============TEMPORARILY COMMENTED FOLLOWERS MICROSERVICE REWORK================
        // // Get all profiles
        // this.service.getProfiles().subscribe({
        //   next: (result: PagedResults<Profile>) => {
        //     // Filter out the currently logged-in profile
        //     this.profiles = result.results.filter((profile) => profile.id !== loggedInProfile.id);
            
        //   },
        //   error: (err: any) => {
        //     console.log(err);
        //   }
        // });

        // Get follows after getting the logged-in user's profile
      this.service.getFollowers(this.loggedInProfile).subscribe({
        next: (result: PagedResults<Profile>) => {
          this.followers = result.results ;
          // console.log("RESULT");
          // console.log(result);
          console.log("FOLLOWERS");
          console.log(this.followers);
          


          if(this.followers.length==0){
            this.hasNoFollowers=true;
            console.log("NO FOLLOWERS")
          }
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Error while getting followers:', err);
        }
      });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  sendMessageTo(follower: Profile): void {
    this.selectedFollower = follower;
    this.showMessageForm = true;
    console.log(this.selectedFollower);
  }

  findPeople() {
    this.router.navigate(['find-people']);
  }


  followOrCheckFollow(profile: Profile): void {
    if (this.loggedInProfile != null) {
        // Call the isFollowing method first
        this.service.isFollowing(this.loggedInProfile, profile).subscribe({
            next: (isFollowing: boolean) => {
                if (!isFollowing) {
                    // If not following, proceed to call the follow method
                    if(this.loggedInProfile != null){
                      this.service.follow(profile, this.loggedInProfile).subscribe({
                          next: (result: any) => {
                              // Check the response status
                              if (result.status === 200) {
                                  // Trigger change detection refresh if necessary
                                  this.cdr.detectChanges();
                                  // Notify the user of successful follow action
                                  alert('You have successfully followed the profile.');
                              }
                          },
                          error: (err: any) => {
                              console.error('Error while following:', err);
                          }
                      });
                  }
                } else {
                    // Log a message if the user is already following the profile
                    console.log(`${this.loggedInProfile?.id} is already following ${profile.id}`);
                }
            },
            error: (error: any) => {
                console.error('Error while checking if profile is followed:', error);
            }
        });
    } else {
        console.log('Logged in profile is null');
    }
}


  // follow(profile: Profile): void {
  //   if(this.loggedInProfile != null){
  //     this.service.follow(profile, this.loggedInProfile).subscribe({
  //         next: (result: any) => {
  //             // Check the response status to see if it's 200 OK
  //             if (result.status === 200) {
  //                 // Trigger change detection refresh if necessary
  //                 this.cdr.detectChanges();
  //                 // Alert the user of successful follow action
  //                 alert('You have successfully followed the profile.');
  //             }
  //         },
  //         error: (err: any) => {
  //             console.error('Error while following:', err);
  //         }
  //     });
  //   }
  // }

  // isProfileFollowed(profile: Profile): boolean {
  //   let isFollowing = false
  //   if (this.loggedInProfile != null) {
  //     // Call the service's isFollowing method
  //     this.service.isFollowing(this.loggedInProfile, profile).subscribe({
  //       next: (result: boolean) => {
  //         // Handle the result: `result` is the boolean indicating whether the user is following the profile
  //         if (result) {
  //           console.log(`${this.loggedInProfile?.id} is following ${profile.id}`);
  //           isFollowing = true
  //           this.cdr.detectChanges();
  //         } else {
  //           console.log(`${this.loggedInProfile?.id} is not following ${profile.id}`);
  //           isFollowing = false
  //           this.cdr.detectChanges();
  //         }
  //         // You can also set a property on your component to store the result
  //         // this.isFollowingProfile = result; // For example
  //       },
  //       error: (error: any) => {
  //         console.error('Error while checking if profile is followed:', error);
  //         // Handle the error appropriately
  //       }
  //     });
  //   }
  //   else{      
  //     console.log('Logged in profile is null');
  //     isFollowing = false
  //     this.cdr.detectChanges();
  //   }
  //   return isFollowing
  // }
  
}
