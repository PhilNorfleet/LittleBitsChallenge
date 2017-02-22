import Select from 'react-select';
import { Creatable } from 'react-select';
export default class InventionForm extends React.Component{
   constructor(props) {
    super(props);
    this.state = {
      invention: props.invention,
      bit_options: [],
      chosen_bits: [],
      bit_value: undefined,
      bit_multi: true,
      bit_multi_value: [],
      mat_options: [],
      chosen_mats: [],
      mat_value: undefined,
      mat_multi: true,
      mat_multi_value: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBitList = this.updateBitList.bind(this);
    this.updateMatList = this.updateMatList.bind(this);
  }
  componentDidMount() {
    this.setSelectOptions();
  }
  componentWillReceiveProps(nextProps){
    this.setState({inventions: nextProps.inventions, form: nextProps.form})
  }
  keyDownTest(keycode){
    switch(keycode.keyCode){
      case 32: //space
      case 13: //enter
      case 188: //comma
      case 9: //tab
        return true
    }
    return false
  }
  setSelectOptions(){
    var bit_options = this.state.bit_options;
    var mat_options = this.state.mat_options;
    var i = 0;
    var j = 0;
    this.props.form.all_bits.map(
      function(bit){
        i++
        bit_options.push({value: bit.name, label: bit.name})
      }
    )
    this.props.form.all_other_materials.map(
      function(mat){
        i++
        mat_options.push({value: mat.name, label: mat.name})
      }
    )
    this.setState({bit_options, mat_options})
  }
  handleChange(property, event) {
    const invention = this.state.invention;
    invention[property] = event.target.value;
    this.setState({invention: invention});
  }
  updateBitList(value){
    console.log(value)
    var multi = this.state.bit_multi
    if (multi) {
      this.setState({bit_multi_value: value})
    }
    else {
      this.setState({bit_value: value})
    }
  }
  updateMatList(value){
    console.log(value)
    // debugger
    var multi = this.state.mat_multi
    if (multi) {
      this.setState({mat_multi_value: value})
    }
    else {
      this.setState({mat_value: value})
    }
  }
  handleSubmit( e ) {
    e.preventDefault();
    var title = this.state.invention.title;
    var description_text = this.state.invention.description_text;
    var bits = this.state.bit_multi ? this.state.bit_multi_value : this.state.bit_value;
    var other_materials = this.state.mat_multi ? this.state.mat_multi_value : this.state.mat_value;
    console.log(title, description_text, bits, other_materials)
    // validate
    if (!description_text || !title || !bits) {
      return false;
    }
    var data = {
      invention: {
        title: title,
        description_text: description_text
      },
      bits: bits,
      other_materials: other_materials
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
    var state = this.state
    var bit_multi = state.bit_multi;
    var bit_multi_value = state.bit_multi_value;
    var bit_options = state.bit_options
    var bit_value = state.bit_value
    var mat_multi = state.mat_multi;
    var mat_multi_value = state.mat_multi_value;
    var mat_options = state.mat_options
    var mat_value = state.mat_value
    console.log(ReactBootstrap)
    var ButtonGroup = ReactBootstrap.ButtonGroup
    var Button  = ReactBootstrap.Button;
    return (
      <form className="invention-form" action={ this.props.form.action } acceptCharset="UTF-8" method={this.props.form.type} onSubmit={ this.handleSubmit}>
        <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
        <p><input type="text" onChange={this.handleChange.bind(this, 'title')} value={this.state.invention.title ? this.state.invention.title : ''} placeholder="Enter the title of this invention" /></p>
        <p><textarea onChange={this.handleChange.bind(this, 'description_text')} value={this.state.invention.description_text ? this.state.invention.description_text : ''} placeholder="Describe this invention..." /></p>
        <Select
          multi={bit_multi}
          joinValues={true}
          value={bit_multi ? bit_multi_value : bit_value}
          searchable
          placeholder="Select at least one Bit used in this invention"
          options={bit_options}
          onChange={this.updateBitList} />
        <Creatable
          ref="other_materials_select"
          multi={mat_multi}
          joinValues={true}
          delimiter=" "
          shouldKeyDownEventCreateNewOption={this.keyDownTest}
          value={mat_multi ? mat_multi_value : mat_value}
          searchable
          placeholder="Select other materials from the list or add your own"
          options={mat_options}
          onChange={this.updateMatList}
        />
        <ButtonGroup>
          <Button bsStyle='primary'>Submit Invention</Button>
        </ButtonGroup>
      </form>
    )
  }
};





