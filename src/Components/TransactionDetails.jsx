import React from 'react'
import Loader from './Loader'
import TransactionCompo from './TransactionCompo'

function TransactionDetails({closeFunc, transactions, walletAddress, details}) {
  return (
    <div className='transaction_compo'>
      {/* The Dark Background behind the dialogue */}
        <div className="dark_bg" />
        <div className="cancel_dialogue" onClick={()=>{ closeFunc() }}>
          x
        </div>

        {/* One of details or transactions would be filled while the other will be empty then the non empty one will be passed into the TransactionCompo and displayed on the Transaction Dialogue */}

        { details || transactions  ? <TransactionCompo walletAddress={walletAddress} transactions={transactions} details={details}/> : <Loader />}
       
    </div>
  )
}

export default TransactionDetails