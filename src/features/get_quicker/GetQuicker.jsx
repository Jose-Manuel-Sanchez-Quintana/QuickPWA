import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function GetQuicker() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    axios.get(`https://quick-api-9c95.onrender.com/checkout/session/${user.uid}`, {}).then((response) => {
        if (response.status === 200) {
            window.location = response.data;
        }
    })
    return (<></>)
}

export default GetQuicker;
