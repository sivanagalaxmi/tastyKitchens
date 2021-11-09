import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import Counter from '../Counter'

import './index.css'

class Cart extends Component {
  state = {cartData: [], payment: false}

  componentDidMount() {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    this.setState({cartData})
  }

  reRenderCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    this.setState({cartData})
  }

  calculateTotal = () => {
    const {cartData} = this.state
    const totalPrices = cartData.map(each => {
      const items = each.quantity
      const price = each.cost
      return items * price
    })
    const total = totalPrices.reduce((acc, cur) => acc + cur, 0)
    return total
  }

  onCLickPlace = () => {
    const emptyList = []
    localStorage.setItem('cartData', JSON.stringify(emptyList))
    this.setState({payment: true})
  }

  renderCartItems = () => {
    const {cartData} = this.state
    return (
      <>
        <div className="cart-container">
          <ul className="cart-items-list">
            <li key="titles-row" className="list-headings">
              <p className="item-heading">Item</p>
              <p className="quantity-heading">Quantity</p>
              <p className="price-heading">Price</p>
            </li>
            {cartData.map(each => (
              <li testid="cartItem" key={each.id} className="cart-list-item">
                <div className="img-name-container">
                  <img
                    src={each.imageUrl}
                    alt="dish item"
                    className="cart-dish-image"
                  />
                  <h1 className="cart-dish-name">{each.name}</h1>
                </div>
                <div className="counter-container">
                  <Counter
                    dish={each}
                    minus="decrement-quantity"
                    plus="increment-quantity"
                    amount="item-quantity"
                    renderCart={this.reRenderCart}
                  />
                </div>
                <div className="price-container">
                  <BiRupee color="#F7931E" />
                  <p className="price">{each.quantity * each.cost}.00</p>
                </div>
              </li>
            ))}
            <li key="order-total" className="order-total">
              <h1 className="order-total-heading">Order Total: </h1>
              <div className="total-cost-container">
                <BiRupee />
                <p testid="total-price" className="total-order-price">
                  {this.calculateTotal()}.00
                </p>
              </div>
            </li>
            <li key="place-order" className="place-order-item">
              <button
                type="button"
                className="place-order-button"
                onClick={this.onCLickPlace}
              >
                Place Order
              </button>
            </li>
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderPaymentPage = () => (
    <div className="payment-bg-container">
      <div className="payment-container">
        <img
          src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634468688/Vectorsuccess_f7vm3h.jpg"
          className="success-image"
          alt="success"
        />
        <h1 className="success">Payment Successful</h1>
        <p className="payment-success">
          Thank you for ordering
          <br /> Your payment is successfully completed.
        </p>
        <Link to="/">
          <button type="button" className="go-to-home">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  )

  renderCartPage = () => {
    const {payment} = this.state
    return (
      <>
        <Header currentRoute="cart" />
        {payment ? this.renderPaymentPage() : this.renderCartItems()}
      </>
    )
  }

  renderEmptyView = () => (
    <>
      <Header currentRoute="cart" />
      <div className="empty-view-container">
        <img
          src="https://res.cloudinary.com/dhhj6sruk/image/upload/v1634409095/cooking_1emptyview_fv5tlg.jpg"
          alt="empty cart"
          className="empty-cart-img"
        />
        <h1 className="no-orders">No Order Yet!</h1>
        <p className="no-orders-para">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button type="button" className="order-now">
            Order Now
          </button>
        </Link>
      </div>
    </>
  )

  render() {
    const {cartData} = this.state
    const emptyView = cartData === null || cartData.length === 0
    return <>{emptyView ? this.renderEmptyView() : this.renderCartPage()}</>
  }
}

export default Cart
