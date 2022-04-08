import {useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {multiply} from 'react-native-saf-x';

export default function App() {
  const [result, setResult] = useState<number | undefined>();

  useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  const onPress = () => {
    console.log('foo');
  };

    return (
      <View style={styles.container}>
        <Button onPress={onPress} title={result?.toString() || 'button'} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
