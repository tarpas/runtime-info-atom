<a name="EditorDecorator"></a>

## EditorDecorator
Class used to manage decorations of atom TextEditor.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| textEditor | <code>TextEditor</code> | atom TextEditor instance |
| subscriptions | <code>CompositeDisposable</code> | Easily disposable list of subscriptions |
| markers | <code>Array.&lt;Marker&gt;</code> | list of atom markers |
| gutter | <code>Array.&lt;Gutter&gt;</code> | list of atom gutters |


* [EditorDecorator](#EditorDecorator)
    * [new EditorDecorator(textEditor)](#new_EditorDecorator_new)
    * [.clearDecorations()](#EditorDecorator+clearDecorations)
    * [.decorate(fileMarks)](#EditorDecorator+decorate)
    * [.getAtomRange(jsonRange)](#EditorDecorator+getAtomRange) ⇒ <code>Range</code>
    * [.getAtomPoint(jsonPoint)](#EditorDecorator+getAtomPoint) ⇒ <code>Point</code>
    * [.decorateGutterLink(type, range, targetFilePath, targetPoint)](#EditorDecorator+decorateGutterLink)
    * [.getGutterItem(type, targetFilePath, targetPoint)](#EditorDecorator+getGutterItem) ⇒ <code>element</code>
    * [.getGutter(type)](#EditorDecorator+getGutter) ⇒ <code>Gutter</code>
    * [.decorateUnderLine(range)](#EditorDecorator+decorateUnderLine)
    * [.decorateSuffix(range, text)](#EditorDecorator+decorateSuffix)
    * [.getSuffixItem(text)](#EditorDecorator+getSuffixItem) ⇒ <code>element</code>

<a name="new_EditorDecorator_new"></a>

### new EditorDecorator(textEditor)
Create DataAcquirer.


| Param | Type | Description |
| --- | --- | --- |
| textEditor | <code>TextEditor</code> | atom TextEditor instance that will be decorated. |

<a name="EditorDecorator+clearDecorations"></a>

### editorDecorator.clearDecorations()
Clears all decorations for text editor and discards markers.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  
<a name="EditorDecorator+decorate"></a>

### editorDecorator.decorate(fileMarks)
Decorates text editor based on FileMark list. All existing decorations
are cleared before decorationg.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  

| Param | Type | Description |
| --- | --- | --- |
| fileMarks | <code>Array.&lt;FileMark&gt;</code> | List of file marks for file opened in TextEditor. |

<a name="EditorDecorator+getAtomRange"></a>

### editorDecorator.getAtomRange(jsonRange) ⇒ <code>Range</code>
Helper function to convert json range to atom Range.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  
**Returns**: <code>Range</code> - Range in atom format  

| Param | Type | Description |
| --- | --- | --- |
| jsonRange | <code>object</code> | FileMark Range from json |

<a name="EditorDecorator+getAtomPoint"></a>

### editorDecorator.getAtomPoint(jsonPoint) ⇒ <code>Point</code>
Helper function to convert json  point to atom Point.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  
**Returns**: <code>Point</code> - Point in atom format.  

| Param | Type | Description |
| --- | --- | --- |
| jsonPoint | <code>object</code> | FileMark Point form json |

<a name="EditorDecorator+decorateGutterLink"></a>

### editorDecorator.decorateGutterLink(type, range, targetFilePath, targetPoint)
Creates gutter link decoration.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | type of gutter link ('D' or 'U') |
| range | <code>Range</code> | Atom range that will be decorated. |
| targetFilePath | <code>string</code> | absolute path of link target file. |
| targetPoint | <code>Point</code> | atom Point for link target. Cursor will be moved to this position after clicking on gutter link |

<a name="EditorDecorator+getGutterItem"></a>

### editorDecorator.getGutterItem(type, targetFilePath, targetPoint) ⇒ <code>element</code>
Creates html element for gutter link decoration.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  
**Returns**: <code>element</code> - element for gutter link decoration  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | type of gutter link ('D' or 'U') |
| targetFilePath | <code>string</code> | absolute path of link target file. |
| targetPoint | <code>Point</code> | atom Point for link target. |

<a name="EditorDecorator+getGutter"></a>

### editorDecorator.getGutter(type) ⇒ <code>Gutter</code>
Returns gutter based on gutter link type.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  
**Returns**: <code>Gutter</code> - - atom Gutter.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | type of gutter link ('D' or 'U') |

<a name="EditorDecorator+decorateUnderLine"></a>

### editorDecorator.decorateUnderLine(range)
Creates underline decoration.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  

| Param | Type | Description |
| --- | --- | --- |
| range | <code>Range</code> | Atom range that will be underlined. |

<a name="EditorDecorator+decorateSuffix"></a>

### editorDecorator.decorateSuffix(range, text)
Creates overlay decoration with error mesage placed after content of line.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  

| Param | Type | Description |
| --- | --- | --- |
| range | <code>Range</code> | Atom range that will be decorated. |
| text | <code>string</code> | error message to show after line. |

<a name="EditorDecorator+getSuffixItem"></a>

### editorDecorator.getSuffixItem(text) ⇒ <code>element</code>
Return html element for overlay decoration.

**Kind**: instance method of [<code>EditorDecorator</code>](#EditorDecorator)  
**Returns**: <code>element</code> - - element for overlay decoration  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | error message to show after line. |

