
export default class Invention extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      invention: props.invention,
      bits: props.bits ? props.bits : null,
      other_materials: props.other_materials ? props.other_materials : null
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({invention: nextProps.invention})
  }
  title() {
    if (this.props.inList){
      return(
        <a href={this.props.link}>
          <h4>{this.state.invention.title}</h4>
        </a>
      )
    }
    else {
      return(
        <h4>{this.state.invention.title}</h4>
      )
    }
  }
  bitList(props){
    if (props.inList){
      return (null)
    }
    else {
      var bit_rows = [];
      this.state.bits.map(
        function(bit){
          bit_rows.push(<li>{bit.name}</li>)
        }
      )
      return bit_rows
    }
  }
  otherMaterialsList(props){
    if (props.inList){
      return (null)
    }
    else {
      var mat_rows = [];
      this.state.other_materials.map(
        function(mat){
          mat_rows.push(<li>{mat.name}</li>)
        }
      )
      return mat_rows
    }
  }
  render() {

    return (
      <div>
        {this.title()}
        <p>{this.state.invention.description_text}</p>
        <ul>
          {this.bitList(this.props)}
        </ul>
        <ul>
          {this.otherMaterialsList(this.props)}
        </ul>
      </div>
    )
  }
};
