import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import ChipInput from 'material-ui-chip-input';
import { parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import ButtonGroup from '../Shared/ButtonGroup';
import { BlogContext } from '../Context/BlogContext';
import { deleteBlogByID } from '../Services/AuthHelpers';
import BlogModal from './BlogModal';
import './GetAllBlogs.css';

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
    handleDeleteByID = async item => {
        try {
        let deletedBlog = await deleteBlogByID(item._id);
        this.context.BlogDispatch({
            type: 'DELETE_BY_ID',
            payload: deletedBlog,
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
    render() {
        const { blogArray } = this.context;
        const { isOpen, item } = this.state;
        return (
        <>
            <hr />
            <div className="table-container">
            <table>
                <tbody>
                <tr>
                    <th>Blog Title</th>
                    <th>Blog Article</th>
                    <th>Blog Date</th>
                    <th>Blog Tags</th>
                    <th>Blog Edit</th>
                    <th>Delete</th>
                </tr>
                {blogArray.map(item => {
                    const {
                    blogArticle,
                    blogTitle,
                    dateInput,
                    chipInput,
                    _id,
                    } = item;
                    return (
                    <tr key={_id}>
                        <td>{blogTitle}</td>
                        <td>{blogArticle}</td>
                        <td>
                        {/* <DatePicker
                            className="expenses--input-date-list"
                            selected={parseISO(dateInput)}
                            disabled
                        /> */}
                        </td>
                        <td>
                        <ChipInput
                            className="expenses--chip"
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