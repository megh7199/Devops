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

const Event = (props) => {
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
        const { data: show } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/`+id+`?apikey=${apiKey}`);
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
								<dt className='title'>Description</dt>
								{showData && showData.promoter && showData.promoter.description ? <dd> {showData.promoter.description.replace(regex, '').substring(0, 139) }</dd>: 'No Summary'}
							</p>
							<p>
								<dt className='title'>Genre </dt>
								{showData.classifications && showData.classifications[0].genre && showData.classifications[0].genre.name?<dd> {showData.classifications[0].genre.name} </dd> : <dd> N/A</dd>}
								{showData.classifications && showData.classifications[0].segment && showData.classifications[0].segment.name? <dd> |  {showData.classifications[0].segment.name} </dd>: <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Date</dt>
								{showData && showData.dates && showData.dates.start && !showData.dates.start.dateTBD? <dd>{showData.dates.start.localDate}</dd> : <dd>TBD</dd>}
							</p>
							<p>
								<dt className='title'>Time</dt>
								{showData && showData.dates && showData.dates.start && !showData.dates.start.timeTBA? <dd>{showData.dates.start.localTime}</dd> : <dd>TBD</dd>}
							</p>
							<p>
								<dt className='title'>Price:</dt>
								{showData && showData.priceRanges && showData.priceRanges[0] ? <dd>{ `${showData.priceRanges[0].min?showData.priceRanges[0].min:'N/A'} ${showData.priceRanges[0].currency?showData.priceRanges[0].currency:'USD'} - ${showData.priceRanges[0].max?showData.priceRanges[0].max:'N/A'} ${showData.priceRanges[0].currency?showData.priceRanges[0].currency:'USD'}` }</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Venue:</dt>
								{showData && showData._embedded && showData._embedded.venues && showData._embedded.venues[0].name ? <dd> {showData._embedded.venues[0].name}</dd>:<dd>N/A</dd>}{<dd>, {showData._embedded.venues[0].city.name}</dd>}{<dd>, {showData._embedded.venues[0].state.name}</dd>}
							</p>
							<p>
								<dt className='title'>Seat-map</dt>
							</p>
              <CardMedia
          component='img'
          image={showData && showData.seatmap && showData.seatmap.staticUrl ? showData.seatmap.staticUrl : noImage}
          title='show image'
        />
							{/* <p>
								<dt className='title'>Offical Site:</dt>
								{showData && showData.officialSite ? (
									<dd>
										<a rel='noopener noreferrer' target='_blank' href={showData.officialSite}>
											{showData.name} Offical Site
										</a>
									</dd>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Network:</dt>
								{showData && showData.network ? <dd>{showData.network && showData.network.name}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Language:</dt>
								{showData && showData.language ? <dd>{showData.language}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Runtime:</dt>
								{showData && showData.runtime ? <dd>{showData.runtime + ' Min'}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Premiered:</dt>
								{showData && showData.premiered ? <dd>{formatDate(showData.premiered)}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Country:</dt>
								{showData && showData.network && showData.network.country.name ? (
									<dd>{showData.network.country.name}</dd>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Time Zone:</dt>
								{showData && showData.network && showData.network.country.timezone ? (
									<dd>{showData.network.country.timezone}</dd>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Airtime:</dt>
								{showData && showData.schedule.time ? <dd>{tConvert(showData.schedule.time)}</dd> : <dd>N/A</dd>}
							</p>
							<p>
								<dt className='title'>Days Aired:</dt>
								{showData && showData.schedule.days && showData.schedule.days.length >= 1 ? (
									<span>
										{showData.schedule.days.map((day) => {
											if (showData.schedule.days.length > 1) return <dd key={day}>{day}s,</dd>;
											return <dd key={day}>{day}s</dd>;
										})}
									</span>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Status:</dt>
								{showData && showData.status ? <dd>{showData.status}</dd> : <dd>N/A</dd>}
							</p>

							<p>
								<dt className='title'>Genres:</dt>
								{showData && showData.genres && showData.genres.length >= 1 ? (
									<span>
										{showData.genres.map((genre) => {
											if (showData.genres.length > 1) return <dd key={genre}>{genre},</dd>;
											return <dd key={genre}>{genre}</dd>;
										})}
									</span>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Summary:</dt>
								<dd>{summary}</dd>
							</p> */}
						</dl>
            <Link to='/events'>Back to all shows...</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Event;
