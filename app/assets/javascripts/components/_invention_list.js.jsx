export default class InventionList extends React.Component{
  render() {
    var inventionNodes = this.props.inventions.map(function ( invention ) {
      var link = 'inventions/' + invention.id;
      return (
        <div>
          <Invention inList={true} link={link} invention={invention} />
        </div>
      )
    });

    return (
      <div className="invention-list">
        { inventionNodes }
      </div>
    )
  }
};
