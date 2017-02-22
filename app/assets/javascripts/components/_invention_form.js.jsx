export default class InventionForm extends React.Component{
   constructor(props) {
    super(props);
    this.state = {
      invention: props.invention,
      select_options: [],
      chosen_bits: [],
      select_value: null
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
  toy(argument){
    console.log(argument)
  }
  setSelectOptions(){
    var options = [];
    var i = 0;
    this.props.form.all_bits.map(

      function(bit){
        i++
        options.push({name: bit.name, label: bit.name})
      }
    )
    this.setState({select_options: options})
  }
  handleChange(property, event) {
    const invention = this.state.invention;
    invention[property] = event.target.value;
    this.setState({invention: invention});
  }
  updateBitList(value){
    console.log('selecting')
    console.log(value)
    this.setState({select_value: value}, function(){
      console.log(this.state.select_value)
    })
    return false
  }

  handleSubmit( e ) {
    e.preventDefault();
    console.log('submitting...')
    var title = this.state.invention.title;
    console.log('1')
    var description_text = this.state.invention.description_text
    console.log('2')
    var bits = [this.state.select_value];
    console.log('3')
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
        // this.setState({ inventions: data }); because we immediatly redirect, who bothers to worry about state here?
        //redirect to the invention show view
        window.location.href = '/inventions/' + data.id
        return false
      }.bind(this)
    });

    // reset form
    // this.refs.title.value = "";
    // this.refs.description_text.value = "";
  }
 render() {
    var i = 0;
    // debugger
    return (
      <form className="invention-form" action={ this.props.form.action } acceptCharset="UTF-8" method={this.props.form.type} onSubmit={ this.handleSubmit}>
        <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
        <p><input type="text" onChange={this.handleChange.bind(this, 'title')} value={this.state.invention.title ? this.state.invention.title : ''} placeholder="Enter the title of this invention" /></p>
        <p><textarea onChange={this.handleChange.bind(this, 'description_text')} value={this.state.invention.description_text ? this.state.invention.description_text : ''} placeholder="Describe this invention..." /></p>
        <BitsField
          name="form-field-name"
          label
          value={this.state.select_value}
          options={this.state.select_options}
          updateBitList={this.updateBitList}/>
        <p><button type="submit" value="Submit">Submit Invention</button></p>
      </form>
    )
  }
};
//  render() {
//     var i = 0;
//     // debugger
//     return (
//       <form ref="form" className="invention-form" action={ this.props.form.action } acceptCharset="UTF-8" method={this.props.form.type} onSubmit={ this.handleSubmit}>
//         <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
//         <p><input type="text" onChange={this.handleChange.bind(this, 'title')} value={this.state.invention.title ? this.state.invention.title : ''} placeholder="Enter the title of this invention" /></p>
//         <p><textarea onChange={this.handleChange.bind(this, 'description_text')} value={this.state.invention.description_text ? this.state.invention.description_text : ''} placeholder="Describe this invention..." /></p>
//         <p><select name='bits[]' id='bit-select' ref="bits_used" multiple='true' className="ui fluid dropdown">{
//           this.props.form.all_bits.map(function(bit){
//             i++
//             return <option value={bit.name}>{bit.name}</option>
//           })
//         }</select></p>
//         <p><button type="submit" value="Submit">Submit Invention</button></p>
//       </form>
//     )
//   }
// };




