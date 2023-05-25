import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import MediaCard from '../components/CardNav'
import ThumbUp from '@mui/icons-material/ThumbUp'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import MenuBar from '../components/MenuBar'
import Link from '@mui/joy/Link'
import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'
import { AspectRatio } from '@mui/joy'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import Divider from '@mui/joy/Divider'
import Footer from '../components/Footer'
import CreateIcon from '@mui/icons-material/Create'
import CodeIcon from '@mui/icons-material/Code'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
import SearchIcon from '@mui/icons-material/Search'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Link as RouterLink } from 'react-router-dom'
import { getDatabase, ref, onValue, off } from 'firebase/database';


const images = require.context('../images', true)
function Main ({ user }) {
  const [projectCount, setProjectCount] = useState(0);
  const pages = [
    {
      title: 'Essay Generator',
      logo: <CreateIcon color='primary' />, // Replace the file path with an MUI icon
      link: '/writer',
      describe: 'Generate any text based on a prompt',
      example: 'Write me a story about a dog'
    },
    {
      title: 'Generate Code',
      logo: <CodeIcon color='primary' />,
      link: '/generate',
      describe: 'Generate code based on a prompt',
      example: 'Generate http code for a website'
    },
    {
      title: 'Brainstorm Ideas',
      logo: <LightbulbIcon color='primary' />,
      link: '/brainstorm',
      describe: 'Generate ideas based on a prompt',
      example: 'Generate ideas for a new business'
    },
    {
      title: 'Do Anything',
      logo: <EmojiObjectsIcon color='primary' />,
      link: '/anything',
      describe: 'Generate anything based on a prompt',
      example: 'What is the meaning of life?'
    },
    {
      title: 'Search the Web',
      logo: <SearchIcon color='primary' />,
      link: '/search',
      describe: 'Search for anything based on a prompt',
      example: 'Where is the nearest coffee shop?'
    },
    {
      title: 'Help Center',
      logo: <HelpOutlineIcon color='primary' />,
      link: '/help',
      describe: 'Learn how to use this website',
      example: 'Where do I change my password?'
    }
  ]

  // const [user, setUser] = useState(null)

  // useEffect(() => {
  //   // Set up the Firebase authentication state observer
  //   const auth = getAuth()
  //   const unsubscribe = onAuthStateChanged(auth, currentUser => {
  //     setUser(currentUser)
  //   })

  //   // Clean up the observer when the component is unmounted
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [])
  //user is now passed in as a prop, so we don't need to use this useEffect anymore

  // grab the event listener for dark mode
  if (localStorage.getItem('darkMode')) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }

  useEffect(() => {
    // Make sure the user is not null
    if(user){
      const db = getDatabase();
    
      const projectsRef = ref(db, `users/${user.uid}/projects`);
    
      const listener = onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const numProjects = Object.keys(data).length;
          setProjectCount(numProjects);
        }
      });
    
      // Clean up the listener when the user changes or the component unmounts
      return () => {
        off(projectsRef, listener);
      };
    }
  }, [user]);
  
  

  return (
    <div>
      <MenuBar />

      <div
        style={{
          marginTop: '5%',
          marginLeft: '10%',
          marginRight: '10%'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {user && (
              <RouterLink to='/projects'>
              <Card
                orientation='horizontal'
                variant='outlined'
                sx={{
                  width: "100%",
                  gap: 2,
                  "&:hover": {
                    boxShadow: "md",
                    borderColor: "neutral.outlinedHoverBorder",
                  },
                  overflow: "hidden",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio='1' sx={{ width: 100 }}>
                    {user && (
                      <Link href='/projects'>
                        <img
                          src='https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90'
                          srcSet='https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x'
                          loading='lazy'
                          alt=''
                        />
                      </Link>
                    )}
                  </AspectRatio>
                </CardOverflow>
                <CardContent sx={{ px: 2 }}>
                  <Typography fontWeight='md' mb={0.5} fontSize={['md', 'xl']}>
                    {user ? (
                      <Link href='/projects'>My Projects</Link>
                    ) : (
                      'My Projects'
                    )}
                  </Typography>
                  <Typography level='body2'>{projectCount} Saved Projects</Typography>
                </CardContent>
              </Card>
              </RouterLink>
            )}
            {!user && (
              <Typography fontWeight='md' mb={0.5} fontSize={['md', 'xl']}>
                <Link
                  component={RouterLink}
                  to='/login'
                  underline='hover'
                  color='primary'
                >
                  Login
                </Link>
                {' to create and view your projects!'}
              </Typography>
            )}
          </Grid>
          {pages.map(page => (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <MediaCard user={user} props={page} />
            </Grid>
          ))}
        </Grid>

        <Button
          variant='outlined'
          sx={{ marginTop: '2rem', marginLeft: '5px' }}
        >
          <QuestionMarkIcon />
        </Button>
        <Button
          variant='outlined'
          color='primary'
          sx={{ marginTop: '2rem', marginLeft: '5px' }}
        >
          <ThumbUp />
        </Button>
      </div>
      <Footer />
    </div>
  )
}

export default Main
