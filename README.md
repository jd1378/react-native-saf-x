# react-native-saf-x

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

After receiving a content uri using `openDocumentTree` function, you can use this as if like it's a normal path like we are used to. This is the intended behaviour, if you find any problems or if something does not behave as intended, please create an issue.

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

## Thanks to

- [ammarahm-ed](https://github.com/ammarahm-ed) for his work on [react-native-scoped-storage](https://github.com/ammarahm-ed/react-native-scoped-storage) which helped me jump start this module.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
