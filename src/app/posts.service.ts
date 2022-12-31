import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {

  constructor(private http: HttpClient) { }
  firebaseDbUrl = 'https://ng-complete-guide-406eb-default-rtdb.firebaseio.com/posts.json';

  /**
   * Creates and stores Posts.
   * This incomplete HTML tag should be reported as an error: <tag
   *
   * @remarks
   * Here's an inline tag {@customInline with some data}.
   *
   * @customBlock
   * Here's an example of a custom block tag.
   *
   * @param title - The title of the post
   * @param content - The content of the post
   * //@returns nothing
   *
   * @beta @customModifier
   */
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    this.http
      .post<{ name: string }>(
        this.firebaseDbUrl,
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }



  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(this.firebaseDbUrl)
      .pipe(//pipe does data transformation
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }))
  }

  deletePosts(){

  }

}
