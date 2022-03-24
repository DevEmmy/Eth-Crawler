import React, { useState } from 'react'
import TransactionDetails from './TransactionDetails'

function Form() {
    const [ checkTransaction, setCheckTransaction ] = useState(false)


    const setCheckTransactionStatus = ()=>{
        setCheckTransaction(true)
        console.log('No')
    }

    // const fetchDetails = (e)=>{
    //     e.preventDefault()
    // }
  return (
    <div className='form_compo'>
        <h3>Check Details</h3>
        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" placeholder='Wallet Address'/>
            <input type="text" placeholder='Block' />
            <button onClick={()=> {setCheckTransactionStatus();}}> Check </button>
        </form>

        { checkTransaction ?  <TransactionDetails /> : ""}
    </div>
  )
}

export default Form