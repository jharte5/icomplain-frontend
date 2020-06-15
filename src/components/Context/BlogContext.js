import React, {Component} from 'react'
import Axios from 'axios';
export const BlogContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "GET_ALL_BLOGS":
        
            return{
                ...state,
                blogArray: [...action.payload]
        }
        case "CREATE_BLOG":
            return{
                ...state,
                blogArray: [...state.blogArray, action.payload],
            }
        case "DELETE_BY_ID":
            console.log(action.payload)
            return{
                ...state,
                blogArray: state.blogArray.filter(
                    (item) => item._id !== action.payload._id
                ),
            }
    default:
        return state;
    }
};
export class BlogProvider extends Component {
    state = {
        blogArray: [],
        blogDispatch: (action) => {
            this.setState((state) => reducer(state,action))
        }
    }
    async componentDidMount() {
        try {
            Axios.get('http://localhost:3001/api/blogs/all-blogs').then( (response ) => {
                console.log("blogData", response.data);
                this.setState({ blogArray: response.data })
            })
        }catch (e) {
            console.log(e)
        }
    }
    render() {
        return(
            <BlogContext.Provider value={this.state}>
                {this.props.children}
            </BlogContext.Provider>
        );
    }
}
export const BlogConsumer = BlogContext.Consumer;