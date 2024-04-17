import {Text, Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {MyOrder} from '../types/response.ts';
import {sendPayment} from '../API/requests.ts';

type ItemToPay = {
  orderId: string;
  itemId: string;
};

type Props = {
  selectedDishes: ItemToPay[];
  selectedOrders: string[];
  allOrders: MyOrder[];
  restaurantId: string;
  qrCodeName: string;
  showSnackbar: () => void;
};

export const Total = (props: Props) => {
  const {
    selectedDishes,
    selectedOrders,
    allOrders,
    restaurantId,
    qrCodeName,
    showSnackbar,
  } = props;

  const calculateTotal = (
    selectedDishesArg: ItemToPay[],
    selectedOrdersArg: string[],
    orders: MyOrder[],
  ): number => {
    let total = 0;

    if (selectedDishesArg.length) {
      selectedDishesArg.forEach(selectedItem => {
        const currentOrder = orders.find(
          order => order.id === selectedItem.orderId,
        );

        const dish = currentOrder!.orderItems.find(
          item => item.id === selectedItem.itemId,
        );

        total += dish!.price * dish!.amount;
      });
    }

    if (selectedOrdersArg.length) {
      selectedOrdersArg.forEach(selectedOrder => {
        const currentOrder = orders.find(order => order.id === selectedOrder);

        const dishes = currentOrder!.orderItems;

        dishes.forEach(dish => {
          if (!dish.isPaid) {
            total += dish!.price * dish!.amount;
          }
        });
      });
    }

    return total;
  };

  const onPayPress = (
    restaurantIdArg: string,
    qrCodeNameArg: string,
    orders: string[],
    dishes: ItemToPay[],
  ) => {
    sendPayment(restaurantIdArg, qrCodeNameArg, orders, dishes, showSnackbar);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">{`Total: ${calculateTotal(
        selectedDishes,
        selectedOrders,
        allOrders,
      ).toFixed(2)}`}</Text>
      <Button
        mode="contained"
        onPress={() => {
          onPayPress(restaurantId, qrCodeName, selectedOrders, selectedDishes);
        }}
        disabled={!selectedDishes.length && !selectedOrders.length}>
        Pay
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
