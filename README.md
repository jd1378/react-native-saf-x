# react-native-saf-x

<a href="https://www.npmjs.com/package/react-native-saf-x" target="_blank">
<img src="https://img.shields.io/npm/v/react-native-saf-x?color=green"/>
</a>

A module to help simplify usage of scoped storages on android.

intended to use when targeting Android API level 30+

## Installation

```sh
npm install react-native-saf-x
```

or

```sh
yarn add react-native-saf-x
```

## Usage

After receiving a content uri using `openDocumentTree` function,
 you can use this as if like it's a normal path like we are used to.
  This is the intended behaviour,
   if you find any problems or if something does not behave as intended,
    please create an issue.

Note that each method can reject when there's an unexpected error or when the permission is revoked.

Example:

```js
import { openDocumentTree, mkdir } from "react-native-saf-x";

// somewhere in the app .....

async function testIt() {
  const doc = await openDocumentTree(true);
  if (doc && doc.uri) {
    // user has selected a directory and uri is available
    // you can save this uri as base directory in your app and reuse it anywhere you want
    await mkdir(doc.uri + '/foo/bar'); // creates foo/bar folder and subfolder at selected directory
  }
}

```

For more examples look at example folder in the source.

## Table of contents

- [react-native-saf-x](#react-native-saf-x)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Table of contents](#table-of-contents)
  - [Types](#types)
    - [DocumentFileDetail](#documentfiledetail)
    - [FileOperationOptions](#fileoperationoptions)
    - [CreateDocumentOptions](#createdocumentoptions)
    - [Encoding](#encoding)
  - [Functions](#functions)
    - [openDocumentTree](#opendocumenttree)
    - [openDocument](#opendocument)
    - [createDocument](#createdocument)
    - [hasPermission](#haspermission)
    - [exists](#exists)
    - [readFile](#readfile)
    - [writeFile](#writefile)
    - [createFile](#createfile)
    - [unlink](#unlink)
    - [mkdir](#mkdir)
    - [rename](#rename)
    - [getPersistedUriPermissions](#getpersisteduripermissions)
    - [releasePersistableUriPermission](#releasepersistableuripermission)
    - [listFiles](#listfiles)
    - [stat](#stat)
  - [Caveats](#caveats)
  - [Thanks to](#thanks-to)
  - [Contributing](#contributing)
  - [License](#license)

## Types

### DocumentFileDetail

▸ Type: `object`

| Name           | Type                          | Description                                 |
|:---------------|:------------------------------|:--------------------------------------------|
| `uri`          | `string`                      | a normalized Document Tree Uri for the file or directory |
| `name`         | `string`                      | Name of the file or directory               |
| `type`         | ``"directory"`` \| ``"file"`` | -                                           |
| `lastModified` | `number`                      | Last modified date of the file or directory in epoch milliseconds |
| `mime`         | `string`                      | mime type of the file                       |
| `size`         | `number`                      | size of the file in bytes                   |

### FileOperationOptions

▸ Type: `object`

| Name           | Type                          | Description                                 |
|:---------------|:------------------------------|:--------------------------------------------|
| `encoding`     | `Encoding`                    |  Defaults to `'utf8'`                       |
| `append`       | `boolean`                     | Append data to the file. If not set file content will be overwritten.              |
| `mimeType`     | `string`                      | mime type of the file being saved. Defaults to '\*\/\*'|


### CreateDocumentOptions

▸ Type: FileOperationOptions & {initialName?: string; }

| Name           | Type                          | Description                                 |
|:---------------|:------------------------------|:--------------------------------------------|
| `initialName`     | `string`                   |  initial display name when opening file picker  |


### Encoding

▸ Type: 'utf8' | 'base64' | 'ascii'

## Functions

### openDocumentTree

▸ openDocumentTree (persist: boolean): Promise<DocumentFileDetail | null\>

Open the Document Picker to select a folder. Read/Write Permission will be granted to the selected folder.
Returns an object of type `DocumentFileDetail` or `null` if user did not select a folder.

### openDocument

▸ openDocument (persist: boolean): Promise<DocumentFileDetail | null\>

Open the Document Picker to select a file.
Returns an object of type `DocumentFileDetail` or `null` if user did not select a file.

### createDocument

▸ createDocument (data: string, options?: CreateDocumentOptions): Promise<DocumentFileDetail | null\>

Open the Document Picker to save a file.
Returns an object of type `DocumentFileDetail` or `null` if user did not select a file.

### hasPermission

▸ hasPermission (uriString: string): Promise<boolean\>

Check if you have permission to access the uri

### exists

▸ exists (uriString: string): Promise<boolean\>

Check if there's a document located at the given uri.

### readFile

▸ readFile (uriString: string, options?: Pick<FileOperationOptions, 'encoding'\>): Promise<string\>

Read contents of the given uri. uri must point to a file.

### writeFile

▸ writeFile (uriString: string, data: string, options?: FileOperationOptions): Promise<string\>

Writes the given data to the file at given uri.
Tries to create the file if does not already exist before writing to it.
Resolves with given uriString if successful.

### createFile

▸ createFile (uriString: string, options?: Pick<FileOperationOptions, 'mimeType'\>): Promise<DocumentFileDetail\>

Creates an empty file at given uri.
Rejects if a file or directory exist at given uri.

### unlink

▸ unlink(uriString: string): Promise<boolean\>

Removes the file or directory at given uri.
Resolves with `true` if delete is successful, `false` otherwise.

### mkdir

▸ mkdir(uriString: string): Promise<DocumentFileDetail\>

Create a directory at given uri.
Automatically creates folders in path if needed.
You can use it to create nested directories easily.
Rejects if it fails.

### rename

▸ rename(uriString: string, newName: string): Promise<boolean\>

Renames the document at given uri.
uri can be file or folder.
Resolves with `true` if successful and `false` otherwise.

### getPersistedUriPermissions

▸ getPersistedUriPermissions(): Promise<string[]\>

Returns a list of all the persisted uri permissions.

### releasePersistableUriPermission

▸ releasePersistableUriPermission(uriString: string): Promise<void\>

Remove a uri from persisted uri permissions list. 

### listFiles

▸ listFiles(uriString: string): Promise<DocumentFileDetail[]\>

List all files and folders in a directory uri.

### stat

▸ stat(uriString: string): Promise<DocumentFileDetail\>

Get details for a file/directory at given uri.


## Caveats

Due to simplyifing the uri structure usage, file and directories should not have the same name at a given uri.
doing so can cause unexpected results.
for example in a folder named "foo", do not create "bar" file and "bar" directory making the uri being "foo/bar" for both cases.

## Thanks to

- [ammarahm-ed](https://github.com/ammarahm-ed) for his work on [react-native-scoped-storage](https://github.com/ammarahm-ed/react-native-scoped-storage) 
 which helped me jump start this module.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
