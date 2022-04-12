import {NativeModules, Platform} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-saf-x' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const SafX = (
  NativeModules.SafX
    ? NativeModules.SafX
    : new Proxy(
        {},
        {
          get() {
            throw new Error(LINKING_ERROR);
          },
        },
      )
) as SafXInterface;

export type Encoding = 'utf8' | 'base64' | 'ascii';

interface SafXInterface {
  openDocumentTree(persist: boolean): Promise<DocumentFileDetail | null>;
  openDocument(persist: boolean): Promise<DocumentFileDetail | null>;
  createDocument(
    data: String,
    encoding?: String,
    initialName?: string,
    mimeType?: String,
  ): Promise<DocumentFileDetail | null>;
  hasPermission(uriString: string): Promise<boolean>;
  exists(uriString: string): Promise<boolean>;
  readFile(uriString: string, encoding?: Encoding): Promise<string>;
  writeFile(
    uriString: string,
    data: string,
    encoding?: Encoding,
    mimeType?: string,
    append?: boolean,
  ): Promise<string>;
  createFile(uriString: string, mimeType?: String): Promise<DocumentFileDetail>;
  unlink(uriString: string): Promise<boolean>;
  mkdir(uriString: string): Promise<DocumentFileDetail>;
  rename(uriString: string, newName: string): Promise<boolean>;
  getPersistedUriPermissions(): Promise<Array<string>>;
  releasePersistableUriPermission(uriString: string): Promise<void>;
  listFiles(uriString: string): Promise<DocumentFileDetail[]>;
  stat(uriString: string): Promise<DocumentFileDetail>;
  transferFile(
    srcUri: string,
    destUri: string,
    replaceIfDestExist: boolean,
    copy: boolean,
  ): Promise<DocumentFileDetail | null>;
}

export type DocumentFileDetail = {
  uri: string;
  name: string;
  type: 'directory' | 'file';
  lastModified: number;
  mime?: string;
  size?: number;
};

export type FileOperationOptions = {
  /** Defaults to `'utf8'` */
  encoding?: Encoding;

  /** Append data to the file. If not set file content will be overwritten. */
  append?: boolean;

  /** mime type of the file being saved. Defaults to '\*\/\*' */
  mimeType?: string;
};

export type CreateDocumentOptions = FileOperationOptions & {
  /** initial display name when opening file picker */
  initialName?: string;
};

export function openDocumentTree(persist: boolean) {
  return SafX.openDocumentTree(persist);
}

export function openDocument(persist: boolean) {
  return SafX.openDocument(persist);
}

export function createDocument(data: string, options?: CreateDocumentOptions) {
  if (!options) options = {};
  const {encoding, initialName, mimeType} = options;
  return SafX.createDocument(data, encoding, initialName, mimeType);
}

export function hasPermission(uriString: string) {
  return SafX.hasPermission(uriString);
}

export function exists(uriString: string) {
  return SafX.exists(uriString);
}

export function readFile(
  uriString: string,
  options?: Pick<FileOperationOptions, 'encoding'>,
) {
  if (!options) options = {};
  const {encoding} = options;
  return SafX.readFile(uriString, encoding);
}

/**
 * Tries to create the file if does not already exist before writing to it.
 */
export function writeFile(
  uriString: string,
  data: string,
  options?: FileOperationOptions,
) {
  if (!options) options = {};
  const {encoding, append, mimeType} = options;
  return SafX.writeFile(uriString, data, encoding, mimeType, !!append);
}

export function createFile(
  uriString: string,
  options?: Pick<FileOperationOptions, 'mimeType'>,
) {
  if (!options) options = {};
  const {mimeType} = options;
  return SafX.createFile(uriString, mimeType);
}

/** returns `true` if the pointed file or directory **is** deleted */
export function unlink(uriString: string) {
  return SafX.unlink(uriString);
}

/** Automatically creates folders in path if needed. so you can use it to create nested directories easily. */
export function mkdir(uriString: string) {
  return SafX.mkdir(uriString);
}

/** renames the document in place. uri can be file or folder. */
export function rename(uriString: string, newName: string) {
  return SafX.rename(uriString, newName);
}

export function getPersistedUriPermissions() {
  return SafX.getPersistedUriPermissions();
}

export function releasePersistableUriPermission(uriString: string) {
  return SafX.releasePersistableUriPermission(uriString);
}

export function listFiles(uriString: string) {
  return SafX.listFiles(uriString);
}

export function stat(uriString: string) {
  return SafX.stat(uriString);
}

type FileTransferOptions = {
  replaceIfDestinationExists?: boolean;
};

/** Does not support moving directories */
export function copyFile(
  srcUri: string,
  destUri: string,
  options?: FileTransferOptions,
) {
  if (!options) options = {};
  const {replaceIfDestinationExists = false} = options;
  return SafX.transferFile(srcUri, destUri, replaceIfDestinationExists, true);
}

/** Does not support moving directories */
export function moveFile(
  srcUri: string,
  destUri: string,
  options?: FileTransferOptions,
) {
  if (!options) options = {};
  const {replaceIfDestinationExists = false} = options;
  return SafX.transferFile(srcUri, destUri, replaceIfDestinationExists, false);
}

export default {
  openDocumentTree,
  openDocument,
  createDocument,
  hasPermission,
  exists,
  readFile,
  writeFile,
  createFile,
  unlink,
  mkdir,
  rename,
  getPersistedUriPermissions,
  releasePersistableUriPermission,
  listFiles,
  stat,
  copyFile,
  moveFile,
};
