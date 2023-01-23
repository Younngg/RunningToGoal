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

  syncPosts(userId: string, onUpdate: any) {
    const postsRef = ref(this.db, `${userId}/posts/`);
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });
    return () => off(postsRef);
  }

  savePost(userId: string, post: any) {
    set(ref(this.db, `${userId}/posts/${post.id}`), post);
  }

  removePost(userId: string, id: any) {
    remove(ref(this.db, `${userId}/posts/${id}`));
  }
}

export default PostRepository;
