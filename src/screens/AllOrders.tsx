import React, {useState} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {MyOrder, OrderItem, Response} from '../types/response.ts';
import {Header} from '../components/Header.tsx';
import {ItemCard} from '../components/ItemCard.tsx';
import {Text, Chip, PaperProvider, Snackbar} from 'react-native-paper';
import {Total} from '../components/Total.tsx';
import {ItemToPay} from '../types/itemToPay.ts';

type Props = {
  dataProp: Response;
};

type Section = {
  title: number;
  data: OrderItem[];
};

export const AllOrders = (props: Props) => {
  const {dataProp} = props;

  const [selectedDishes, setSelectedDishes] = useState<ItemToPay[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [visible, setVisible] = React.useState(false);

  const sectionListData: Section[] = dataProp.orders.map(order => {
    const newObject: Section = {title: 0, data: []};

    newObject.title = order.orderNumber;
    newObject.data = order.orderItems.sort((a, b) => a.status - b.status);

    return newObject;
  });

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const onDishPress = (
    orderNumber: number,
    orders: MyOrder[],
    dishId: string,
  ) => {
    const checkIsDishSelected = selectedDishes.some(
      dish => dish.itemId === dishId,
    );

    if (checkIsDishSelected) {
      const removeSelection = selectedDishes.filter(
        dish => dish.itemId !== dishId,
      );

      setSelectedDishes(removeSelection);
    } else {
      const orderInfo = orders.find(order => order.orderNumber === orderNumber);

      let itemToPay = {
        orderId: '',
        itemId: '',
      };

      itemToPay.orderId = orderInfo!.id;
      itemToPay.itemId = dishId;

      setSelectedDishes([...selectedDishes, itemToPay]);
    }
  };

  const onOrderPress = (orderNumber: number) => {
    const selectedOrder = dataProp.orders.find(
      order => order.orderNumber === orderNumber,
    );

    if (selectedOrders.includes(selectedOrder!.id)) {
      const removeOrder = selectedOrders.filter(
        order => order !== selectedOrder?.id,
      );

      setSelectedOrders(removeOrder);
    } else {
      const removeOrderFromSelectedDishes = selectedDishes.filter(
        item => item.orderId !== selectedOrder!.id,
      );

      setSelectedDishes(removeOrderFromSelectedDishes);
      setSelectedOrders([...selectedOrders, selectedOrder!.id]);
    }
  };

  const onPayForAllOrdersPress = (
    selectedOrdersArg: string[],
    allOrders: MyOrder[],
  ) => {
    if (selectedOrdersArg.length === allOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(dataProp.orders.map(order => order.id));
      setSelectedDishes([]);
    }
  };

  return dataProp ? (
    <View style={styles.container}>
      <PaperProvider>
        <Header
          qrCodeName={dataProp.qrCodeName}
          restaurantName={dataProp.restaurantName}
        />
        <View style={styles.payAll}>
          <Chip
            selected={selectedOrders.length === dataProp.orders.length}
            onPress={() =>
              onPayForAllOrdersPress(selectedOrders, dataProp.orders)
            }>
            Pay for all orders
          </Chip>
        </View>
        <SectionList
          style={styles.sectionList}
          sections={sectionListData}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.sectionHeaderContainer}>
              <Text>{`Order#: ${title}`}</Text>
              <Chip
                selected={selectedOrders.includes(
                  dataProp.orders.find(order => order.orderNumber === title)!.id,
                )}
                onPress={() => {
                  onOrderPress(title);
                }}>
                Pay for order
              </Chip>
            </View>
          )}
          renderItem={({item, section}) => {
            return (
              <ItemCard
                data={dataProp}
                handleCardPress={() => {
                  onDishPress(section.title, dataProp.orders, item.id);
                }}
                item={item}
                selectedDishes={selectedDishes.map(
                  selectedItem => selectedItem.itemId,
                )}
                setData={() => {}}
                isInputDisabled={true}
                isCardDisabled={selectedOrders.includes(
                  dataProp.orders.find(
                    order => order.orderNumber === section.title,
                  )!.id,
                )}
              />
            );
          }}
        />
        <Total
          selectedDishes={selectedDishes}
          selectedOrders={selectedOrders}
          allOrders={dataProp.orders}
          qrCodeName={dataProp.qrCodeName}
          restaurantId={dataProp.restaurantId}
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
  sectionList: {
    paddingHorizontal: 16,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: 'rgb(245, 242, 249)',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  payAll: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
