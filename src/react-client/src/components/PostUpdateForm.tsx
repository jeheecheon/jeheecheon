import React, { useState, ChangeEvent } from 'react'
import Constants from '../utilities/Constants'
import { Post } from '../App';

interface Props {
  onPostUpdated: (createdPost: Post | null) => void;
  post: Post
}

export default function PostUpdateForm({ onPostUpdated, post }: Props) {
  const initialFormData = Object.freeze({...post});
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const postToUpdate: Post = {...formData};

    const url = Constants.API_URL_UPDATE_POST;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postToUpdate)
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    onPostUpdated(postToUpdate);
  }

  return (
    <form className='w-100 px-5'>
      <h1 className='mt-5'>Updating the post titled "{post.title}".</h1>

      <div className="mt-5">
        <label className='h3 form-label'>Post title</label>
        <input value={formData.title} name='title' type='text' className='form-control' onChange={handleChange} />
      </div>
      <div className="mt-4">
        <label className='h3 form-label'>Post content</label>
        <input value={formData.content} name='content' type='text' className='form-control' onChange={handleChange} />
      </div>

      <button onClick={handleSubmit} className='btn btn-dark btn-lg w-100 mt-5'>Submit</button>
      <button onClick={() => onPostUpdated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Cancel</button>

    </form>
  );
}

