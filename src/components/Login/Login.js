import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Consumer } from '../Context/Context';
import validator from 'validator';
import InputGroup from '../Shared/InputGroup';
import ButtonGroup from '../Shared/ButtonGroup';
import { login } from '../Services/AuthHelpers';
import { isAuthenticated } from '../Services/AuthHelpers';
import { ToastContainer, toast } from 'react-toastify';
import BlogSlider from '../BlogSlider/BlogSlider';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

class Login extends Component {
  state = {
    canSubmit: true,
    formSetting: {
      email: {
        name: 'email',
        placeholder: 'Enter email',
        value: '',
        error: {
          message: '',
          noError: null,
        },
      },
      password: {
        name: 'password',
        placeholder: 'Enter password',
        value: '',
        error: {
          message: '',
          noError: null,
        },
      },
    },
    validate: {
      emailError: {
        noError: null,
        message: '',
      },
      passwordError: {
        noError: null,
        message: '',
      },
    },
  };

  componentDidMount() {
    console.log(this.props);
    if (isAuthenticated()) {
      this.props.history.push('/blogs');
    }
  }

  checkInputValidation = (errorState, inputName, inputValue) => {
    switch (inputName) {
      case 'email':
        let validatedEmail;
        validatedEmail = validator.isEmail(inputValue);

        if (!validatedEmail) {
          errorState.emailError.noError = validatedEmail;
          errorState.emailError.message = 'It must be an email';
          return errorState;
        } else {
          errorState.emailError.noError = validatedEmail;
          errorState.emailError.message = '';
          return errorState;
        }

      case 'password':
        let validatedPassword;
        validatedPassword = !validator.isEmpty(inputValue);

        if (!validatedPassword) {
          errorState.passwordError.noError = validatedPassword;
          errorState.passwordError.message = 'Password cannot be empty';
          return errorState;
        } else {
          errorState.passwordError.noError = validatedPassword;
          errorState.passwordError.message = '';
          return errorState;
        }

      default:
        return errorState;
    }
  };
  onChange = event => {
    let inputForm = {
      ...this.state.formSetting,
    };

    inputForm[event.target.name].value = event.target.value;
    let isValidatedCheck = this.checkInputValidation(
      this.state.validate,
      event.target.name,
      event.target.value
    );

    inputForm['email'].error = isValidatedCheck.emailError;
    inputForm['password'].error = isValidatedCheck.passwordError;

    if (
      inputForm['email'].error.noError === false ||
      inputForm['password'].error.noError === false
    ) {
      this.setState({
        ...this.state,
        canSubmit: true,
      });
      return;
    }

    if (
      inputForm['email'].error.noError === true &&
      inputForm['password'].error.noError === true
    ) {
      this.setState({
        ...this.state,
        canSubmit: false,
      });
      return;
    } else {
      this.setState({
        ...this.state,
        formSetting: inputForm,
      });
      return;
    }
  };
  onSubmit = async (event, dispatch) => {
    event.preventDefault();

    const { email, password } = this.state.formSetting;

    try {
      let success = await login({
        email: email.value,
        password: password.value,
      });

      let inputForm = {
        ...this.state.formSetting,
      };

      inputForm['email'].value = '';
      inputForm['password'].value = '';

      dispatch({
        type: 'SUCCESS_SIGNED_IN',
        payload: success.user,
      });

      this.setState({
        formSetting: inputForm,
      });

      this.props.history.push('/blogs');
    } catch (e) {
      toast.error(e.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    const { canSubmit, formSetting } = this.state;

    let inputArray = [];

    for (let key in formSetting) {
      inputArray.push({
        formSetting: formSetting[key],
      });
    }

    return (
      <div className="landing">
        <BlogSlider />
        <Consumer>
          {({ dispatch }) => {
            return (
              <div className="login">
                <div className="login-container">
                  <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />

                  <h1>Log in</h1>
                  <form
                    className="login-form"
                    onSubmit={e => this.onSubmit(e, dispatch)}
                  >
                    {inputArray.map(element => {
                      const {
                        formSetting: { name, placeholder, value, error },
                      } = element;

                      return (
                        <InputGroup
                          key={name}
                          name={name}
                          placeholder={placeholder}
                          onChange={this.onChange}
                          value={value}
                          error={error}
                          type={name}
                        />
                      );
                    })}

                    <ButtonGroup
                      buttonStyle="form-button"
                      title="Log in"
                      disabled={canSubmit}
                    />
                  </form>
                  <Link to="/signup">Don't have an account?</Link>
                </div>
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default withRouter(Login);
