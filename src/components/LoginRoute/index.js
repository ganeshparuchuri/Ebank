import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {userid: '', pin: '', errorShow: false, errorMsg: ''}

  onChangeUserid = event => {
    this.setState({userid: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorShow: true, errorMsg})
  }

  formSubmit = async event => {
    event.preventDefault()
    const {userid, pin} = this.state
    const url = ' https://apis.ccbp.in/ebank/login'
    const userDetails = {userid, pin}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userid, pin, errorMsg, errorShow} = this.state
    return (
      <div className="main-container">
        <div className="sub-container">
          <div
            style={{
              width: '50%',
              backgroundColor: ' #e0eefe',
              borderRadius: '10px',
            }}
          >
            <img
              style={{width: '80%'}}
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="inputs-container">
            <form onSubmit={this.formSubmit} className="form-class">
              <h1 style={{color: ' #183b56'}}>Welcome Back!</h1>
              <div style={{width: '85%'}}>
                <label
                  style={{color: '#183b56', fontWeight: 'bold'}}
                  htmlFor="userid"
                >
                  User Id
                </label>
                <br />
                <input
                  value={userid}
                  onChange={this.onChangeUserid}
                  id="userid"
                  type="text"
                  placeholder="Enter User Id"
                  className="userid-class"
                />
              </div>
              <div style={{width: '85%', marginTop: '20px'}}>
                <label
                  style={{color: '#183b56', fontWeight: 'bold'}}
                  htmlFor="pin"
                >
                  PIN
                </label>
                <br />
                <input
                  value={pin}
                  onChange={this.onChangePin}
                  id="pin"
                  type="password"
                  placeholder="Enter PIN"
                  className="userid-class"
                />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
              {errorShow && <p style={{color: '#ff0b37'}}>{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginRoute
