import { useEffect, useState } from "react";
import { IPost } from "../../interfaces/post";
import IPageProps from "../../interfaces/page";
import { Link } from "react-router-dom";
import AppRoutes from "../../utils/AppRoutes";
import API_URLS from "../../configs/api-urls";

let updatePostPath: string = "";
let createPostPath: string = "";

const Posts: React.FunctionComponent<IPageProps> = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getPosts();

    var route = AppRoutes.find(r => r.path?.includes("/posts/manage/update/"));
    if (route !== undefined && route.path !== undefined) {
      var idx = route.path.lastIndexOf(':');
      updatePostPath = route.path.slice(0, idx);
    }
    else console.log("Failed to find the update post path");

    route = AppRoutes.find(r => r.path?.includes("/posts/manage/create"));
    if (route !== undefined && route.path !== undefined)
      createPostPath = route.path;
    else console.log("Failed to find the create post path");
  }, []);


  function getPosts() {
    console.log("Called getPosts");

    const url = API_URLS.API_URL_GET_ALL_POSTS;
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((postsFromServer: IPost[]) => {
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <>
      Posts Page
      {renderPostsTable()}
      {createPostPath}
      {createPostPath !== "" && (<Link to={createPostPath}>New Post</Link>)}
    </>
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
            {posts.map((post: IPost) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <Link className="btn btn-dark btn-lg mx-3 my-3" to={updatePostPath.concat(post.postId.toString())}>Update</Link>
                  <button onClick={(e) => {
                    e.preventDefault();
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

  function deletePost(postId: number) {
    const url = `${API_URLS.API_URL_DELETE_POST}/${postId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok)
          onPostDeleted(postId);
        else
          console.log(response.statusText);
        return response.json();
      })
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
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

export default Posts;
