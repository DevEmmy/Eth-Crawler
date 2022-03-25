import React from 'react'

function TransactionDetails({closeFunc, transactions, walletAddress}) {
  return (
    <div className='transaction_compo'>
        <div className="dark_bg" />
        <div className="cancel_dialogue" onClick={()=>{ closeFunc() }}>
          x
        </div>
        <div className="transaction_container">

           <div className="transaction_content">
            {/* <div className="wallet_details">
              <h3>Wallet Details</h3>
            </div> */}

            { console.log(transactions)}
            <div className="transactions_details">
              <h3>Transactions Details</h3>
              <div className="details">
                
                {
                  transactions?.map((transaction)=>{
                    return(
                      <div className="details">
                        <p className="status">{ transaction.from == walletAddress ? "Sent" : "Received"}</p>
                        <p className="other_wallet">
                        { transaction.from == walletAddress ? `to : ${transaction.to}` : `from : ${transaction.from}`}
                        </p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
           </div>
        </div>
    </div>
  )
}

export default TransactionDetails