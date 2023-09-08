import React from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import IPageProps from '../interfaces/page';

const MyEditor: React.FunctionComponent<IPageProps> = () => {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  return <Editor editorState={editorState} onChange={setEditorState} placeholder='Enter some text...' />;
}

export default MyEditor;
