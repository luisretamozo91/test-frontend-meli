import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/Logo_ML.png';
import ImgSearch from './../assets/ic_Search.png';

class SearchBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.submitSearch = this.submitSearch.bind(this);
    this.changueSearch = this.changueSearch.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  changueSearch(event) {
    const target = event.target;
    this.setState({
      search: target.value,
    });
  }

  submitSearch = () => {
    if (this.state.search) {
      this.props.history.push(`/items?search=${this.state.search}`);
    }
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.submitSearch();
    }
  }

  render() {
    return (
      <nav>
        <div className="container">
          <div className="navbar col-md-10 m-md-auto pl-0 pr-0">
            <div className="col-2 col-md-1">
              <Link to="/">
                 <img src={logo} alt='logo' title='logo' />
              </Link>
            </div>
            <div className="col-10 col-md-11">
              <div className="form-inline d-inline w-100">
                <div className="input-group">
                  <input type="text"
                    className="form-control"
                    placeholder='Nunca Dejes de buscar'
                    aria-label='Nunca Dejes de buscar' 
                    onChange={this.changueSearch}
                    onKeyDown={this.keyPress}
                  />
                  <div className="input-group-prepend">
                    <button onClick={this.submitSearch} className="input-group-text" alt="">
                      <img src={ImgSearch} alt='' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default SearchBar;
