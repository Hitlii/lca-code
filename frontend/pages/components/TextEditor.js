import React, { useEffect, useMemo, useState, useCallback } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

// Import the `Editor` and `Transforms` helpers from Slate.
import { Editor, Transforms, Text } from 'slate'

import Typography from '@material-ui/core/Typography';


function TextEditor() {
    const editor = useMemo(() => withReact(createEditor()), [])

    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'Okay loco'}]
        }
    ])

    const CodeElement = props => {
        return (
             <Typography {...props.attributes} variant="h1" component="h2" gutterBottom>
       {props.children}
      </Typography>
        )
    }

    const DefaultElement = props => {
        return <p{...props.attributes}>{props.children}</p>
    }

    const Leaf = props => {
        return (
          <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
          >
            {props.children}
          </span>
        )
    }

    const renderElement = useCallback(props => {
        switch (props.element.type) {
          case 'code':
            return <CodeElement {...props} />
          default:
            return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
      }, [])

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={newValue => setValue(newValue)}
        >
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                if (!event.ctrlKey) {
                    return
                }

                switch (event.key) {
                    // When "`" is pressed, keep our existing code block logic.
                    case '`': {
                    event.preventDefault()
                    const [match] = Editor.nodes(editor, {
                        match: n => n.type === 'code',
                    })
                    Transforms.setNodes(
                        editor,
                        { type: match ? 'paragraph' : 'code' },
                        { match: n => Editor.isBlock(editor, n) }
                    )
                    break
                    }

                    // When "B" is pressed, bold the text in the selection.
                    case 'b': {
                    event.preventDefault()
                    Transforms.setNodes(
                        editor,
                        { bold: true },
                        // Apply it to text nodes, and split the text node up if the
                        // selection is overlapping only part of it.
                        { match: n => Text.isText(n), split: true }
                    )
                    break
                    }
                }
                }}
            />
        </Slate>
    )
}

export default TextEditor

