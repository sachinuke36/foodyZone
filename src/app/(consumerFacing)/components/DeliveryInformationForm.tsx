"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormState, useFormStatus } from 'react-dom'
import { placeOrder } from '../actions/placeOrder'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'


const DeliveryInformationForm = ({ orderItems, subtotal, userId }: { orderItems: Object, subtotal: number, userId: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [error, action] = useFormState(async (prevState: void, formData: FormData) => {
        setLoading(true);
        try {
            const response = await placeOrder(orderItems, subtotal, formData);
            //    console.log("res",response)
            if (response.success && response.session_url) {
                router.push(response.session_url);  // Redirect to Stripe checkout
            } else {
                console.error('Order placement failed');
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }

    }, {})
    return (
        <div>
            <h1 className='text-[22px] font-extrabold mb-6'>Delivery Information</h1>
            <form action={action} className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <Input type='text' placeholder='First name' required name='fname' />
                    <Input type='text' placeholder='Last name' required name='lname' />
                </div>

                <Input type='email' name='email' required placeholder='Email address' />
                <Input type='text' name='street' required placeholder='Street' />

                <div className='flex gap-2'>
                    <Input type='text' name='city' required placeholder='City' />
                    <Input type='state' name='state' required placeholder='State' />
                </div>

                <div className='flex gap-2'>
                    <Input type='number' name='pin' required placeholder='Pin code' />
                    <Input type='text' name='country' required placeholder='Country' />
                </div>

                <Input type='phone' name='phone' required placeholder='Phone' />
                {/* <Button type='submit' disabled={loading} className={cn('',loading && 'spin')}>{loading ?
                <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
                :"Place order"}</Button> */}
                <SubmitButton/>
            </form>
        </div>
    )
}

export default DeliveryInformationForm


const SubmitButton =()=>{
    const {pending} = useFormStatus()
    return (<Button type='submit' className='w-40 mx-auto' disabled={pending}>{pending ? 'Placing order...':"Place order"}</Button>) 

}