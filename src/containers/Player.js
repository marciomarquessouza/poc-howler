import React, { Component } from 'react';
import ReactHowler from 'react-howler';
import raf from 'raf';
import { Button , Columns } from 'react-bulma-components/full'
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
  };
  togglePlayHandle = () => {
    this.setState({
      playing: !this.state.playing,
    })
  };
  handleOnPlay = () => {
    this.setState({
      playing: true,
    });
    this.renderSeekPos();
  };
  handleOnLoad = () => {
    this.setState({
      loaded: true,
      duration: this.player.duration(),
    });
  };
  handleSeek = () => {
    this.player.seek([(this.state.duration / 2)]);
    this.setState({
        playing: true,
    });
  };
  handleStop = () => {
    this.player.stop();
    this.setState({
      playing: false,
    });
  };
  handleOnEnd = () => {
    this.setState({
      playing: false,
    });
    this.clearRAF();
  };
  renderSeekPos = () => {
    this.setState({
      seek: this.player.seek(),
    });
    if(this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  };
  clearRAF() {
    raf.cancel(this._raf);
  };
  componentWillUnmount() {
    this.clearRAF();
  };
  render() {
    return <>
      <ReactHowler
        src={ [ 'Intro Song.mp3' ] }
        playing={ this.state.playing }
        onLoad={ this.handleOnLoad }
        onPlay={ this.handleOnPlay }
        onEnd={ this.handleOnEnd }
        ref = { (ref) => (this.player=ref) }
      />
      <Columns>
        <Columns.Column size={5}></Columns.Column>
        <Columns.Column size={3}>
          { 'Status' }: { this.state.loaded ? 'Ready' : 'Loading'}
        </Columns.Column>
        <Columns.Column size={4}></Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column size={5}></Columns.Column>
        <Columns.Column size={3}>
          { 'Duration: ' }{(this.state.seek !== undefined) ? this.state.seek.toFixed(2) : '0.00'}
          {' / '}
          {(this.state.duration) ? this.state.duration.toFixed(2) : 'NaN'}
        </Columns.Column>
        <Columns.Column size={4}></Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column size={5}></Columns.Column>
        <Columns.Column size={1}>
          <Button  className="button is-primary is-inverted is-outlined" onClick={ this.togglePlayHandle }>{ this.state.playing ? 'Pause' : 'Play' }</Button>
        </Columns.Column>
        <Columns.Column size={1}>
          <Button  className="button is-primary is-inverted is-outlined" onClick={ this.handleStop }>Stop</Button>
        </Columns.Column>
        <Columns.Column size={1}>
          <Button  className="button is-primary is-inverted is-outlined" onClick={ this.handleSeek }>Half</Button>
        </Columns.Column>
        <Columns.Column size={4}></Columns.Column>
      </Columns>
    </>
  };
};

export default Player;
