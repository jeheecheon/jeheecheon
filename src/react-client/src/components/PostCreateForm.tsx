import React, { useState, ChangeEvent } from 'react'
import Constants from '../utilities/Constants'
import { Post } from '../App';

interface Props {
  onPostCreated: (createdPost: Post | null) => void;
}

export default function PostCreateForm({ onPostCreated }: Props) {
  const initialFormData = Object.freeze({
    title: "Post x",
    content: "This is post x and it has some very interesting content"
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const postToCreate: Post = {
      postId: 0,
      title: formData.title,
      content: formData.content
    };

    const url = Constants.API_URL_CREATE_POST;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postToCreate)
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    onPostCreated(postToCreate);
  }

  return (
    <form className='w-100 px-5'>
      <h1 className='mt-5'>Create new post</h1>

      <div className="mt-5">
        <label className='h3 form-label'>Post title</label>
        <input value={formData.title} name='title' type='text' className='form-control' onChange={handleChange} />
      </div>
      <div className="mt-4">
        <label className='h3 form-label'>Post content</label>
        <input value={formData.content} name='content' type='text' className='form-control' onChange={handleChange} />
      </div>

      <button onClick={handleSubmit} className='btn btn-dark btn-lg w-100 mt-5'>Submit</button>
      <button onClick={() => onPostCreated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Cancel</button>

    </form>
  );
}

