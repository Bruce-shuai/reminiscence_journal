import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
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
  },
  "@media screen and (max-width: 768px)": {
    image: {
      display: 'none',
    },
    mainContainer: {
      flexDirection: "column-reverse",
    }
  },
}));