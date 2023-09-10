import { useState } from "react";
import { IPost } from "../../../../interfaces/post";
import API_URLS from "../../../../configs/api-urls";

const CreatePost = () => {
  const initialFormData = Object.freeze({
    title: "Post x",
    content: "This is post x and it has some very interesting content"
  });

  const [post, setPost] = useState(initialFormData);

  return (
    <form className='w-100 px-5'>
      <h1 className='mt-5'>Create new post</h1>

      <div className="mt-5">
        <label className='h3 form-label'>Post title</label>
        <input value={post?.title} name='title' type='text' className='form-control' onChange={handleChange} />
      </div>
      <div className="mt-4">
        <label className='h3 form-label'>Post content</label>
        <input value={post?.content} name='content' type='text' className='form-control' onChange={handleChange} />
      </div>

      <button onClick={handleSubmit} className='btn btn-dark btn-lg w-100 mt-5'>Submit</button>
      <button onClick={(e) => {
        e.preventDefault();
        window.location.href = '/';
      }}
        className='btn btn-secondary btn-lg w-100 mt-3'>
        Cancel
      </button>

    </form>
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const url = API_URLS.API_URL_CREATE_POST;
    const postToCreate = {
      ...post,
      postId: 0
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postToCreate)
    })
      .then(response => {
        if (response.ok)
          window.location.href = '/';

      })
      .catch(error => alert(error));
  }
}

export default CreatePost;
