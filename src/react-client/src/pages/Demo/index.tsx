import React, { useState } from "react";
import Constants from "../../configs/ApiEndpoints";
import PostCreateForm from "../../components/PostCreateForm";
import PostUpdateForm from "../../components/PostUpdateForm";
import IPageProps from "../../interfaces/page";


export interface Post {
  postId: number;
  title: string;
  content: string;
}

const Demo: React.FunctionComponent<IPageProps> = props => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showingCreatedNewPostForm, setShowingCreatedNewPostForm] = useState(false);
  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] = useState<Post | null>(null);

  function getPosts() {
    const url = Constants.API_URL_GET_ALL_POSTS;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(postsFromServer => {
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deletePost(postId: number) {
    const url = `${Constants.API_URL_DELETE_POST}/${postId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onPostDeleted(postId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="center">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center ">
          {((showingCreatedNewPostForm === false) && (postCurrentlyBeingUpdated === null)) && (
            <>
              <h1>ASP.Net Server Test</h1>

              <div className="mt-5">
                <button onClick={getPosts} className="btn btn-dark btn-lg  w-100">Get Posts from server</button>
                <button onClick={() => setShowingCreatedNewPostForm(true)} className="btn btn-secondary btn-lg mt-4 w-100">Create New Post</button>
              </div>
            </>
          )}

          {(posts.length > 0 && !showingCreatedNewPostForm && postCurrentlyBeingUpdated === null) && renderPostsTable()}
          {showingCreatedNewPostForm && (<PostCreateForm onPostCreated={onPostCreated} />)}
          {postCurrentlyBeingUpdated !== null && (<PostUpdateForm post={postCurrentlyBeingUpdated} onPostUpdated={onPostUpdated} />)}
        </div>
      </div>
    </div>
  );

  function renderPostsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">PostId (OK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: Post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button onClick={() => setPostCurrentlyBeingUpdated(post)} className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button onClick={() => {
                    if (window.confirm(`Are you sure you want to delete the post titled "${post.title}?`))
                      deletePost(post.postId);
                  }}
                    className="btn btn-dark btn-lg mx-3 my-3">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setPosts([])} className="btn btn-dark btn-lg w-100">Clear posts</button>
      </div>
    )
  }

  function onPostCreated(createdPost: Post | null) {
    setShowingCreatedNewPostForm(false);
    // Do nothing if it's null
    if (createdPost === null) return;

    alert(`Post successfully created. After clicking OK, your new post titled "${createdPost.title}" whill show up in the table below`);

    getPosts();
  }

  function onPostUpdated(updatedPost: Post | null) {
    setPostCurrentlyBeingUpdated(null);

    if (updatedPost === null) return;

    let postsCopy = [...posts];
    const index = postsCopy.findIndex((post, i) => {
      if (post.postId === updatedPost.postId) return true;
      else return false
    });

    if (index !== -1)
      postsCopy[index] = updatedPost;

    setPosts(postsCopy);
    alert(`Post successfully updated. After clicking OK, look for the post with the title "${updatedPost.postId}" in the table below to see the update`)
  }

  function onPostDeleted(deletedPostId: number) {
    let postsCopy = [...posts];
    const index = postsCopy.findIndex((post, i) => {
      if (post.postId === deletedPostId) return true;
      else return false;
    });

    if (index !== -1)
      postsCopy.splice(index, 1);

    setPosts(postsCopy);
    alert('Post successfuly deleted. After clicking OK, look at the table below toe see your post disappear.');
  }
}

export default Demo;
