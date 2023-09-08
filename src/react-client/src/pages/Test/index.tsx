import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Container } from 'react-bootstrap';
import { ContentState, EditorState, Modifier, RawDraftContentState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };

const EditorWithMentionHashtag = () => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [contentState, setContentState] = useState<ContentState>(convertFromRaw(content));

  function onContentStateChange(contentState: RawDraftContentState): void {
    setContentState(
      convertFromRaw(contentState)
    );
  };

  function addStar() {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '⭐',
      editorState.getCurrentInlineStyle(),
    );
    setEditorState(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  const CustomOption = () => {
    return (
      <button onClick={addStar}>⭐</button>
    );
  }

  function uploadImageCallBack(file: string | Blob) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  return (
    <>
      <Container className='w-75 h-75'>
        <h1>EditorWithMentionHashtag</h1>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={setEditorState}
          onContentStateChange={onContentStateChange}
          toolbarCustomButtons={[<CustomOption />]}
          mention={{
            separator: ' ',
            trigger: '@',
            suggestions: [
              { text: 'APPLE', value: 'apple', url: 'apple' },
              { text: 'BANANA', value: 'banana', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
            ],
          }}
          hashtag={{}}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } }
          }}
        />
        <textarea style={{ width: '100%', height: '200px' }}
          disabled
          value={draftToHtml(convertToRaw(editorState!.getCurrentContent()))}
        />
        <textarea style={{ width: '100%', height: '200px' }}
          disabled
          value={JSON.stringify(contentState, null, 4)}
        />

      </Container>


      {/* <Container className='w-75 h-75'>
        <h1>asdasdasdawDasdasdasd</h1>
        <Editor
    wrapperClassName="demo-wrapper"
    editorClassName="demo-editor"
    toolbar={{
      colorPicker: { component: ColorPic },
    }}
  />



      </Container> */}
    </>
  )
}

export default EditorWithMentionHashtag;
