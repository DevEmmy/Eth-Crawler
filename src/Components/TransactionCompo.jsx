import React from 'react'

function TransactionCompo({transactions, walletAddress, details}) {
  return (
    <div className="transaction_container">

<div className="transaction_content">
 <div className="transactions_details">
   <h3>Transactions Details </h3>
   <div className="details" >
     
     {/* if the transactions state is non empty (meanwhile the details state is), display the dialogue with the transactions details */}
     {
       transactions && transactions?.map((transaction)=>{
         return(
           <div className="detail">
             <p className="status" style={transaction.from === walletAddress ? {color:"red"} : {color:"green"} }>Status: { transaction.from === walletAddress ? "Sent" : "Received"}</p>
             <p className="other_wallet">
             { transaction.from === walletAddress ? `to : ${transaction.to || walletAddress}` : `from : ${transaction.from}`}
             </p>
             <p className="value">
               Value : {transaction.value / 1000000000000000000} ETH
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

     {/* if the details state is non empty (meanwhile the transactions state is), display the dialogue with the transactions details */}

     {
       details && details.map((detail)=>{
         return(
           <>
              <div className="detail small_view">
                <p>Wallet Address : { walletAddress }</p>
                <p> Balance : { detail.result/ 1000000000000000000} ETH</p>
              </div>
           </>
         )
       })
     }
   </div>
 </div>
</div>
</div>
  )
}

export default TransactionCompo