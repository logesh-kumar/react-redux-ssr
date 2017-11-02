import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUsers } from '../actions'

class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers()
    }

    renderUsers() {
        return this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>
        })
    }

    render() {
        return <div>
            <h1>Users List:</h1>
            <ul>
                {this.renderUsers()}
            </ul>
        </div>
    }
}

function mapStateToProps(state) {
    console.log(state)
    return { users: state.users }
}

export function loadData(store) {
    return store.dispatch(fetchUsers())
}

export default {
    component: connect(mapStateToProps, { fetchUsers })(UsersList),
    loadData
}
