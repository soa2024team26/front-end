import { Injectable } from '@angular/core';
import { BlogComment } from './model/blog-comment.model';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Blog, BlogStatus } from './model/blog.model';
import { environment } from 'src/env/environment';
import { Observable, map } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Rating } from './model/blog-rating.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

/*   getBlogComment(): Observable<PagedResults<BlogComment>> {
    return this.http.get<PagedResults<BlogComment>>('http://localhost:8080/api/' + 'tourist/blogcomment?page=0&pageSize=0')
  } */

  deleteBlogComment(id: string, index: any): Observable<BlogComment> {
    return this.http.delete<BlogComment>('http://localhost:8080/api/' + 'tourist/blogcomment/' + id + '/' + index);
  }

  addBlogComment(comment: BlogComment, blogId: string): Observable<BlogComment> {
    console.log(comment);
    return this.http.put<BlogComment>('http://localhost:8080/api/' + 'tourist/blogcomment/' + blogId, comment);
  }

  updateBlogComment(comment : BlogComment, blogId: string, index: any): Observable<BlogComment> {
    return this.http.put<BlogComment>('http://localhost:8080/api/' + 'tourist/blogcomment/' + blogId + '/' + index, comment);
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>('http://localhost:8080/api/' + 'tourist/blog')
  }

  getBlogsByStatus(status: BlogStatus): Observable<Blog[]> {
    return this.http.get<Blog[]>('http://localhost:8080/api/' + 'tourist/blog/byStatus/' + status)
  }

  deleteBlog(id: string): Observable<Blog> {
    return this.http.delete<Blog>('http://localhost:8080/api/' + 'tourist/blog/' + id);
  }

  getBlog(id: string): Observable<Blog> {
    return this.http.get<Blog>('http://localhost:8080/api/' + 'tourist/blog/' + id);
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>('http://localhost:8080/api/' + 'tourist/blog', blog);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    console.log(blog.userId)
    return this.http.put<Blog>('http://localhost:8080/api/' + 'tourist/blog/' + blog.id, blog);
  }

  addRating(rating: Rating, id: string): Observable<any> {
    return this.http.put('http://localhost:8080/api/' + 'tourist/blog/AddRating/' + id, rating);
  }

  getRatingCount(id: string): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/' + 'tourist/blog/RatingCount/' + id);
  }  
  

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:8086/api/tourist/blog/UploadFile', formData,{
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getBlogsByUserId(id: number): Observable<Blog[]> {
    return this.http.get<Blog[]>('http://localhost:8080/api/' + 'tourist/blog/getByUserID/' + id);
  }
  getCommentsByBlogId(id: string): Observable<BlogComment[]> {
    return this.http.get<BlogComment[]>('http://localhost:8080/api/' + 'tourist/blogcomment/getByBlogID/' + id);
  }
}
/*    getSimilarBlogs(currentBlog: Blog): Observable<Blog[]> {
    return this.getBlogs().pipe(
      map((allBlogs: PagedResults<Blog>) => {
        const similarBlogs: Blog[] = [];

        const similarCategoryBlogs = allBlogs.results.filter(blog => blog.category === currentBlog.category && blog.id !== currentBlog.id);
        
        for (let i = 0; i < 4 && i < similarCategoryBlogs.length; i++) {
          similarBlogs.push(similarCategoryBlogs[i]);
        }

        return similarBlogs;
      })
    );
  }

} */
 