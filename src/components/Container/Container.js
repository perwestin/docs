import React, { Component } from 'react';
import { connect } from "react-redux";
import { getHeaderHeightState } from '../../store/selectors';

class Container extends Component {
  render() {
    const {
      sidebarDocked, 
      headerHeight, 
      onPostPage,
      backgroundColor = 'white',
      width = "100%"
    } = this.props;

    return (
      <div className='main-content'
        style={{
          margin: '80px auto 0',
          overflow: !sidebarDocked ? "auto" : "visible",
          width: width,
          height: 'auto'
        }}
      >
        <div
          style={{
            margin: '0 auto',
            paddingTop: 0,
            backgroundColor: backgroundColor,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    headerHeight: getHeaderHeightState(state),
  }
}

export default connect(mapStateToProps) (Container);