import {Text, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

type Props = {
  initialValue: number;
  changeAmount: (val: number) => void;
  isDisabled: boolean;
};

export const AmountInput = (props: Props) => {
  const {initialValue, changeAmount, isDisabled} = props;

  const [inputValue, setInputValue] = useState(initialValue.toString());

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">Amount: </Text>
      <TextInput
        disabled={isDisabled}
        style={styles.input}
        value={inputValue}
        contentStyle={styles.inputContent}
        onChangeText={text => {
          setInputValue(text);
        }}
        onEndEditing={() => {
          changeAmount(Number(inputValue));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '50%',
    height: 36,
    backgroundColor: 'rgb(245, 242, 249)',
  },
  inputContent: {
    paddingVertical: 0,
  },
});
