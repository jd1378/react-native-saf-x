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
        ToastAndroid.show('Cleanup Successful', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('No directory is selected', ToastAndroid.SHORT);
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

  const onTestInternalPath = async () => {
    await createFile(
      '/data/user/0/com.example.reactnativesafx/files/test/fud/bar.baz',
    )
      .then(files => {
        console.log('file created:', JSON.stringify(files));
        ToastAndroid.show(JSON.stringify(files), ToastAndroid.LONG);
        return listFiles('/data/user/0/com.example.reactnativesafx/files/');
      })
      .catch(error => {
        console.log('Failed to create file:', JSON.stringify(error));
      })
      .then(listedFiles => {
        console.log('files:', JSON.stringify(listedFiles));
      })
      .finally(() =>
        unlink('/data/user/0/com.example.reactnativesafx/files/test')
          .catch(e => {
            console.error('cleanup failed: ', e);
          })
          .then(() =>
            listFiles('/data/user/0/com.example.reactnativesafx/files/').then(
              files =>
                console.log('POST CLEANUP RESULTS:', JSON.stringify(files)),
            ),
          ),
      );
  };

  return (
    <View style={styles.container}>
      <TextInput value={selectedDirectory || ''} style={styles.input} />
      <View style={styles.buttonWrapper}>
        <Button onPress={onSelectDirectoryPress} title="Select Directory" />
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={onRunTestPress} title="Run test" />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          onPress={onSelectAndReadFilePress}
          title="Select And Read File"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          onPress={onSelectAndShowStatPress}
          title="Select And Show Stat"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={onSaveFilePress} title="Save a File" />
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={onCleaupPress} title="Cleanup" />
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={onShowPermissionPress} title="Show Permissions" />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          onPress={onReleasePermissionsPress}
          title="Release Permissions"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={onListFilesPress} title="List Files" />
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={onTestInternalPath} title="Test Internal Path" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonWrapper: {
    marginRight: 10,
    marginBottom: 10,
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
