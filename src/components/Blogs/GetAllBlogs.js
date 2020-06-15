import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import Axios from "axios";
import ChipInput from 'material-ui-chip-input';
// import { parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import ButtonGroup from '../Shared/ButtonGroup';
import { BlogContext } from '../Context/BlogContext';
import { deleteBlogByID } from '../Services/AuthHelpers';
import BlogModal from './BlogModal';
import './GetAllBlogs.css';
console.log(this)

class GetAllBlogs extends Component {
    static contextType = BlogContext;
    state = {
        isOpen: false,
        item: null,
    };
    
    onModalOpen = item => {
        this.setState({
        isOpen: true,
        item,
        });
    };
    onModalClose = () => {
        this.setState({
        isOpen: false,
        });
    };
    handleDeleteByID = async (item) => { 
        try {
            console.log(item)
        let deletedBlog = await deleteBlogByID(item._id);
            console.log(deletedBlog)
        this.context.BlogDispatch({
            type: 'DELETE_BY_ID',
            payload: item,
        });
        toast.success('Post deleted', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
    componentDidMount() {
        Axios.get('http://localhost:3001/api/blogs/all-blogs').then( (response ) => {
                console.log("blogData", response.data);
                this.setState({ blogArray: response.data })
            })
    }
    render() {
        
        const { blogArray } = this.context;
        const { isOpen, item } = this.state;
        console.log(blogArray)
        return (
        <>
            <hr />
            <div className="table-container">
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Article</th>
                    <th>Blog Tags</th>
                    <th>Blog Edit</th>
                    <th>Delete</th>
                </tr>
                {blogArray.map(item => {
                    const {
                    article,
                    title,
                    chipInput,
                    _id,
                    } = item;
                    console.log(item)
                    return (
                    <tr key={_id}>
                        <td>{title}</td>
                        <td>{article}</td>
                        <td>
                        <ChipInput
                            className="blog--chip"
                            value={chipInput}
                            disabled
                        />
                        </td>
                        <td>
                        <ButtonGroup
                            title="Edit"
                            buttonStyle="form-button edit-button"
                            disabled={false}
                            onClick={() => this.onModalOpen(item)}
                        />
                        </td>
                        <td>
                        <ButtonGroup
                            title="Delete"
                            buttonStyle="form-button form-button-delete edit-button"
                            disabled={false}
                            onClick={() => this.handleDeleteByID(item)}
                        />
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            {isOpen ? (
                <BlogModal
                {...item}
                isOpen={isOpen}
                onModalClose={this.onModalClose}
                />
            ) : null}
            </div>
        </>
        );
    }
}
export default GetAllBlogs;