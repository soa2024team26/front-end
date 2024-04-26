import { Component, Input, OnInit } from '@angular/core';
import { BlogComment } from '../model/blog-comment.model';
import { BlogService } from '../blog.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.css']
})
export class BlogCommentsComponent implements OnInit {

  blogComments: BlogComment[] = [];
  selectedBlogComment: BlogComment;
  shouldRenderBlogCommentForm: boolean = false;
  shouldEdit: boolean = false;
  userNames: { [key: string]: string } = {};
  @Input() blogId: string ;

  
  constructor(private service: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getBlogComment;
  }
  
  deleteBlogComment(id: string): void {
    this.service.deleteBlogComment(this.blogId, 0).subscribe({
      next: () => {
        this.getBlogComment();
      },
    })
  }

  getBlogComment(): void {
    this.service.getCommentsByBlogId(this.blogId).subscribe({
      next: (result: BlogComment[]) => {
        this.blogComments = result;
        this.loadUserNames(); 
      },
      error: () => {
      }
    })
  }

  loadUserNames(): void {
    this.blogComments.forEach((blogComment) => {
      this.authService.getUserById(blogComment.userId).subscribe((user: User) => {
        this.userNames[blogComment.userId] = user.username;
      });
    });
  }

  onEditClicked(blogComment: BlogComment): void {
    this.selectedBlogComment = blogComment;
    this.shouldRenderBlogCommentForm = true;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.shouldEdit = false;
    this.shouldRenderBlogCommentForm = true;
    
  }

  getUserName(userId: string): string {
    if (this.userNames[userId]) {
      return this.userNames[userId];
    }
    return 'Nepoznato';
  }


}
