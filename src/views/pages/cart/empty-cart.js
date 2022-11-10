import React from 'react'
import Header from '../../component/Common/Header'
import Banner from '../../component/Common/Banner'
import EmptyCart from '../../component/Cart/EmptyCart'
const EmptyCarts = () => {
  return (
    <>
      <Header />
      <Banner title="Empty Cart" />
      <EmptyCart />
    </>
  )
}

export default EmptyCarts