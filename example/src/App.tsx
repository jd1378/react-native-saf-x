import {View, StyleSheet, Button, ToastAndroid, TextInput} from 'react-native';
import {
  openDocumentTree,
  mkdir,
  createFile,
  writeFile,
  unlink,
  readFile,
  rename,
  getPersistedUriPermissions,
  releasePersistableUriPermission,
  listFiles,
  openDocument,
  createDocument,
  stat,
  copyFile,
  moveFile,
} from 'react-native-saf-x';

import {useStore} from './store';

export default function App() {
  const [selectedDirectory, changeDirectory] = useStore(
    'selectedDirectory',
    '',
  );

  const onSelectDirectoryPress = async () => {
    try {
      const doc = await openDocumentTree(true);
      if (doc?.uri) {
        console.log(doc.uri);
        await changeDirectory(doc.uri);
      } else {
        throw new Error('User did not select a directory');
      }
    } catch (e: any) {
      if (e) {
        if (e.message) {
          ToastAndroid.show('Error: ' + e.message, ToastAndroid.LONG);
        } else {
          ToastAndroid.show('Error: ' + JSON.stringify(e), ToastAndroid.LONG);
        }
      }
    }
  };

  const onSelectAndReadFilePress = async () => {
    try {
      const doc = await openDocument(true);
      if (doc?.uri) {
        console.log(doc.uri);
        const fileData = await readFile(doc.uri);
        ToastAndroid.show('Content: ' + fileData, ToastAndroid.SHORT);
      } else {
        throw new Error('User did not select a file');
      }
    } catch (e: any) {
      if (e) {
        if (e.message) {
          ToastAndroid.show('Error: ' + e.message, ToastAndroid.LONG);
        } else {
          ToastAndroid.show('Error: ' + JSON.stringify(e), ToastAndroid.LONG);
        }
      }
    }
  };

  const onSelectAndShowStatPress = async () => {
    try {
      const doc = await openDocument(true);
      if (doc?.uri) {
        console.log(doc.uri);
        const fileData = await stat(doc.uri);
        ToastAndroid.show(
          'Stat: ' + JSON.stringify(fileData),
          ToastAndroid.SHORT,
        );
      } else {
        throw new Error('User did not select a file');
      }
    } catch (e: any) {
      if (e) {
        if (e.message) {
          ToastAndroid.show('Error: ' + e.message, ToastAndroid.LONG);
        } else {
          ToastAndroid.show('Error: ' + JSON.stringify(e), ToastAndroid.LONG);
        }
      }
    }
  };

  const onSaveFilePress = async () => {
    try {
      const doc = await createDocument('a demo text');
      if (doc?.uri) {
        ToastAndroid.show('Saved file to: ' + doc.uri, ToastAndroid.SHORT);
      } else {
        throw new Error('User did not select a location');
      }
    } catch (e: any) {
      if (e) {
        if (e.message) {
          ToastAndroid.show('Error: ' + e.message, ToastAndroid.LONG);
        } else {
          ToastAndroid.show('Error: ' + JSON.stringify(e), ToastAndroid.LONG);
        }
      }
    }
  };

  const onRunTestPress = async () => {
    try {
      if (selectedDirectory) {
        const newDir = await mkdir(selectedDirectory + '/foo/bar');
        console.log(newDir.uri);
        ToastAndroid.show(
          '/foo/bar made under selected folder',
          ToastAndroid.SHORT,
        );
        await createFile(newDir.uri + '/subfolder/somefile.txt');
        ToastAndroid.show(
          'created /subfolder/somefile.txt in that folder',
          ToastAndroid.SHORT,
        );
        await writeFile(selectedDirectory + '/otherfile.txt', 'yes');
        ToastAndroid.show(
          'wrote "yes" otherfile.txt in base folder',
          ToastAndroid.SHORT,
        );
        await writeFile(selectedDirectory + '/otherfile.txt', ', maybe no', {
          append: true,
        });
        ToastAndroid.show(
          'appended ", maybe no" to otherfile.txt in base folder',
          ToastAndroid.SHORT,
        );

        const otherfileContent = await readFile(
          selectedDirectory + '/otherfile.txt',
        );
        ToastAndroid.show(
          'otherfile.txt content: ' + otherfileContent,
          ToastAndroid.SHORT,
        );

        await rename(selectedDirectory + '/otherfile.txt', 'anotherfile.txt');
        ToastAndroid.show(
          'otherfile.txt renamed to anotherfile.txt',
          ToastAndroid.SHORT,
        );

        await copyFile(
          selectedDirectory + '/anotherfile.txt',
          selectedDirectory + '/copiedfile.txt',
        );
        ToastAndroid.show(
          'anotherfile.txt copied to copiedfile.txt',
          ToastAndroid.SHORT,
        );

        await moveFile(
          selectedDirectory + '/anotherfile.txt',
          selectedDirectory + '/foo/bar/movedfile.txt',
        );
        ToastAndroid.show(
          'anotherfile.txt moved to foo/bar/movedfile.txt',
          ToastAndroid.SHORT,
        );

        await moveFile(selectedDirectory + '/foo', selectedDirectory + '/goo');
        ToastAndroid.show(
          'foo was moved to goo (renamed using move)',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show('failed to create dir', ToastAndroid.SHORT);
      }
    } catch (e: any) {
      if (e) {
        if (e.message) {
          ToastAndroid.show('Error: ' + e.message, ToastAndroid.LONG);
        } else {
          ToastAndroid.show('Error: ' + JSON.stringify(e), ToastAndroid.LONG);
        }
      }
    }
  };

  const onCleaupPress = async () => {
    try {
      // cleanup
      if (selectedDirectory) {
        const files = await listFiles(selectedDirectory);
        for (const f of files) {
          await unlink(f.uri);
        }
        ToastAndroid.show('Cleanup Successful', ToastAndroid.LONG);
      } else {
        ToastAndroid.show('No directory is selected', ToastAndroid.LONG);
      }
    } catch (e: any) {
      if (e) {
        if (e.message) {
          ToastAndroid.show('Error: ' + e.message, ToastAndroid.LONG);
        } else {
          ToastAndroid.show('Error: ' + JSON.stringify(e), ToastAndroid.LONG);
        }
      }
    }
  };

  const onShowPermissionPress = async () => {
    ToastAndroid.show(
      'Perms: ' + (await getPersistedUriPermissions()).join('\n'),
      ToastAndroid.SHORT,
    );
  };

  const onReleasePermissionsPress = async () => {
    await getPersistedUriPermissions().then(perms =>
      Promise.all(perms.map(p => releasePersistableUriPermission(p))),
    );
    ToastAndroid.show('All Permissions Revoked', ToastAndroid.SHORT);
  };

  const onListFilesPress = async () => {
    if (selectedDirectory) {
      await listFiles(selectedDirectory).then(files =>
        ToastAndroid.show(JSON.stringify(files), ToastAndroid.LONG),
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput value={selectedDirectory || ''} style={styles.input} />
      <Button onPress={onSelectDirectoryPress} title="Select Directory" />
      <Button onPress={onRunTestPress} title="Run test" />
      <Button onPress={onSelectAndReadFilePress} title="Select And Read File" />
      <Button onPress={onSelectAndShowStatPress} title="Select And Show Stat" />
      <Button onPress={onSaveFilePress} title="Save a File" />
      <Button onPress={onCleaupPress} title="Cleanup" />
      <Button onPress={onShowPermissionPress} title="Show Permissions" />
      <Button onPress={onReleasePermissionsPress} title="Release Permissions" />
      <Button onPress={onListFilesPress} title="List Files" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#eeeeee',
    borderStyle: 'solid',
    borderWidth: 1,
    width: '100%',
  },
});
