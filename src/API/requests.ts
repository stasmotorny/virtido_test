import axios from 'axios';
import {Response} from '../types/response.ts';
import {ItemToPay} from '../types/itemToPay.ts';

axios.defaults.baseURL = 'https://api.dev.gastrojames.ch/api/test';

export const fetchOrders = async (
  setLoading: (val: boolean) => void,
  setError: (err: any) => void,
) => {
  try {
    setLoading(true);
    const response = await axios.get<Response>('/order-get');
    return response.data;
  } catch (error) {
    setError(error);
    console.error('DATA_FETCH_ERROR', error);
  }
};

export const sendPayment = async (
  restaurantId: string,
  qrCodeName: string,
  orders: string[],
  dishes: ItemToPay[],
  showSnackbar: () => void,
) => {
  try {
    await axios
      .post<Response>(
        `/order-pay?restaurantId=${restaurantId}&qrCodeName=${qrCodeName}`,
        {
          ordersToPay: orders,
          itemsToPay: dishes,
        },
      )
      .then(() => showSnackbar());
  } catch (error) {
    console.error('SEND_PAYMENT_ERROR', error);
  }
};
