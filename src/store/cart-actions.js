import { cartActions } from './cartSlice';
import { uiActions } from './uiSlice';

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        'https://redux-http-e70fc-default-rtdb.firebaseio.com/cartItems.json'
      );
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          message: 'Fetching data from the database failed!',
          type: 'error',
          open: true,
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        message: 'Sending Request',
        type: 'warning',
        open: true,
      })
    );

    const sendRequest = async () => {
      // send state as sending request

      const res = await fetch(
        'https://redux-http-e70fc-default-rtdb.firebaseio.com/cartItems.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );
      await res.json();
      // send state as successfully sent request
      dispatch(
        uiActions.showNotification({
          message: 'Request sent to datebase successfully',
          type: 'success',
          open: true,
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          message: 'Sending request failed',
          type: 'error',
          open: true,
        })
      );
    }
  };
};
