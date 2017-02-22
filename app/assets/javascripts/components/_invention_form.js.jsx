class InventionForm extends React.Component{
   constructor(props) {
    super(props);
    this.state = {invention: props.invention};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({inventions: nextProps.inventions, form: nextProps.form})
  }
  handleChange(property, event) {
    const invention = this.state.invention;
    invention[property] = event.target.value;
    this.setState({invention: invention});
  }
  grabBitList(){
    var bit_select = this.refs.bits_used;
    var selected_bits = [];
    var bit_data = [];
    var all_bits = this.props.form.all_bits
    var uniq_bits = _.uniq(all_bits, function(bit){
      return bit.name;
    })
    for (i = 0; i < bit_select.options.length; i++){
      if (bit_select.options[i].selected){
        selected_bits.push(bit_select.options[i].textContent)
      }
    }
    uniq_bits.forEach(function(real_bit){
      if(selected_bits.includes(real_bit.name)){
        bit_data.push(real_bit)
      }
    })
    return bit_data
  }

  handleSubmit( event ) {
    console.log('HANDLE SUBMIT')
    event.preventDefault();
    var title = this.state.invention.title;
    var description_text = this.state.invention.description_text
    var bits = this.grabBitList();
    console.log(title)
    console.log(description_text)
    console.log(bits)
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

    $.ajax({
      data: data,
      async: false,
      url: this.props.form.action + '?',
      type: this.props.form.type,
      success: function ( data ) {
        console.log('success')
        console.log(data)
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
      <form ref="form" className="invention-form" action={ this.props.form.action } acceptCharset="UTF-8" method={this.props.form.type} onSubmit={ this.handleSubmit}>
        <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
        <p><input type="text" onChange={this.handleChange.bind(this, 'title')} value={this.state.invention.title ? this.state.invention.title : ''} placeholder="Enter the title of this invention" /></p>
        <p><textarea onChange={this.handleChange.bind(this, 'description_text')} value={this.state.invention.description_text ? this.state.invention.description_text : ''} placeholder="Describe this invention..." /></p>
        <p><select name='bits[]' id='bit-select' ref="bits_used" multiple='true' className="ui fluid dropdown">{
          this.props.form.all_bits.map(function(bit){
            i++
            return <option value={bit.name}>{bit.name}</option>
          })
        }</select></p>
        <p><button type="submit" value="Submit">Submit Invention</button></p>
      </form>
    )
  }
};
//   render() {
//     var i = 0;
//     return (
//       <form ref="form" className="invention-form" action={ this.props.form.action } acceptCharset="UTF-8" method={this.props.form.type} onSubmit={ this.handleSubmit(event) }>
//         <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
//         <p><input type="text" ref="title" name="invention[title]" placeholder="Enter the title of this invention" /></p>
//         <p><textarea ref="description_text" name="invention[description_text]" placeholder="Describe this invention..." /></p>
//         <p><select name='bits[]' id='bit-select' ref="bits_used" multiple='true' className="ui fluid dropdown">{
//           this.props.form.all_bits.map(function(bit){
//             i++
//             return <option value={bit.name}>{bit.name}</option>
//           })
//         }</select></p>
//         <p><button type="submit">Submit Invention</button></p>
//       </form>
//     )
//   }
// };


