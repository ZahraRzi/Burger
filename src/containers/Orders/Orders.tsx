import React, { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import instance from "../../axios-order";
import withErrorHandler from "../../components/withErrorHandler/withErrorHandler";

const Orders: React.FC = (props): React.ReactElement => {
  //   const { id } = props;
  const [orders, setOrders] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get("/orders.json")
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        console.log(fetchOrders);
        setOrders(fetchOrders);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {orders.map((order) => {
        // console.log(order);
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        );
      })}
    </div>
  );
};

export default withErrorHandler(Orders, instance);
