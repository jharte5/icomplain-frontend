import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isAuthenticated } from '../Services/AuthHelpers';
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';
import InputGroup from '../Shared/InputGroup';
import ButtonGroup from '../Shared/ButtonGroup';
import { createUser } from '../Services/AuthHelpers';
import BlogSlider from '../BlogSlider/BlogSlider';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

class Signup extends Component {
  state = {
    canSubmit: true,
    formSetting: {
      username: {
        name: 'username',
        placeholder: 'Enter username',
        value: '',
        error: {
          message: '',
          noError: null,
        },
      },
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
      usernameError: {
        noError: null,
        message: '',
      },
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
    if (isAuthenticated()) {
      this.props.history.push('/blogs');
    }
  }

  onChangePassword = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (this.state.password.length >= 8) {
      this.setState({
        error: null,
      });

      let validatedPassword = validator.matches(
        this.state.password,
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      );
      if (!validatedPassword) {
        this.setState({
          error:
            'Must contain 1 uppercase, 1 lowercase, and 1 special character.',
        });
      } else {
        this.setState({
          error: null,
        });
      }
    } else {
      toast.error('Password must be at least 8 characters', {
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

  onChangeEmail = e => {
    let isEmail = validator.isEmail(this.state.email);

    this.setState({
      [e.target.name]: e.target.value,
    });

    if (!isEmail) {
      toast.error('Please enter an valid email', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.setState({
        emailError: null,
      });
    }
  };

  checkInputValidation = (errorState, inputName, inputValue) => {
    switch (inputName) {
      case 'username':
        let validatedUsername;
        validatedUsername = validator.matches(
          inputValue,
          /^[a-zA-Z0-9]{1,20}$/
        );

        if (!validatedUsername) {
          errorState.usernameError.noError = validatedUsername;
          errorState.usernameError.message =
            'Cannot contain special characters and minimum of 2 and maximum of 20 characters';
          return errorState;
        } else {
          errorState.usernameError.noError = validatedUsername;
          errorState.usernameError.message = '';
          return errorState;
        }

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
        let validatedPassword = true;
        //let validatedPassword
        // validatedPassword = validator.matches(
        //   inputValue,
        //   "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        // );

        if (!validatedPassword) {
          errorState.passwordError.noError = validatedPassword;
          errorState.passwordError.message =
            'Minimum eight characters, at least one letter, one number and one special character';
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

    inputForm['username'].error = isValidatedCheck.usernameError;
    inputForm['email'].error = isValidatedCheck.emailError;
    inputForm['password'].error = isValidatedCheck.passwordError;

    if (
      inputForm['email'].error.noError === false ||
      inputForm['password'].error.noError === false ||
      inputForm['username'].error.noError === false
    ) {
      this.setState({
        canSubmit: true,
      });
      return;
    }

    if (
      inputForm['email'].error.noError === true &&
      inputForm['password'].error.noError === true &&
      inputForm['username'].error.noError === true
    ) {
      this.setState({
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

  onSubmit = async e => {
    e.preventDefault();

    const { email, password, username } = this.state.formSetting;

    try {
      await createUser({
        email: email.value,
        password: password.value,
        username: username.value,
      });

      let inputForm = {
        ...this.state.formSetting,
      };
      inputForm['email'].value = '';
      console.log(inputForm.value);
      inputForm['password'].value = '';
      inputForm['username'].value = '';

      toast.success(`🦄 Login now!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      this.setState({
        ...this.state,
        formSetting: inputForm,
      });

      // this.props.history.push('/blogs'); // ---------------- reroute to main blogs page
    } catch (e) {
      console.log(e);
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
    const { formSetting, canSubmit } = this.state;
    let inputArray = [];
    for (let key in formSetting) {
      inputArray.push({
        formSetting: formSetting[key],
      });
    }
    return (
      <div className="landing">
        <BlogSlider />
        <div className="signup">
          <div className="signup-container">
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
            <h1>Sign up</h1>
            <form onSubmit={this.onSubmit}>
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
                title="Sign up"
                disabled={canSubmit}
              />
              <br/>
              <Link to="/login" className="formlink">Already have an account?</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
