import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Chip, PaperProvider, Snackbar} from 'react-native-paper';
import {Response} from '../types/response.ts';
import {Header} from '../components/Header.tsx';
import {ItemCard} from '../components/ItemCard.tsx';
import {Total} from '../components/Total.tsx';
import {ItemToPay} from '../types/itemToPay.ts';

type Props = {
  dataProp: Response;
};

export const MyOrder = (props: Props) => {
  const {dataProp} = props;

  const [selectedDishes, setSelectedDishes] = useState<ItemToPay[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [data, setData] = useState(dataProp);
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const handleCardPress = (id: string) => {
    if (selectedDishes.some(dish => dish.itemId === id)) {
      const filteredSelectedDishes = selectedDishes.filter(
        item => item.itemId !== id,
      );

      setSelectedDishes(filteredSelectedDishes);
    } else {
      const updatedSelectedDishes = [
        ...selectedDishes,
        {orderId: data.myOrder.id, itemId: id},
      ];

      setSelectedDishes(updatedSelectedDishes);
    }
  };

  const handleOrderPress = (id: string) => {
    if (selectedOrder.includes(id)) {
      setSelectedOrder([]);
    } else {
      setSelectedOrder([id]);
      setSelectedDishes([]);
    }
  };

  return data ? (
    <View style={styles.container}>
      <PaperProvider>
        <Header
          qrCodeName={data.qrCodeName}
          restaurantName={data.restaurantName}
          orderNumber={data.myOrder.orderNumber}
        />
        <View style={styles.chipContainer}>
          <Chip
            selected={selectedOrder.includes(data.myOrder.id)}
            onPress={() => {
              handleOrderPress(data.myOrder.id);
            }}>
            Pay for order
          </Chip>
        </View>
        <ScrollView style={styles.scrollView}>
          {data.myOrder.orderItems
            .sort((a, b) => a.status - b.status)
            .map(item => {
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  data={data}
                  setData={setData}
                  handleCardPress={handleCardPress}
                  selectedDishes={selectedDishes.map(
                    selectedItem => selectedItem.itemId,
                  )}
                  isCardDisabled={selectedOrder.includes(data.myOrder.id)}
                />
              );
            })}
        </ScrollView>
        <Total
          allOrders={[data.myOrder]}
          selectedDishes={selectedDishes}
          selectedOrders={selectedOrder}
          qrCodeName={data.qrCodeName}
          restaurantId={data.restaurantId}
          showSnackbar={() => {
            onToggleSnackBar();
          }}
        />
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={5000}>
          Thank you for your order
        </Snackbar>
      </PaperProvider>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  scrollView: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
