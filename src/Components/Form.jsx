import React, { useState, useRef, useEffect } from 'react'
import TransactionDetails from './TransactionDetails'

function Form() {
    const [ checkTransaction, setCheckTransaction ] = useState(false)
    const [walletDetails, setWalletDetails ] = useState(null)
    const [ walletTransactions, setWalletTransactions ] = useState(null)
    const [loader, setLoader] = useState(false)

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
        const data = await resp.json()
        setWalletDetails(data.response);
        console.log(data)
    }

        
    const fetchTransactionDetails = async ()=>{
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletRef.current.value}&startblock=${blockRef.current.value}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`

        const resp = await fetch(url);
        const data = await resp.json()
        setWalletTransactions(data.result);
        console.log(data.result)
    }

    // useEffect(fetchTransactionDetails(), [walletTransactions])
    
  return (
    <div className='form_compo'>
        <h3>Check Details</h3>
        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" placeholder='Wallet Address' ref={walletRef}/>
            <input type="text" placeholder='Block' ref={blockRef}/>
            <button onClick={()=> {setCheckTransactionStatus(); fetchTransactionDetails()}}> Check </button>
        </form>

        { checkTransaction ?  <TransactionDetails closeFunc = {setCheckTransactionStatus} transactions={walletTransactions} walletAddress = { walletRef.current.value } loader = {loader}/> : ""}
    </div>
  )
}

export default Form