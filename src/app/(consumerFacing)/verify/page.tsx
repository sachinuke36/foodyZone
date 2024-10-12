// app/verify/page.tsx
"use client"
import { formatNumber } from '@/lib/formatter';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from "sonner"


const VerifyPage = () => {
  // Get search params from the URL
  const searchParams = useSearchParams();
  let success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const stat = success === 'true' ? true:false; 

//   console.log("success",success)


  const [orderDetails, setOrderDetails] = useState<any>(null);

  // Fetch the order details (optional)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        // Fetch order details from your backend using the orderId
        const response = await fetch(`/api/orders/${orderId}`,{
            method:"POST",
            headers:{
                "Content-Type":""
            },
            body:JSON.stringify({
                success: stat, // or false, depending on your status
                orderId: orderId
              }),
            cache: 'no-cache'
        },);
        // console.log(await response.json())
        const data = await response.json();
        // console.log("data",response)
        setOrderDetails(data);
        if(data){
            toast("Payment successful")
        }

      }
    };
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <div className="container border text-center mx-auto">
      <h1 className="text-2xl font-bold mt-8">
        {success === 'true' ? 'Payment Successful!' : 'Payment Failed'}
      </h1>
      {orderDetails && (
        <div className="mt-4">
          <h2>Order ID: {orderId}</h2>
          {/* Display other order details if needed */}
          <p>Total Amount: Rs.{formatNumber((orderDetails.amount / 100)*80)}</p>
        </div>
      )}
      {success === 'false' && <p>Your payment was not successful. Please try again.</p>}
    </div>
  );
};

export default VerifyPage;
