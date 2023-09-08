import { useParams } from "react-router-dom";
import { IPost } from "../../../../interfaces/post";
import { useEffect, useState } from "react";
import API_URLS from "../../../../configs/api-urls";

const UpdatePost = () => {
  const { postId } = useParams()
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const url = API_URLS.API_URL_GET_POST + "/" + postId;
    await fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((postFromServer: IPost) => {
        setPost(postFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <>
      <form className='w-100 px-5'>
        <h1 className='mt-5'>Updating the post titled "{post?.title}".</h1>

        <div className="mt-5">
          <label className='h3 form-label'>Post title</label>
          <input value={post?.title} name='title' type='text' className='form-control' onInput={handleInput} />
        </div>
        <div className="mt-4">
          <label className='h3 form-label'>Post content</label>
          <input value={post?.content} name='content' type='text' className='form-control' onInput={handleInput} />
        </div>

        <button onClick={handleSubmit} className='btn btn-dark btn-lg w-100 mt-5'>Submit</button>
        <button onClick={() => { }} className='btn btn-secondary btn-lg w-100 mt-3'>Cancel</button>

      </form>
    </>
  );

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (post !== null)
      setPost({
        ...post,
        [event.target.name]: event.target.value
      });
  }

  async function handleSubmit() {
    const url = API_URLS.API_URL_UPDATE_POST;

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    window.location.href = '/';
  }
}

export default UpdatePost;
