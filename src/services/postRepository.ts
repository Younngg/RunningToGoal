import {
  getDatabase,
  ref,
  set,
  onValue,
  off,
  remove,
  Database,
} from 'firebase/database';
import { firebaseApp } from './firebase';

class PostRepository {
  db: Database;
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  syncPosts(onUpdate: any) {
    const postsRef = ref(this.db, `posts/`);
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });
    return () => off(postsRef);
  }

  savePost(post: any) {
    set(ref(this.db, `posts/${post.id}`), post);
  }

  removePost(id: any) {
    remove(ref(this.db, `posts/${id}`));
  }
}

export default PostRepository;
