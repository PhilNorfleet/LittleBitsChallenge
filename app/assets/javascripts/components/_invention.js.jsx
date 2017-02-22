class Invention extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      invention: props.invention,
      bits: props.bits ? props.bits : null
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({invention: nextProps.invention})
  }
  title() {
    console.log(this.props)
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
  render() {
    return (
      <div>
        {this.title()}
        <p>{this.state.invention.description_text}</p>
        {
          this.props.bits.map(
            function(bit){
              console.log(bit)
              return (<div>{bit.name}</div>)
            }
          )
        }
      </div>
    )
  }
};
