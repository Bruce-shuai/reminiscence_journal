import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#4a7349',
    fontFamily: 'RMXGD'
  },
  image: {
    marginLeft: '15px',
    fill:'#4a7349',
    height: '60px',
    display: "block",
  },toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '240px',
  },
  userName: {
    display: 'flex',
    maxWidth: "100px",
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  "@media screen and (max-width: 768px)": {
    image: {
      display: 'none',
    }
  },
}));