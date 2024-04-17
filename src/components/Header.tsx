import {Text} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  restaurantName: string;
  qrCodeName: string;
  orderNumber?: number;
};

export const Header = (props: Props) => {
  const {restaurantName, qrCodeName, orderNumber} = props;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">
        Restaurant: <Text variant="titleLarge">{`${restaurantName}`}</Text>
      </Text>
      <Text variant="titleLarge">
        QR Name: <Text variant="titleLarge">{`${qrCodeName}`}</Text>
      </Text>
      {orderNumber ? (
        <Text variant="titleLarge">
          Order number: <Text variant="titleLarge">{`${orderNumber}`}</Text>
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: 'white',
    padding: 16,
  },
});
