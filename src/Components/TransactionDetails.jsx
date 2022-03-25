import React from 'react'
import Loader from './Loader'

function TransactionDetails({closeFunc, transactions, walletAddress, loader}) {
  return (
    <div className='transaction_compo'>
        <div className="dark_bg" />
        <div className="cancel_dialogue" onClick={()=>{ closeFunc() }}>
          x
        </div>
        { transactions ?  <div className="transaction_container">

<div className="transaction_content">
 <div className="transactions_details">
   <h3>Transactions Details</h3>
   <div className="details">
     {console.log(transactions)}
     
     {
       transactions?.map((transaction)=>{
         return(
           <div className="detail">
             <p className="status">Status: { transaction.from === walletAddress ? "Sent" : "Received"}</p>
             <p className="other_wallet">
             { transaction.from === walletAddress ? `to : ${transaction.to || walletAddress}` : `from : ${transaction.from}`}
             </p>
             <p className="value">
               Value : {transaction.value}
             </p>
             <p className="date_time">
               Date : { 
                 new Date(transaction.timeStamp * 1000).toLocaleString()
               }
             </p>
           </div>
         )
       })
     }
   </div>
 </div>
</div>
</div>: <Loader />}
       
    </div>
  )
}

export default TransactionDetails