<a name="module_python-runtime-info"></a>

## python-runtime-info
Atom plugin that shows python runtime info.


* [python-runtime-info](#module_python-runtime-info)
    * _static_
        * [.runtimeInfoPlugin](#module_python-runtime-info.runtimeInfoPlugin) : <code>RuntimeInfoPlugin</code>
    * _inner_
        * [~RuntimeInfoPlugin](#module_python-runtime-info..RuntimeInfoPlugin)
            * [new RuntimeInfoPlugin()](#new_module_python-runtime-info..RuntimeInfoPlugin_new)
            * [.activate(state)](#module_python-runtime-info..RuntimeInfoPlugin+activate)
            * [.deactivate()](#module_python-runtime-info..RuntimeInfoPlugin+deactivate)
            * [.serialize()](#module_python-runtime-info..RuntimeInfoPlugin+serialize)
            * [.dataAcquired(fileMarkMap)](#module_python-runtime-info..RuntimeInfoPlugin+dataAcquired)
            * [.decorateFile(filePath)](#module_python-runtime-info..RuntimeInfoPlugin+decorateFile)
            * [.unregisterDecorator(filePath)](#module_python-runtime-info..RuntimeInfoPlugin+unregisterDecorator)
            * [.registerDecorator(textEditor)](#module_python-runtime-info..RuntimeInfoPlugin+registerDecorator)

<a name="module_python-runtime-info.runtimeInfoPlugin"></a>

### python-runtime-info.runtimeInfoPlugin : <code>RuntimeInfoPlugin</code>
Singleton instance of RuntimeInfoPlugin.

**Kind**: static property of [<code>python-runtime-info</code>](#module_python-runtime-info)  
<a name="module_python-runtime-info..RuntimeInfoPlugin"></a>

### python-runtime-info~RuntimeInfoPlugin
Singleton class representing python runtime info plugin.

**Kind**: inner class of [<code>python-runtime-info</code>](#module_python-runtime-info)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| subscriptions | <code>CompositeDisposable</code> | Easily disposable list of subscriptions |
| fileDecorators | <code>object</code> | filePath{String} to {EditorDecorator} map. |
| fileMarkMap | <code>object</code> | filePath{String} to {FileMark} map. |
| dataAcquirer | <code>DataAcquirer</code> | Instance of data acquisition class. |


* [~RuntimeInfoPlugin](#module_python-runtime-info..RuntimeInfoPlugin)
    * [new RuntimeInfoPlugin()](#new_module_python-runtime-info..RuntimeInfoPlugin_new)
    * [.activate(state)](#module_python-runtime-info..RuntimeInfoPlugin+activate)
    * [.deactivate()](#module_python-runtime-info..RuntimeInfoPlugin+deactivate)
    * [.serialize()](#module_python-runtime-info..RuntimeInfoPlugin+serialize)
    * [.dataAcquired(fileMarkMap)](#module_python-runtime-info..RuntimeInfoPlugin+dataAcquired)
    * [.decorateFile(filePath)](#module_python-runtime-info..RuntimeInfoPlugin+decorateFile)
    * [.unregisterDecorator(filePath)](#module_python-runtime-info..RuntimeInfoPlugin+unregisterDecorator)
    * [.registerDecorator(textEditor)](#module_python-runtime-info..RuntimeInfoPlugin+registerDecorator)

<a name="new_module_python-runtime-info..RuntimeInfoPlugin_new"></a>

#### new RuntimeInfoPlugin()
Create plugin instance or returns instance if it was already created.

<a name="module_python-runtime-info..RuntimeInfoPlugin+activate"></a>

#### runtimeInfoPlugin.activate(state)
Activate plugin. This function is entry point and it's called by Atom.

**Kind**: instance method of [<code>RuntimeInfoPlugin</code>](#module_python-runtime-info..RuntimeInfoPlugin)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>object</code> | Serialized state from previeous session. |

<a name="module_python-runtime-info..RuntimeInfoPlugin+deactivate"></a>

#### runtimeInfoPlugin.deactivate()
Deactivate plugin. This function is called by Atom on when plugin is
deactivated or editor closed.

**Kind**: instance method of [<code>RuntimeInfoPlugin</code>](#module_python-runtime-info..RuntimeInfoPlugin)  
<a name="module_python-runtime-info..RuntimeInfoPlugin+serialize"></a>

#### runtimeInfoPlugin.serialize()
Serialize plugin state. This function is called by Atom before
closing editor.

**Kind**: instance method of [<code>RuntimeInfoPlugin</code>](#module_python-runtime-info..RuntimeInfoPlugin)  
<a name="module_python-runtime-info..RuntimeInfoPlugin+dataAcquired"></a>

#### runtimeInfoPlugin.dataAcquired(fileMarkMap)
Callback function called after data aquisition. Sets fileMarkMap property
and calls decorateFile on files from acquired fileMarkMap

**Kind**: instance method of [<code>RuntimeInfoPlugin</code>](#module_python-runtime-info..RuntimeInfoPlugin)  

| Param | Type | Description |
| --- | --- | --- |
| fileMarkMap | <code>object</code> | Object map of paths to fileMark. |

<a name="module_python-runtime-info..RuntimeInfoPlugin+decorateFile"></a>

#### runtimeInfoPlugin.decorateFile(filePath)
Decorates file if it is opened in editor.

**Kind**: instance method of [<code>RuntimeInfoPlugin</code>](#module_python-runtime-info..RuntimeInfoPlugin)  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path to file that will be decorated. |

<a name="module_python-runtime-info..RuntimeInfoPlugin+unregisterDecorator"></a>

#### runtimeInfoPlugin.unregisterDecorator(filePath)
Unregisters file decorator. Called when file is closed in editor.

**Kind**: instance method of [<code>RuntimeInfoPlugin</code>](#module_python-runtime-info..RuntimeInfoPlugin)  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | Path to file that was closed. |

<a name="module_python-runtime-info..RuntimeInfoPlugin+registerDecorator"></a>

#### runtimeInfoPlugin.registerDecorator(textEditor)
Registers file decorator. Called when file is opened in editor.

**Kind**: instance method of [<code>RuntimeInfoPlugin</code>](#module_python-runtime-info..RuntimeInfoPlugin)  

| Param | Type | Description |
| --- | --- | --- |
| textEditor | <code>TextEditor</code> | textEditor instance that was opened. |

