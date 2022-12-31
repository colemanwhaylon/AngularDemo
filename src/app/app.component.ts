import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  firebaseDbUrl = 'https://ng-complete-guide-406eb-default-rtdb.firebaseio.com/posts.json';
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    this.fetchMyPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);

    console.log("this.loadedPosts.length: " + this.loadedPosts.length);
    this.fetchMyPosts();
    console.log("this.loadedPosts.length: " + this.loadedPosts.length);
    //console.log(this.loadedPosts);
  }

  onFetchPosts() {
    // Fetch posts by sending an Http request
    this.fetchMyPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError(){
    this.error = null;
  }

  private fetchMyPosts() {
    this.isFetching = true;
    // Fetch posts by sending an Http request
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      //console.log(this.loadedPosts);
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }


}
