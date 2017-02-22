class InventionBox extends React.Component{

  render() {
    return (
      <div className="invention-box">
        <InventionList inventions={ this.props.inventions} />
      </div>
    );
  }
};
