import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import {MyOrder} from './src/screens/MyOrder.tsx';
import {AllOrders} from './src/screens/AllOrders.tsx';
import {fetchOrders} from './src/API/requests.ts';
import {ActivityIndicator, Button, Icon, Text} from 'react-native-paper';
import {Response} from './src/types/response.ts';

const App = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();

  const [data, setData] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders(setIsLoading, setError).then(fetchedData => {
      if (fetchedData) {
        setData(fetchedData);
        setIsLoading(true);
      }
    });
  }, []);

  if (error) {
    return (
      <>
        <Text>Data loading failed.</Text>
        <Button
          onPress={() =>
            fetchOrders(setIsLoading, setError).then(fetchedData => {
              if (fetchedData) {
                setData(fetchedData);
                setIsLoading(true);
              }
            })
          }>
          Try again
        </Button>
      </>
    );
  }

  return isLoading && !data ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator />
    </View>
  ) : (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="My order"
          children={props => <MyOrder dataProp={data!} {...props} />}
          options={{
            tabBarLabelStyle: {fontSize: 16, color: 'black'},
            tabBarLabel: 'My order',
            tabBarIcon: () => <Icon source="account" size={24} />,
          }}
        />
        <Tab.Screen
          name="All orders"
          children={props => <AllOrders dataProp={data!} {...props} />}
          options={{
            tabBarLabelStyle: {fontSize: 16, color: 'black'},
            tabBarLabel: 'All orders',
            tabBarIcon: () => <Icon source="account-multiple" size={24} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
