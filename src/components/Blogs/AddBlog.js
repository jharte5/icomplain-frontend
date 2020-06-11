import React, { Component } from 'react'
import validator from 'validator'
import MultiInputGroup from '../Shared/MultiInputGroup'
import ButtonGroup from '../Shared/ButtonGroup'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {BlogContext } from '../Context/BlogContext'
import {createBlog} from '../Services/AuthHelpers'
// import "react-datepicker/dist/react-datepicker.css";
import "./AddBlog.css";


class AddBlog extends Component {
    static contextType = BlogContext
    constructor(props) {
        super(props);
        this.state = {
            formSetting: {
                blogTitle: {
                    name: 'blogTitle',
                    type: 'text',
                    placeholder: 'Enter Title',
                    value:'',
                    handleOnChange: {
                        inputOnChange: this.handleOnChange,
                    },
                    error: {
                        message:'',
                        noError:'',
                    },
                },
                blogArticle: {
                    name: 'blogArticle',
                    type: 'text',
                    placeholder: 'Complain here',
                    value: '',
                    handleOnChange: {
                        inputOnChange: this.handleOnChange,
                    },
                    error: {
                        message:'',
                        noError:'',
                    }
                },
                dateInput: {
                    name: 'dateInput',
                    type: 'dateInput',
                    startDate: new Date(),
                    handleOnchange: {
                        handleOnChange: this.handleOnChange
                    },
                },
                chipInput: {
                    name: 'chipInput',
                    type: 'chipInput',
                    placeholder: 'place tags here',
                    valueArray: [],
                    handleOnChange:{
                        handleAddChip: this.handleAddChip,
                        handleDeleteChip: this.handleDeleteChip
                    },
                }
            },
            canSubmit: true,
            validate: {
                blogTitleError: {
                    noError: null,
                    message:'',
                },
                blogArticleError: {
                    noError: null,
                    message:''
                }
            }
        };
    }
    checkInputValidation = (errorState, inputName, inputValue) => {
        switch (inputName) {
            case 'blogTitle':
                let validatedBlogTitle = validator.isEmpty(inputValue);
                if (validatedBlogTitle) {
                    errorState.blogTitleError.noError = false;
                    errorState.blogTitleError.message = 'cant be empty';
                    return errorState
                }else {
                    errorState.blogTitleError.noError = true;
                    errorState.blogTitleError.message = '';
                    return errorState
                }
            case 'blogArticle':
                let validatedBlogArticle = validator.isEmpty(inputValue);
                if (validatedBlogArticle) {
                    errorState.blogArticleError.noError = false;
                    errorState.blogArticleError.message = 'cant be empty';
                    return errorState
                }else {
                    errorState.blogArticleError.noError = true;
                    errorState.blogArticleError.message = '';
                    return errorState
                }
            default:
                return errorState
        }
    }
    handleOnChange = (event) => {
        let inputForm = {
            ...this.state.formSetting,
        };
        inputForm[event.target.name].value = event.target.value;
        let isValidatedCheck = this.checkInputValidation(
            this.state.validate,
            event.target.name,
            event.target.value
        );
        inputForm["blogTitle"].error = isValidatedCheck.blogTitleError;
        inputForm["blogArticle"].error = isValidatedCheck.blogArticleError;
        if (
            inputForm["blogTitle"].error.noError === false ||
            inputForm["blogArticle"].error.noError === false
        ) {
            this.setState({
                canSubmit: true,
            });
            return;
        }
        if (
            inputForm["blogTitle"].error.noError === true &&
            inputForm["blogArticle"].error.noError === true
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
    }
    handleOnDateChange = (date) => {
        let inputForm = {
            ...this.state.formSetting,
        };
        console.log(date);
        inputForm["dateInput"].startDate = date;
    
        this.setState({
            ...this.state,
            formSetting: inputForm,
        });
    }
    handleAddChip = (chip) => {
        let inputForm = {
            ...this.state.formSetting,
        };
    
        let newArray = [...inputForm["chipInput"].valueArray, chip];
    
        inputForm["chipInput"].valueArray = newArray;
    
        this.setState({
            ...this.state,
            formSetting: inputForm,
        });
    }
    handleDeleteChip = (deletedChip) => {
        let inputForm = {
            ...this.state.formSetting,
        };
    
        let newArray = inputForm["chipInput"].valueArray.filter(
            (chip) => chip !== deletedChip
        );
    
        inputForm["chipInput"].valueArray = newArray;
    
        this.setState({
            ...this.state,
            formSetting: inputForm,
        });
    }
    handleBlogSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const {
            chipInput,
            dateInput,
            blogArticle,
            blogTitle,
        } = this.state.formSetting;
    
            let blogObj = {
            chipInput: chipInput.valueArray,
            dateInput: dateInput.startDate,
            blogArticle: blogArticle.value,
            blogTitle: blogTitle.value,
        };
    
            let success = await createBlog(blogObj);
    
            let inputForm = {
            ...this.state.formSetting,
        };
    
            inputForm["blogTitle"].value = "";
            inputForm["blogArticle"].value = "";
            inputForm["dateInput"].startDate = new Date();
            inputForm["chipInput"].valueArray = [];
    
            this.setState({
            ...this.state,
            formSetting: inputForm,
        });
    
            toast.success(`🦄 :face_with_symbols_on_mouth: created complain!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            toast.error(e.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    render() {
        const { formSetting, canSubmit } = this.state;
        let inputArray = [];
        for (let key in formSetting) {
            inputArray.push({
                formSetting: formSetting[key],
            });
        }
        return (
            <div className="expenses">
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
                <div className="expenses--input-container">
                    <form className="signup-form" onSubmit={this.handleExpenseSubmit}>
                        {inputArray.map((element) => {
                            const {
                                formSetting: { name, type },
                            } = element;
                    return (
                        <MultiInputGroup type={type} {...formSetting} key={name} />
                    );
                })}

                        <br />
                        <ButtonGroup
                            buttonStyle="form-button"
                            title="Submit"
                            disabled={canSubmit}
                        />
                    </form>
                </div>
            </div>
        );
    }
}
export default AddBlog