import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import noImage from '../img/download.jpeg';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader
} from '@mui/material';
import '../App.css';
const apiKey = 'GIJWWxtKIJxfGGnv76xSyHHVnqlAaY2F';

const Venue = (props) => {
  const [showData, setShowData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  // const classes = useStyles();
  let {id} = useParams();
  const navigate = useNavigate();
  
  const tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  };
  const formatDate = (showdate) => {
    var year = showdate.substring(0, 4);
    var month = showdate.substring(5, 7);
    var day = showdate.substring(8, 10);
    return month + '/' + day + '/' + year;
  };
  useEffect(() => {
    console.log('SHOW useEffect fired');
    async function fetchData() {
      try {
        const { data: show } = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues/`+id+`?apikey=${apiKey}`);
        setShowData(show);
        setLoading(false);
        console.log(show);
      } catch (e) {
        console.log(e);
        navigate("/notFound");
      }
    }
    fetchData();
  }, [id]);

  let summary = null;
  const regex = /(<([^>]+)>)/gi;
  if (showData && showData.summary) {
    summary = showData && showData.summary.replace(regex, '');
  } else {
    summary = 'No Summary';
  }

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <Card
        variant='outlined'
        sx={{
          maxWidth: 550,
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 5,
          border: '1px solid #62aae4',
          boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
        }}
      >
        <CardHeader
          title={showData.name}
          sx={{
            borderBottom: '1px solid #62aae4',
            fontWeight: 'bold'
          }}
        />
        <CardMedia
          component='img'
          image={showData.images && showData.images[0] ? showData.images[0].url : noImage}
          title='show image'
        />

        <CardContent>
          <Typography
            variant='body2'
            color='textSecondary'
            component='span'
            sx={{
              borderBottom: '1px solid #62aae4',
              fontWeight: 'bold'
            }}
          >
           	<dl>
			   <p>
								<dt className='title'>Address</dt>
								{showData && showData.address && showData.address.line1 ? <dd>{showData.address.line1}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>City</dt>
								{showData && showData.city && showData.city.name ? <dd>{showData.city.name}</dd>:<dd>N/A</dd>}
							</p>
              <p>
								<dt className='title'>State</dt>
								{showData && showData.state && showData.state.name ? <dd>{showData.state.name}</dd>:<dd>N/A</dd>}
							</p>
              <p>
								<dt className='title'>Country</dt>
								{showData && showData.country && showData.country.name ? <dd>{showData.country.name}</dd>:<dd>N/A</dd>}
							</p>
              <p>
								<dt className='title'>Parking</dt>
								{showData && showData.parkingDetail  ? <dd>{showData.parkingDetail}</dd>:<dd>N/A</dd>}
							</p>
              <p>
								<dt className='title'>Link</dt>
								{showData && showData.url  ? <dd>{showData.url}</dd>:<dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Info:</dt>
								{showData && showData.generalInfo && showData.generalInfo.generalRule ? <dd>{showData.generalInfo.generalRule}</dd>:<dd>{showData && showData.generalInfo && showData.generalInfo.childRule?<dd>{showData.generalInfo.childRule}</dd>:<dd>N/A</dd>}</dd>}
							</p>
             
			</dl>
            <Link to='/venues'>Back to all shows...</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Venue;
