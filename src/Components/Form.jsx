import React, { useState, useRef, useEffect } from 'react'
import TransactionDetails from './TransactionDetails'

function Form() {
    const [ checkTransaction, setCheckTransaction ] = useState(false)
    const [walletDetails, setWalletDetails ] = useState(null)
    const [ walletTransactions, setWalletTransactions ] = useState(null)
    const [loader, setLoader] = useState(false)
    const [ oppCheckTransactionDetails, setOppCheckTransactionDetails ] = useState(true)
    

    const walletRef = useRef(null);
    const blockRef = useRef(null);
    const apiKey = process.env.API_KEY;

    const checkTransactionCompo = ()=>{
        return(
        <div className='form_compo'>
            <h3>Check Details</h3>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input type="text" placeholder='Wallet Address' ref={walletRef}/>
                <input type="text" placeholder='Block' ref={blockRef}/>
                <button onClick={()=> {setCheckTransactionStatus(); fetchTransactionDetails();
                setWalletDetails(null)}}> Check Transactions</button>
            </form>

            { checkTransaction ?  <TransactionDetails closeFunc = {setCheckTransactionStatus} transactions={walletTransactions} walletAddress = { walletRef.current.value } loader = {loader}/> : ""}
        </div>
        )
    }

    const checkWalletDetails = ()=>{
        return(
            <div className='form_compo'>
                <h3>Check Details</h3>
                <form onSubmit={(e)=>e.preventDefault()}>
                    <input type="text" placeholder='Wallet Address' ref={walletRef}/>
    
                    <button onClick={()=> {setCheckTransactionStatus();fetchDetails(); setWalletTransactions(null)}}> Check Wallet Balance</button>
                </form>
    
                { checkTransaction ?  <TransactionDetails closeFunc = {setCheckTransactionStatus}  walletAddress = { walletRef.current.value } loader = {loader} details = {walletDetails}/> : ""}
            </div>
            )
    }


    const setCheckTransactionStatus = ()=>{
        setCheckTransaction(!checkTransaction)
        console.log('No')
    }

    const fetchDetails = async ()=>{
        const apiKey = process.env.API_KEY;
        const url = `https://api.etherscan.io/api?module=account&action=balance&address=${walletRef.current.value}&tag=latest&apikey=${apiKey}`

        const resp = await fetch(url);
        const data = await resp.json()
        setWalletDetails([data]);
    }

        
    const fetchTransactionDetails = async ()=>{
        const apiKey = process.env.API_KEY;
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletRef.current.value}&startblock=${blockRef.current.value}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`

        const resp = await fetch(url);
        const data = await resp.json()
        setWalletTransactions(data.result);
        console.log(data.result)
    }

    // useEffect(fetchTransactionDetails(), [walletTransactions])
    
  return (
    <>
    <div className="opp_container">
        <div className="opp" onClick={()=>setOppCheckTransactionDetails(true)} style={ oppCheckTransactionDetails ? { background: "rgba(100, 180, 230, 0.2)", color: "rgba(100, 180, 230, 1)"} : {background:""}}>
            Check Transaction Details
        </div>

        <div className="opp" onClick={()=>setOppCheckTransactionDetails(false)} style={ oppCheckTransactionDetails ? {background:""} : { background: "rgba(100, 180, 230, 0.2)", color: "rgba(100, 180, 230, 1)"}}>
            Check Wallet Balance
        </div>
    </div>
    { oppCheckTransactionDetails ? checkTransactionCompo() : checkWalletDetails()}
    </>
  )
}

export default Form