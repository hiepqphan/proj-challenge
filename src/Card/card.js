import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faDesktop, faPalette, faTrash } from '@fortawesome/free-solid-svg-icons';

import './card.css';

/*
  This component displays the info of a single card.
  @props
  data: object containing info of the card.
  toggleChild: function handler for showing/hiding children cards. Only for parent.
  showChild: `true` if children are shown. `false` otherwise. Only for parent.
  isChild: `true` if this is a child card. `false` if is a parent card.
*/
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { showInfo: false };
  }

  showInfo = () => {
    this.setState({ showInfo: true });
  }

  hideInfo = () => {
    this.setState({ showInfo: false });
  }

  render() {
    let screenshotUrl = this.props.data.content.screenshot;
    let noScreenshotBodyStyle = typeof(screenshotUrl) === typeof("") &&
                                screenshotUrl !== "" ?
                                "" : "card-body-no-image";
    let childExpandButtonStyle = this.props.isChild ? "child-expand-button" : "";
    let userNote = typeof(this.props.data.userNote) === typeof("") &&
                   this.props.data.userNote !== "" ?
                   this.props.data.userNote : "Add notes...";
    let sourceUrl = typeof(this.props.data.content.url) === typeof("") &&
                    this.props.data.content.url !== "" ?
                    this.props.data.content.url : null;

    return (
      <div className={[ "card", this.props.className ].join(" ")} onMouseLeave={this.hideInfo}>
        <div className={[ "card-expand-button", childExpandButtonStyle].join(" ")}
             onClick={this.props.toggleChild}>
          {!this.props.isChild &&
            <span className={ this.props.showChild ? "card-expand-button-rotate" : "" }><FontAwesomeIcon icon={faChevronRight}/></span>}
        </div>

        <div className="card-content">
          <div className={[ "card-body", noScreenshotBodyStyle ].join(" ")}
               onMouseEnter={this.showInfo}>
            {
            typeof(screenshotUrl) === typeof("") &&
            screenshotUrl !== "" ?
            <img src={screenshotUrl} alt="Loading"/> :
            <div className="card-body-text">
              {this.props.data.content.text}
            </div>
            }

            {
            this.props.data.title &&
            <div className="card-title">
              <div className="card-title-background"/>
              <div>{this.props.data.title}</div>
            </div>
            }
          </div>

          <div className={[ "card-url", this.state.showInfo ? "card-url-show" : "" ].join(" ")}>
            <span><a href={sourceUrl} rel="noopener noreferrer" target="_blank">{sourceUrl}</a></span>
            <div className="card-url-icons">
              <span><FontAwesomeIcon icon={faDesktop}/></span>
              <span><FontAwesomeIcon icon={faPalette}/></span>
              <span><FontAwesomeIcon icon={faTrash}/></span>
            </div>
          </div>

          <div className={[ "card-note",
                            this.state.showInfo && !this.props.data.userNote ? "card-note-show" : "",
                            this.props.data.userNote ? "" : "card-note-empty"].join(" ")}>
            <div>{userNote}</div>
          </div>
        </div>
      </div>
    );
  }
}
