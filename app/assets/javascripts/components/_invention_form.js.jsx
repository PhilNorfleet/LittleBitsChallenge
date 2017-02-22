import Select from 'react-select';
export default class InventionForm extends React.Component{
   constructor(props) {
    super(props);
    this.state = {
      invention: props.invention,
      options: [],
      chosen_bits: [],
      value: undefined,
      multi: true,
      multiValue: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBitList = this.updateBitList.bind(this);
  }
  componentDidMount() {
    this.setSelectOptions();
  }
  componentWillReceiveProps(nextProps){
    this.setState({inventions: nextProps.inventions, form: nextProps.form})
  }

  setSelectOptions(){
    var options = this.state.options;
    var i = 0;
    this.props.form.all_bits.map(

      function(bit){
        i++
        options.push({value: bit.name, label: bit.name})
      }
    )
    this.setState({options})
  }
  handleChange(property, event) {
    const invention = this.state.invention;
    invention[property] = event.target.value;
    this.setState({invention: invention});
  }
  updateBitList(value){
    console.log(value)
    var multi = this.state.multi
    if (multi) {
      this.setState({multiValue: value},
        function(){
          console.log(this.state.multiValue)
        })
    }
    else {
      this.setState({value: value},
        function(){
          console.log(this.state.multiValue)
        }
      )
    }
  }
  handleSubmit( e ) {
    e.preventDefault();
    var title = this.state.invention.title;
    var description_text = this.state.invention.description_text
    var bits = this.state.multi ? this.state.multiValue : this.state.value;
    console.log(title, description_text, bits)
    // validate
    if (!description_text || !title || !bits) {
      return false;
    }
    var data = {
      invention: {
        title: title,
        description_text: description_text
      },
      bits: bits
    }
    console.log(data)
    $.ajax({
      data: data,
      async: false,
      url: this.props.form.action + '?',
      type: this.props.form.type,
      success: function ( data ) {
        console.log(data)
        // this.setState({ inventions: data }); because we immediatly redirect, who bothers to worry about state here?
        //redirect to the invention show view
        window.location.href = '/inventions/' + data.id
        return false
      }.bind(this)
    });
  }
 render() {
    var i = 0;
    var state = this.state
    var multi = state.multi;
    var multiValue = state.multiValue;
    var options = state.options
    var value = state.value
    return (
      <form className="invention-form" action={ this.props.form.action } acceptCharset="UTF-8" method={this.props.form.type} onSubmit={ this.handleSubmit}>
        <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
        <p><input type="text" onChange={this.handleChange.bind(this, 'title')} value={this.state.invention.title ? this.state.invention.title : ''} placeholder="Enter the title of this invention" /></p>
        <p><textarea onChange={this.handleChange.bind(this, 'description_text')} value={this.state.invention.description_text ? this.state.invention.description_text : ''} placeholder="Describe this invention..." /></p>
        <Select
          multi={multi}
          disabled={this.state.disabled}
          joinValues={true}
          value={multi ? multiValue : value}
          searchable
          placeholder="Select at least one Bit used in this invention"
          options={options}
          onChange={this.updateBitList} />
        <p><button type="submit" value="Submit">Submit Invention</button></p>
      </form>
    )
  }
};





