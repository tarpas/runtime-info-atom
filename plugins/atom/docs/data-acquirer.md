<a name="DataAcquirer"></a>

## DataAcquirer
Python runtime info acquisition class.

**Kind**: global class  

* [DataAcquirer](#DataAcquirer)
    * [new DataAcquirer(acquisitionCallback)](#new_DataAcquirer_new)
    * [.acquire()](#DataAcquirer+acquire)
    * [.processAcquisitionResult(error, stdout, error)](#DataAcquirer+processAcquisitionResult)

<a name="new_DataAcquirer_new"></a>

### new DataAcquirer(acquisitionCallback)
Create DataAcquirer.


| Param | Type | Description |
| --- | --- | --- |
| acquisitionCallback | <code>Callback</code> | Callback function to be called after data is succesfully acquired. Callback function takes FileMarkMap as paramter. |

<a name="DataAcquirer+acquire"></a>

### dataAcquirer.acquire()
Asynchronously runs python script to acquire fileMarkList and calls
this.processAcquisitionResult when acquisition is finished.

**Kind**: instance method of [<code>DataAcquirer</code>](#DataAcquirer)  
<a name="DataAcquirer+processAcquisitionResult"></a>

### dataAcquirer.processAcquisitionResult(error, stdout, error)
Callback function that is called after data acquisition. If acquisition is
succesfull transforms fileMarkList to FileMarkMap and calls
acquisitionCallback.

**Kind**: instance method of [<code>DataAcquirer</code>](#DataAcquirer)  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Error object if python script couldn't be executed |
| stdout | <code>string</code> | standard output form data acquisition |
| error | <code>string</code> | error output form data acquisition |

