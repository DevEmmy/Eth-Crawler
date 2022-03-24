import React from 'react'

function TransactionDetails({closeFunc}) {
  return (
    <div className='transaction_compo'>
        <div className="dark_bg" />
        <div className="cancel_dialogue" onClick={()=>{ closeFunc() }}>
          x
        </div>
        <div className="transaction_container">

           <div className="transaction_content">
            <div className="wallet_details">
              <h3>Wallet Details</h3>
            </div>

            <div className="transactions_details">
              <h3>Transactions Details</h3>
            </div>
           </div>
        </div>
    </div>
  )
}

export default TransactionDetails