# react-native-saf-x

<a href="https://www.npmjs.com/package/react-native-saf-x" target="_blank">
<img src="https://img.shields.io/npm/v/react-native-saf-x?color=green"/>
</a>

A module to help simplify usage of scoped storages on android.

intended to use when targeting Android API level 30+

Minimum supported API level is 24

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

- [Installation](#installation)
- [Usage](#usage)
- [Type aliases](#type-aliases)
- [Functions](#functions)
- [Caveats](#caveats)
- [Thanks to](#thanks-to)
- [Contributing](#contributing)
- [License](#license)

### Type aliases

- [CreateDocumentOptions](#createdocumentoptions)
- [DocumentFileDetail](#documentfiledetail)
- [Encoding](#encoding)
- [FileOperationOptions](#fileoperationoptions)
- [OpenDocumentOptions](#opendocumentoptions)

### Variables

- [default](#default)

### Functions

- [copyFile](#copyfile)
- [createDocument](#createdocument)
- [createFile](#createfile)
- [exists](#exists)
- [getPersistedUriPermissions](#getpersisteduripermissions)
- [hasPermission](#haspermission)
- [listFiles](#listfiles)
- [mkdir](#mkdir)
- [moveFile](#movefile)
- [openDocument](#opendocument)
- [openDocumentTree](#opendocumenttree)
- [readFile](#readfile)
- [releasePersistableUriPermission](#releasepersistableuripermission)
- [rename](#rename)
- [stat](#stat)
- [unlink](#unlink)
- [writeFile](#writefile)

## Type aliases

### CreateDocumentOptions

Ƭ **CreateDocumentOptions**: [`FileOperationOptions`](#fileoperationoptions) & { `initialName?`: `string`  }

#### Defined in

[index.tsx:90](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L90)

___

### DocumentFileDetail

Ƭ **DocumentFileDetail**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `lastModified` | `number` |
| `mime` | `string` |
| `name` | `string` |
| `size` | `number` |
| `type` | ``"directory"`` \| ``"file"`` |
| `uri` | `string` |

#### Defined in

[index.tsx:70](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L70)

___

### Encoding

Ƭ **Encoding**: ``"utf8"`` \| ``"base64"`` \| ``"ascii"``

#### Defined in

[index.tsx:29](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L29)

___

### FileOperationOptions

Ƭ **FileOperationOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `append?` | `boolean` | Append data to the file. If not set file content will be overwritten. |
| `encoding?` | [`Encoding`](#encoding) | Defaults to `'utf8'` |
| `mimeType?` | `string` | mime type of the file being saved. Defaults to '\*\/\*' |

#### Defined in

[index.tsx:79](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L79)

___

### OpenDocumentOptions

Ƭ **OpenDocumentOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `multiple?` | `boolean` | should the file picker allow multiple documents ? |
| `persist?` | `boolean` | should the permission of returned document(s) be persisted ? |

#### Defined in

[index.tsx:103](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L103)

## Variables

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `copyFile` | (`srcUri`: `string`, `destUri`: `string`, `options?`: `FileTransferOptions`) => `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\> |
| `createDocument` | (`data`: `string`, `options?`: [`CreateDocumentOptions`](#createdocumentoptions)) => `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\> |
| `createFile` | (`uriString`: `string`, `options?`: `Pick`<[`FileOperationOptions`](#fileoperationoptions), ``"mimeType"``\>) => `Promise`<[`DocumentFileDetail`](#documentfiledetail)\> |
| `exists` | (`uriString`: `string`) => `Promise`<`boolean`\> |
| `getPersistedUriPermissions` | () => `Promise`<`string`[]\> |
| `hasPermission` | (`uriString`: `string`) => `Promise`<`boolean`\> |
| `listFiles` | (`uriString`: `string`) => `Promise`<[`DocumentFileDetail`](#documentfiledetail)[]\> |
| `mkdir` | (`uriString`: `string`) => `Promise`<[`DocumentFileDetail`](#documentfiledetail)\> |
| `moveFile` | (`srcUri`: `string`, `destUri`: `string`, `options?`: `FileTransferOptions`) => `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\> |
| `openDocument` | (`options`: [`OpenDocumentOptions`](#opendocumentoptions)) => `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)[]\> |
| `openDocumentTree` | (`persist`: `boolean`) => `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\> |
| `readFile` | (`uriString`: `string`, `options?`: `Pick`<[`FileOperationOptions`](#fileoperationoptions), ``"encoding"``\>) => `Promise`<`string`\> |
| `releasePersistableUriPermission` | (`uriString`: `string`) => `Promise`<`void`\> |
| `rename` | (`uriString`: `string`, `newName`: `string`) => `Promise`<[`DocumentFileDetail`](#documentfiledetail)\> |
| `stat` | (`uriString`: `string`) => `Promise`<[`DocumentFileDetail`](#documentfiledetail)\> |
| `unlink` | (`uriString`: `string`) => `Promise`<`boolean`\> |
| `writeFile` | (`uriString`: `string`, `data`: `string`, `options?`: [`FileOperationOptions`](#fileoperationoptions)) => `Promise`<`void`\> |

#### Defined in

[index.tsx:259](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L259)

## Functions

### copyFile

▸ **copyFile**(`srcUri`, `destUri`, `options?`): `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\>

Copy file from source uri to destination uri.
promise Rejects if destination already exists and `replaceIfDestinationExists` option is not set to true.
Does not support moving directories.

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcUri` | `string` |
| `destUri` | `string` |
| `options?` | `FileTransferOptions` |

#### Returns

`Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\>

#### Defined in

[index.tsx:234](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L234)

___

### createDocument

▸ **createDocument**(`data`, `options?`): `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\>

Open the Document Picker to save a file.
Returns an object of type `DocumentFileDetail` or `null` if user did not select a file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `options?` | [`CreateDocumentOptions`](#createdocumentoptions) |

#### Returns

`Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\>

#### Defined in

[index.tsx:124](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L124)

___

### createFile

▸ **createFile**(`uriString`, `options?`): `Promise`<[`DocumentFileDetail`](#documentfiledetail)\>

Creates an empty file at given uri.
Rejects if a file or directory exist at given uri.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |
| `options?` | `Pick`<[`FileOperationOptions`](#fileoperationoptions), ``"mimeType"``\> |

#### Returns

`Promise`<[`DocumentFileDetail`](#documentfiledetail)\>

#### Defined in

[index.tsx:169](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L169)

___

### exists

▸ **exists**(`uriString`): `Promise`<`boolean`\>

Check if there's a document located at the given uri.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[index.tsx:136](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L136)

___

### getPersistedUriPermissions

▸ **getPersistedUriPermissions**(): `Promise`<`string`[]\>

Returns a list of all the persisted uri permissions.

#### Returns

`Promise`<`string`[]\>

#### Defined in

[index.tsx:206](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L206)

___

### hasPermission

▸ **hasPermission**(`uriString`): `Promise`<`boolean`\>

Check if you have permission to access the uri.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[index.tsx:131](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L131)

___

### listFiles

▸ **listFiles**(`uriString`): `Promise`<[`DocumentFileDetail`](#documentfiledetail)[]\>

List all files and folders in a directory uri.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |

#### Returns

`Promise`<[`DocumentFileDetail`](#documentfiledetail)[]\>

#### Defined in

[index.tsx:216](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L216)

___

### mkdir

▸ **mkdir**(`uriString`): `Promise`<[`DocumentFileDetail`](#documentfiledetail)\>

Create a directory at given uri.
Automatically creates folders in path if needed.
You can use it to create nested directories easily.
Rejects if it fails.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |

#### Returns

`Promise`<[`DocumentFileDetail`](#documentfiledetail)\>

#### Defined in

[index.tsx:192](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L192)

___

### moveFile

▸ **moveFile**(`srcUri`, `destUri`, `options?`): `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\>

Move file from source uri to destination uri.
promise Rejects if destination already exists and `replaceIfDestinationExists` option is not set to true.
Does not support moving directories.

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcUri` | `string` |
| `destUri` | `string` |
| `options?` | `FileTransferOptions` |

#### Returns

`Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\>

#### Defined in

[index.tsx:249](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L249)

___

### openDocument

▸ **openDocument**(`options`): `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)[]\>

Open the Document Picker to select a file.
DocumentFileDetail is always an array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`OpenDocumentOptions`](#opendocumentoptions) |

#### Returns

`Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)[]\>

`DocumentFileDetail[]` or `null` if user did not select a file.

#### Defined in

[index.tsx:115](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L115)

___

### openDocumentTree

▸ **openDocumentTree**(`persist`): `Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\>

Open the Document Picker to select a folder. Read/Write Permission will be granted to the selected folder.
Returns an object of type `DocumentFileDetail` or `null` if user did not select a folder.

#### Parameters

| Name | Type |
| :------ | :------ |
| `persist` | `boolean` |

#### Returns

`Promise`<``null`` \| [`DocumentFileDetail`](#documentfiledetail)\>

#### Defined in

[index.tsx:99](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L99)

___

### readFile

▸ **readFile**(`uriString`, `options?`): `Promise`<`string`\>

Read contents of the given uri. uri must point to a file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |
| `options?` | `Pick`<[`FileOperationOptions`](#fileoperationoptions), ``"encoding"``\> |

#### Returns

`Promise`<`string`\>

#### Defined in

[index.tsx:141](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L141)

___

### releasePersistableUriPermission

▸ **releasePersistableUriPermission**(`uriString`): `Promise`<`void`\>

Remove a uri from persisted uri permissions list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.tsx:211](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L211)

___

### rename

▸ **rename**(`uriString`, `newName`): `Promise`<[`DocumentFileDetail`](#documentfiledetail)\>

Renames the document at given uri.
uri can be file or folder.
Resolves with `true` if successful and `false` otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |
| `newName` | `string` |

#### Returns

`Promise`<[`DocumentFileDetail`](#documentfiledetail)\>

#### Defined in

[index.tsx:201](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L201)

___

### stat

▸ **stat**(`uriString`): `Promise`<[`DocumentFileDetail`](#documentfiledetail)\>

Get details for a file/directory at given uri.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |

#### Returns

`Promise`<[`DocumentFileDetail`](#documentfiledetail)\>

#### Defined in

[index.tsx:221](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L221)

___

### unlink

▸ **unlink**(`uriString`): `Promise`<`boolean`\>

Removes the file or directory at given uri.
Resolves with `true` if delete is successful, throws otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[index.tsx:182](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L182)

___

### writeFile

▸ **writeFile**(`uriString`, `data`, `options?`): `Promise`<`void`\>

Writes the given data to the file at given uri.
Tries to create the file if does not already exist before writing to it.
Resolves with given uriString if successful.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uriString` | `string` |
| `data` | `string` |
| `options?` | [`FileOperationOptions`](#fileoperationoptions) |

#### Returns

`Promise`<`void`\>

#### Defined in

[index.tsx:155](https://github.com/jd1378/react-native-saf-x/blob/de1efc0/src/index.tsx#L155)

## Caveats

Due to simplyifing the uri structure usage, file and directories should not have the same name at a given uri.
doing so can cause unexpected results.
for example in a folder named "foo", do not create "bar" file and "bar" directory making the uri being "foo/bar" for both cases.

___

## Thanks to

- [ammarahm-ed](https://github.com/ammarahm-ed) for his work on [react-native-scoped-storage](https://github.com/ammarahm-ed/react-native-scoped-storage)
 which helped me jump start this module.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
