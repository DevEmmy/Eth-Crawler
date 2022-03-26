import React, { useState, useRef, useEffect } from 'react'
import TransactionDetails from './TransactionDetails'

function Form() {
    // a state to hold the transactions dialogue and bring it up when true
    const [ checkTransaction, setCheckTransaction ] = useState(false)

    // a state to hold the wallet address details when fetched
    const [walletDetails, setWalletDetails ] = useState(null)

    // state to hold the wallet address transactions when fetched
    const [ walletTransactions, setWalletTransactions ] = useState(null)

    // a state to switch between checking the wallet balance or check wallet's transactions
    const [ oppCheckTransactionDetails, setOppCheckTransactionDetails ] = useState(true)
    
    // Ref holders for Wallet Address and Block
    const walletRef = useRef(null);
    const blockRef = useRef(null);

    // Function which returns the interface to check wallet's transactions
    const checkTransactionCompo = ()=>{
        return(
        <div className='form_compo'>
            <h3>Check Wallet Transactions</h3>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input type="text" placeholder='Wallet Address' ref={walletRef}/>
                <input type="text" placeholder='Block' ref={blockRef}/>
                <button onClick={()=> {fetchTransactionDetails();
                setWalletDetails(null)}}> Check Transactions</button>
            </form>

            { checkTransaction ?  <TransactionDetails closeFunc = {setCheckTransactionStatus} transactions={walletTransactions} walletAddress = { walletRef.current.value } /> : ""}
        </div>
        )
    }

    // Function which returns the interface to check the wallet's balance
    const checkWalletDetails = ()=>{
        return(
            <div className='form_compo'>
                <h3>Check Details</h3>
                <form onSubmit={(e)=>e.preventDefault()}>
                    <input type="text" placeholder='Wallet Address' ref={walletRef}/>
    
                    <button onClick={()=> {fetchDetails(); setWalletTransactions(null)}}> Check Wallet Balance</button>
                </form>
    
                { checkTransaction ?  <TransactionDetails closeFunc = {setCheckTransactionStatus}  walletAddress = { walletRef.current.value }  details = {walletDetails}/> : ""}
            </div>
            )
    }

    // Toggle Transaction Details Dialogue
    const setCheckTransactionStatus = ()=>{
        setCheckTransaction(!checkTransaction)
    }

    // Fetch Details Function 
    const fetchDetails = async ()=>{
        // if users submit no input
        if (walletRef.current.value === "" ){
            window.alert("Please Input Your Wallet Address")
        }

        // if users submit an address lesser than 10
        else if(walletRef.current.value.length <= 10){
            window.alert("Please Input a Valid Wallet Address")
        }

        // else 
        else{
        setCheckTransactionStatus()
        const apiKey = process.env.API_KEY;
        const url = `https://api.etherscan.io/api?module=account&action=balance&address=${walletRef.current.value}&tag=latest&apikey=${apiKey}`

        const resp = await fetch(url);
        const data = await resp.json()
        setWalletDetails([data]);
        }
    }

        
    const fetchTransactionDetails = async ()=>{
        // if users submit no input
        if (walletRef.current.value === ""){
            window.alert("Please Input Your Wallet Address")
        }

        // if users submit an address lesser than 10
        else if(walletRef.current.value.length <= 10){
            window.alert("Please Input a Walid Wallet Address")
        }

        // else
        else{
        setCheckTransactionStatus()
        const apiKey = process.env.API_KEY;
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletRef.current.value}&startblock=${blockRef.current.value}&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`

        const resp = await fetch(url);
        const data = await resp.json()
        setWalletTransactions(data.result);
        }
    }

    
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