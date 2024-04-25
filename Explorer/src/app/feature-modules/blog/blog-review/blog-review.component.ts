import { ChangeDetectorRef, Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog, BlogCategory, BlogStatus, BlogCategoryValues  } from '../model/blog.model';
import { Router } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AdministrationService } from '../../administration/administration.service';
import { Profile } from '../../administration/model/profile.model';


@Component({
  selector: 'xp-blog-review',
  templateUrl: './blog-review.component.html',
  styleUrls: ['./blog-review.component.css']
})
export class BlogReviewComponent {
  blogs: Blog[] = [];
  blogRows: any[] = [];
  itemsPerPage = 12;
  currentPage = 1; 
  totalPages: number; 
  totalPageArray: number[] = [];
  BlogCategory: BlogCategory;
  originalBlogs: Blog[] = [];
  filteredBlogs: Blog[] = [];

  loggedInProfile: Profile | null = null;
  following: Profile[] = [];

  constructor(private service: BlogService, private router: Router, private adminService: AdministrationService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getLoggedInProfileAndFollowers();
  }

  getLoggedInProfileAndFollowers(): void {
    this.adminService.getByUserId().subscribe({
      next: (profile: Profile) => {
        this.loggedInProfile = profile;
        // Retrieve the followers list
        this.getFollowers();
      },
      error: (err) => {
        console.error('Error while getting logged-in profile:', err);
      }
    });
  }

  // Method to retrieve followers
  getFollowers(): void {
    if (this.loggedInProfile) {
      this.adminService.getFollowing(this.loggedInProfile).subscribe({
        next: (result: PagedResults<Profile>) => {
          this.following = result.results;
          // Once followers are retrieved, proceed to get and filter blogs
          this.getAndFilterBlogs();
        },
        error: (err) => {
          console.error('Error while getting followers:', err);
        }
      });
    }
  }

  getAndFilterBlogs(): void {
    this.service.getBlogs().subscribe({
      next: (result: PagedResults<Blog>) => {
        this.originalBlogs = result.results;
        // Filter blogs based on followers
        this.filteredBlogs = this.originalBlogs.filter(blog => 
          this.following.some(follow => follow.userId === blog.userId)
        );
        this.totalPages = Math.ceil(this.filteredBlogs.length / this.itemsPerPage); 
        this.totalPageArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
        this.updateBlogRows();
      },
      error: () => {
        console.error('Error while retrieving blogs');
      }
    });
  }

  getBlogs(): void {
    this.service.getBlogs().subscribe({
      next: (result: PagedResults<Blog>) => {
        this.blogs = result.results;
        this.originalBlogs = [...result.results];
        this.totalPages = Math.ceil(this.blogs.length / this.itemsPerPage); 
        this.totalPageArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
        this.updateBlogRows();
      },
      error: () => {
        
      }
    });
  }

  updateBlogRows() {
    this.blogRows = [];
    for (let i = 0; i < this.blogs.length; i += 3) {
      this.blogRows.push(this.blogs.slice(i, i + 3));
    }
  }

  get blogStatus() {
    return BlogStatus; 
  }

  get category() {
    return BlogCategory; 
  }

  filterByCategory(category: BlogCategory): void {
    if (category === null) {
      this.getBlogs();
    } else {
      this.blogs = this.originalBlogs.filter(blog => blog.category === category);
    this.updateBlogRows();
    }
  }

  filterByStatus(status: BlogStatus | null): void {
    console.log('Filtering blogs by status:', status);
  
    if (status === null) {
      this.getBlogs();
    } else {
      this.service.getBlogsByStatus(status).subscribe({
        next: (result: PagedResults<Blog>) => {
          console.log('Filtered blogs result:', result);
  
          if (result.results && result.results.length > 0) {
            this.blogs = result.results;
            this.totalPages = Math.ceil(this.blogs.length / this.itemsPerPage);
            this.totalPageArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
              
            this.updateBlogRows();
          } else {
            this.handleNoResults();
          }
        },
        error: (error) => {
          this.handleHttpError(error);
        }
      });
    }
  }
  
  handleNoResults(): void {
    this.blogs = []; 
    this.totalPages = 0; 
    this.totalPageArray = [];
    this.currentPage = 1;
    this.updateBlogRows();

    console.log('Nema rezultata za traženi status.');
  }

  handleHttpError(error: any): void {

    if (error.status === 404) {
      this.handleNoResults();
    } else {
      console.error('HTTP Error:', error);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateBlogRows();
  }

  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  onReadMoreClicked(id: number){
    this.router.navigate(['blog-single-post', id]);
  }


}
