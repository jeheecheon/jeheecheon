import { useEffect, useState } from "react";
import { IPost } from "../../interfaces/post";
import IPageProps from "../../interfaces/page";
import { Link } from "react-router-dom";
import AppRoutes from "../../utils/AppRoutes";
import API_URLS from "../../configs/api-urls";

var updatePostPath: string = "";

const Posts: React.FunctionComponent<IPageProps> = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getPosts();

    var route = AppRoutes.find(r => r.path?.includes("/Posts/Update/"));
    if (route !== undefined && route.path !== undefined) {
      var idx = route.path.lastIndexOf(':');
      updatePostPath = route.path.slice(0, idx);
    }
    else console.log("Failed to find the update post path")
  }, []);


  async function getPosts() {
    console.log("Called getPosts");

    const url = API_URLS.API_URL_GET_ALL_POSTS;
    await fetch(url, {
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
                  <Link className="btn btn-dark btn-lg mx-3 my-3" to={updatePostPath.concat(post.postId.toString())}>Update-미구현</Link>
                  <button onClick={() => {
                    if (window.confirm(`Are you sure you want to delete the post titled "${post.title}?`))
                      console.log("미구현");
                  }}
                    className="btn btn-dark btn-lg mx-3 my-3">
                    Delete-미구현
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
}

export default Posts;
