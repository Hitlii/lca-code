import React, { useEffect, useMemo, useState, useCallback } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

// Import the `Editor` and `Transforms` helpers from Slate.
import { Editor, Transforms, Text, Element as SlateElement } from 'slate'

import { withHistory } from 'slate-history'

import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'

import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ListIcon from '@material-ui/icons/List';

import isHotkey from 'is-hotkey'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0
    },
    toolbar: {
        padding: 0,
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2'
    }
}))

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

function TextEditor() {
    const classes = useStyles()
    const [value, setValue] = useState(initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])


    return (
        <Paper elevation={0} className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <MarkButton editor={editor} format='bold' icon='bold'/>
                <MarkButton editor={editor} format='italic' icon='italic'/>
                <MarkButton editor={editor} format='underline' icon='underline'/>
                <BlockButton editor={editor} format="heading-one" icon='looks_one' />
                <BlockButton editor={editor} format="heading-two" icon='looks_two' />
                <BlockButton editor={editor} format="numbered-list" icon='list_numbered' />
                <BlockButton editor={editor} format="bulleted-list" icon='list' />
            </Toolbar>
            <Slate
                editor={editor}
                value={value}
                onChange={newValue => setValue(newValue)}
            >
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                />
            </Slate>
        </Paper>
    )
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: n =>
        LIST_TYPES.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
        ),
      split: true,
    })
    const newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    Transforms.setNodes(editor, newProperties)
  
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })

    return !!match
}

const BlockButton = ({ editor, format, icon }) => {
    return (
      <IconButton
      color={isBlockActive(editor,format) ? 'inherit' : 'default'}
        onClick={event => {
          event.preventDefault()
          toggleBlock(editor, format)
        }}
      >
        {returnIcon(icon)}
      </IconButton>
    )
}

const MarkButton = ({ editor, format, icon }) => {
    return (
      <IconButton
        color={isMarkActive(editor,format) ? 'inherit' : 'default'}
        onClick={event => {
            event.preventDefault()
            toggleMark(editor, format)
        }}
      >
        {returnIcon(icon)}
      </IconButton>
    )
}

const returnIcon = (icon) => {
    switch(icon) {
        case 'bold':
            return <FormatBoldIcon />
        case 'italic':
            return <FormatItalicIcon />
        case 'underline': 
            return <FormatUnderlinedIcon />
        case 'looks_one':
            return <LooksOneIcon />
        case 'looks_two':
            return <LooksTwoIcon />
        case 'list_numbered':
            return <FormatListNumberedIcon />
        case 'list':
            return <ListIcon />
        default:
            return null
    }
}

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return <p {...attributes}>{children}</p>
    }
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>
    }
  
    return <span {...attributes}>{children}</span>
}

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'Escribe aqui'}
        ]
    },
]

export default TextEditor

