import PropTypes from 'prop-types';
import Attachement from "../feuture/attachement";


const ResumePage = ({id}) =>{
    console.log('id');
    
    return(
        <Attachement id={id} />
    )
}

ResumePage.propTypes = {
    id: PropTypes.number.isRequired,
  
  };
export default ResumePage