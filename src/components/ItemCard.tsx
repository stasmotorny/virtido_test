import {Card, Text, Badge} from 'react-native-paper';
import {AmountInput} from './AmountInput.tsx';
import React from 'react';
import {OrderItem, Response} from '../types/response.ts';
import {StyleSheet, View} from 'react-native';

type Props = {
  item: OrderItem;
  data: Response;
  setData: (val: Response) => void;
  selectedDishes: string[];
  handleCardPress: (id: string) => void;
  isInputDisabled?: boolean;
  isCardDisabled?: boolean;
};

export const ItemCard = (props: Props) => {
  const {
    item,
    data,
    setData,
    selectedDishes,
    handleCardPress,
    isInputDisabled,
    isCardDisabled,
  } = props;

  const changeAmount = (newAmount: number) => {
    if (newAmount !== 0) {
      const dataCopy = {...data};

      const currentOrder = dataCopy.myOrder.orderItems.findIndex(
        order => order.id === item.id,
      );

      dataCopy.myOrder.orderItems[currentOrder].amount = newAmount;

      setData(dataCopy);
    }
  };

  const status: Record<number, string> = {
    0: 'New',
    1: 'In progress',
    2: 'Ready',
  };

  return (
    <Card
      disabled={item.isPaid || isCardDisabled}
      mode="elevated"
      style={selectedDishes.includes(item.id) ? styles.chosenCard : styles.card}
      onPress={() => handleCardPress(item.id)}>
      <View style={styles.nameStatusContainer}>
        <Text variant="titleLarge">{item.name}</Text>
        <Badge
          style={
            item.status === 0
              ? styles.badgeNew
              : item.status === 1
              ? styles.badgeInProgress
              : styles.badgeReady
          }>
          {status[item.status]}
        </Badge>
      </View>
      <Card.Content>
        {item.status === 0 && !isInputDisabled ? (
          <AmountInput
            initialValue={item.amount}
            changeAmount={changeAmount}
            isDisabled={item.isPaid}
          />
        ) : (
          <Text variant="bodyLarge">{`Amount: ${item.amount}`}</Text>
        )}
        <Text
          variant="bodyLarge"
          style={styles.price}>{`Price: ${item.price}`}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  chosenCard: {
    marginBottom: 12,
    borderColor: 'green',
    borderWidth: 3,
    backgroundColor: 'white',
  },
  badgeNew: {
    marginLeft: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#acf194',
    color: '#255b13',
  },
  badgeInProgress: {
    marginLeft: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#9fd0f3',
    color: '#245c85',
  },
  badgeReady: {
    marginLeft: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#f6e28e',
    color: '#7e6a18',
  },
  nameStatusContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  price: {
    fontWeight: 'bold',
  },
});
