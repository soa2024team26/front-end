import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogComment } from '../model/blog-comment.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';


@Component({
  selector: 'xp-comments-review',
  templateUrl: './comments-review.component.html',
  styleUrls: ['./comments-review.component.css']
})
export class CommentsReviewComponent implements OnInit {
  @Input() comments: BlogComment[] = [];
  blogId : string;
  selectedBlogComment: BlogComment | null;
  shouldRenderBlogCommentForm: boolean = false;
  shouldEdit: boolean = false;
  userNames: { [key: number]: string } = {};
  currentUserId:string;
  

  constructor(private blogService: BlogService, private route: ActivatedRoute, private authService: AuthService) { 

  }

  editedCommentText: string = '';

  onEditClicked(comment: BlogComment): void {
    this.selectedBlogComment = comment;
    this.editedCommentText = comment.text;
  }

  

  onSaveCommentEdit(comment: BlogComment): void {
    if (this.selectedBlogComment) {
      
      const updatedComment = { ...this.selectedBlogComment, text: this.editedCommentText };
      
      // Pozovite odgovarajući servis da sačuva izmene na serveru
      this.blogService.updateBlogComment(updatedComment, this.blogId, 0).subscribe((result) => {
        if (result) {
          // Osvežite listu komentara nakon uređivanja
          this.comments = this.comments.map((comment) => {
            return comment.id === updatedComment.id ? updatedComment : comment;
          });

          // Obrišite selektovani komentar nakon uređivanja
          this.selectedBlogComment = null;
          this.editedCommentText = '';
        }
      });
    }

    
  }

  onCancelEdit(): void {
    this.selectedBlogComment = null;
    this.editedCommentText = '';
  }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.blogId = params['id']; // Ovo 'blogId' mora da se poklapa sa imenom parametra iz URL-a
      this.currentUserId = this.authService.user$.value.id;
      if (this.blogId) {
        this.getCommentsByBlogId(this.blogId);
      } else {
        // Handle the case when there is no valid blog ID in the URL.
      }
    });
  }
  getTourReviewByTourId(tourId: number) {
    throw new Error('Method not implemented.');
  }
 

  getCommentsByBlogId(blogId: string): void {
    this.blogService.getCommentsByBlogId(blogId).subscribe({
      next: (result: BlogComment[]) => {
        this.comments = result;
        
      },
      error: () => {
        
      }

    });
  }

  deleteBlogComment(id: string): void {
    this.blogService.deleteBlogComment(this.blogId, 0).subscribe({
      next: () => {
        this.getBlogComment();
      },
    })
  }

  getBlogComment(): void {
    this.blogService.getCommentsByBlogId(this.blogId).subscribe({
      next: (result: BlogComment[]) => {
        this.comments = result;
       
      },
      error: () => {
      }
    })
  }

 


}

