import React, {useState, useEffect, Component} from "react";

class App extends Component {

    state = {
        posts : null,
        total : null,
        per_page: null,
        current_page: null,
      }

    componentDidMount(){
        this.makeHttpRequestWithPage(1);
    }
    
    makeHttpRequestWithPage = async pageNumber => {
        let response = await fetch(`${URL}posts=${pageNumber}`, {
        method : 'GET',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        })
    
    const data = await response.json();

    this.setState({
        posts: data.data,
        total: data.total,
        per_page: data.per_page,
        current_page: data.page,
    });

}

render() {
    
    let posts, renderPageNumbers


    if  (this.state.posts !== null) {
        posts = this.state.posts.map(post => (
            <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.user_id}</td>
                <td>{post.board_game_id}</td>
                <td>{post.description}</td>
                <td>{post.location}</td>
                <td>{post.date_created}</td>
            </tr>
        ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
    for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
    }

    renderPageNumbers = pageNumbers.map(number => {

    //styles is what its imported in the example, need to rework ; tailwind has pagination??
    let classes = this.state.current_page === number ? styles.active : "";

    return (
        <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
        );
    });
}


    return(
        <div className="bg-hero-background bg-center bg-no-repeat bg-cover h-screen w-screen">
            <table className="grid grid-flow-row gap-10">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Title</th>
                        <th>Username</th>
                        <th>Boardgame</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>DateCreated</th>
                    </tr>
                </thead>
                <tbody>
                    {posts}
                </tbody>
            </table>

            <div>
                <span className="hover:bg-violet-600 active:bg-violet-700" onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
                {renderPageNumbers}
                <span className="hover:bg-violet-600 active:bg-violet-700" onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
            </div>     


        </div> 
    )
}

export default App;