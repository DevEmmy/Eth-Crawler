import React, { useState, useRef } from 'react'
import TransactionDetails from './TransactionDetails'

function Form() {
    const [ checkTransaction, setCheckTransaction ] = useState(false)
    const [walletDetails, setWalletDetails ] = useState([])

    const walletRef = useRef(null);
    const blockRef = useRef(null);
    const apiKey = process.env.API_KEY

    


    const setCheckTransactionStatus = ()=>{
        setCheckTransaction(!checkTransaction)
        console.log('No')
    }

    const fetchDetails = async ()=>{
        const url = `https://api.etherscan.io/api?module=account&action=balance&address=${walletRef.current.value}&tag=latest&apikey=${apiKey}`

        const resp = await fetch(url);
        // const data = resp.json()
        // setWalletDetails(data.response);
        console.log(resp.json())
    }

  return (
    <div className='form_compo'>
        <h3>Check Details</h3>
        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" placeholder='Wallet Address' ref={walletRef}/>
            <input type="text" placeholder='Block' ref={blockRef}/>
            <button onClick={()=> {setCheckTransactionStatus(); fetchDetails();}}> Check </button>
        </form>

        { checkTransaction ?  <TransactionDetails closeFunc = {setCheckTransactionStatus}/> : ""}
    </div>
  )
}

export default Form