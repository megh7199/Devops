import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import SearchShows from './SearchShows';
import noImage from '../img/download.jpeg';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
const apiKey = 'GIJWWxtKIJxfGGnv76xSyHHVnqlAaY2F';


const VenueList = () => {
  const regex = /(<([^>]+)>)/gi;
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState(undefined);
  const [showsData, setShowsData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [ error, setError ] = useState(false);
	const [ nextPage, setNextPage ] = useState(true);
  let card = null;
  let { pagenum} = useParams();
  const navigate = useNavigate();


  useEffect(() => {
		console.log('on load useeffect');
		async function fetchData() {
			try {
        setLoading(true);
        console.log('check1')
				const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?countryCode=US&apikey=${apiKey}&page=`+pagenum);
				console.log(`page ${pagenum} loading`)
				console.log(data._embedded.venues);
				setShowsData(data._embedded.venues);
        if((data.page.number+1) * (data.page.size) < 1000) 
        setNextPage(true);
        else
        setNextPage(false);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setError(true);
			}
			// try {
			// 	setNextPage(true)
			// 	let next = parseInt(pagenum)+1;
			// 	const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?countryCode=US&apikey=${apiKey}&page=`+next);
			// 	console.log(`page ${next} loading`)
			// 	// setShowsData(data);
			// 	setLoading(false);
			// } catch (e) {
			// 	setNextPage(false);
      //   setLoading(false);
			// }
		}
		fetchData();
	}, [ pagenum ]);

  useEffect(
		() => {
			console.log('search useEffect fired');
			async function fetchData() {
				try {
					console.log(`in fetch searchTerm: ${searchTerm}`);
					const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?countryCode=US&apikey=${apiKey}&keyword=${searchTerm}`);
					console.log(data)
					setSearchData(data._embedded.venues);
					setLoading(false);
				} catch (e) {
					console.log(e);
				}
			}
			if (searchTerm) {
				console.log ('searchTerm is set')
				fetchData();
			}
		},
		[ searchTerm ]
	);


  const searchValue = async (value) => {
    setSearchTerm(value);
  };
  const buildCard = (show) => {
    return (
      <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={show.id}>
        <Card
          variant='outlined'
          sx={{
            maxWidth: 250,
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 5,
            border: '1px solid #62aae4',
            boxShadow:
              '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
          }}
        >
          <CardActionArea>
            <Link to={`/venues/${show.id}`}>
              <CardMedia
                sx={{
                  height: '100%',
                  width: '100%'
                }}
                component='img'
                image={show.images && show.images && show.images[0] ? show.images[0].url : noImage}
                title='show image'
              />

              <CardContent>
                <Typography
                  sx={{
                    borderBottom: '1px solid #62aae4',
                    fontWeight: 'bold'
                  }}
                  gutterBottom
                  variant='h6'
                  component='h3'
                >
                  {show.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                {show && show.city && show.city.name ? <dd>{show.city.name}</dd>: <dd>N/A</dd>}
									<span>...More Info</span>
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };
  if(error){
    navigate("/notFound");
  }
  if (searchTerm) {
    card =
      searchData &&
      searchData.map((shows) => {
        // let {show} = shows;
        return buildCard(shows);
      });
  } else {
    card =
      showsData &&
      showsData.map((show) => {
        return buildCard(show);
      });
  }

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div>
        <SearchShows searchValue={searchValue} />
        <br />
				<br />
				<div>
					{pagenum!=0?<Link to={`/venues/page/${parseInt(pagenum) - 1}`}> Previous page       </Link>:<></>}
					{nextPage?<Link to={`/venues/page/${parseInt(pagenum )+ 1}`}>     Next page </Link>:<></>}
				</div>
				<br></br>
				<br></br>
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            flexDirection: 'row'
          }}
        >
          {card}
        </Grid>
      </div>
    );
  }
};

export default VenueList;
