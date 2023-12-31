import React, { useEffect, useState } from 'react';
import './PlansScreen.css';
import db from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  const loadCheckout = async (priceId) => {
    setLoading(true);
    const docRef = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }).finally(() => {
        setLoading(false);
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          'pk_test_51ID1SQBQeGQcoPkuG5Zpgs4fxwWQbWIrRMQDlK2Lzspe3iYyaTaUvga93LPHoA38TSOJeUZ0YXq8tLbOM3j7CzMG00QVf1EPFq'
        );
        stripe.redirectToCheckout({ sessionId }).finally(() => {
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    db.collection('products')
      .where('active', '==', true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection('prices').get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  return (
    <div className='plansScreen'>
      <br />
      {subscription && (
        <p>
          Renewal date:{' '}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              (isCurrentPackage)  && 'plansScreen__plan--disabled'
            } plansScreen__plan`}
          >
            <div className='plansScreen__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              disabled={isCurrentPackage || loading}
              onClick={() => loadCheckout(productData?.prices?.priceId)}
            >
              {isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
            {
              loading && 
                <div id="loader" className="nfLoader"></div>
            }
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
