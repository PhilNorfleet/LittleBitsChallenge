import Select from 'react-select';
export default class BitsField extends React.Component{
  displayName: 'BitsField'
  proptypes: {
    label: React.PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      searchable: true,
      clearable: true,
      value: [],
      selectValueName: 'bargraph',
      selectValueLabel: 'bargraph',
      options: [{name: 'bargraph', label: 'bargraph'}],
      okToUpdate: true
    }
    this.updateValue = this.updateValue.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({options: nextProps.options})
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false
  // }
  updateValue (value) {
    this.setState({ value });
    console.log('updateValue')
    console.log(value)
    this.props.updateBitList(value)
    console.log('post updateBitList')
    console.log(this.state.value)
  }


  render() {
    return (
      <div className="section">
        <h3 className="section-heading">{this.props.label}</h3>
        <Select
          multi
          joinValues
          options={this.state.options}
          clearable={this.state.clearable}
          name="selected-state"
          disabled={false}
          value={this.state.value}
          onChange={this.updateValue}
          searchable={this.state.searchable}/>
        <div>{this.state.selectValue}</div>
      </div>
    )
  }
};
  //use as example for integrating 'other_materials' into this select
 // <div className="checkbox-list">
 //          <label className="checkbox">
 //            <input type="radio" className="checkbox-control" checked={this.state.country === 'AU'} value="AU" onChange={this.switchCountry}/>
 //            <span className="checkbox-label">Australia</span>
 //          </label>
 //          <label className="checkbox">
 //            <input type="radio" className="checkbox-control" checked={this.state.country === 'US'} value="US" onChange={this.switchCountry}/>
 //            <span className="checkbox-label">United States</span>
 //          </label>
 //        </div>
