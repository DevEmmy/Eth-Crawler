import React from 'react'
import Loader from './Loader'
import TransactionCompo from './TransactionCompo'

function TransactionDetails({closeFunc, transactions, walletAddress, loader, details}) {
  return (
    <div className='transaction_compo'>
        <div className="dark_bg" />
        <div className="cancel_dialogue" onClick={()=>{ closeFunc() }}>
          x
        </div>
        { console.log(details)}
        { details || transactions  ? <TransactionCompo walletAddress={walletAddress} transactions={transactions} details={details}/> : <Loader />}
       
    </div>
  )
}

export default TransactionDetails