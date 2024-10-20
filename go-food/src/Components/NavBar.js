import React from 'react'
import {Link} from 'react-router-dom';
export default function NavBar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link> {/*We need to remove these achor tags. Since they make our page reload and our application is not single page because of them.*/}
                {/*We will use React router DOM to avoid page reload.*/}
                {/*Link tag from react router dom will replace the anchor tag, use "to" property here instead of "to"*/}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/createuser">SignUp</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}
