import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const HomeRoute = props => {
  const logoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="main-container">
      <div className="bank-logo">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button className="logoutbtn" type="button" onClick={logoutButton}>
          Logout
        </button>
      </div>
      <div className="digital-card">
        <h1 style={{color: 'white'}}>Your Flexibility, Our Excellence</h1>
        <img
          style={{width: '90%', height: '70%'}}
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default withRouter(HomeRoute)
