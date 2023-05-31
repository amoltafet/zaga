import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import ButtonJoy from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import RefreshIcon from '@mui/icons-material/Refresh'
import IconButton from '@mui/joy/IconButton'
import Tooltip from '@mui/joy/Tooltip'
import Alert from '@mui/joy/Alert'
import MenuBar from '../components/MenuBar'
import GeneratePrompts from '../util/GeneratePrompts.js'
import Chip from '@mui/joy/Chip'
import Sun from '@mui/icons-material/LightMode'
import HttpIcon from '@mui/icons-material/Http'
import SurfingOutlinedIcon from '@mui/icons-material/SurfingOutlined'
import CircularProgress from '@mui/joy/CircularProgress'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import LinearProgress from '@mui/joy/LinearProgress'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import Generate from './Generate'
import pageInfo from '../context'
import MicNoneIcon from '@mui/icons-material/MicNone'
import CampaignIcon from '@mui/icons-material/Campaign'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { getApp } from 'firebase/app'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material'
import { getDatabase, ref, set, onValue, push, get } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Snackbar } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

export default function Anything () {
  const [data, setData] = useState([])
  const [waiting, setWaiting] = useState(false)
  const [pageTitle, setPageTitle] = useState('')
  const app = getApp()
  const db = getDatabase(app)

  //project vars
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState('')
  const [newProjectName, setNewProjectName] = useState('')
  const [creatingProject, setCreatingProject] = useState(false)
  const [projectsLoaded, setProjectsLoaded] = useState(false)
  const [userID, setUserID] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openCreateSnackbar, setOpenCreateSnackbar] = useState(false)
  const [selectedProjectName, setSelectedProjectName] = useState('')
  const [selectedWebsites, setSelectedWebsites] = useState([]) // Added state for selected websites
  const [openNoChatSnackbar, setOpenNoChatSnackbar] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded)
  }

  const [show, setShow] = useState(false)
  // create a box object that has an array of objects and title
  const [boxOne, setBoxOne] = useState({
    title: '',
    array: [],
    loading: false
  })

  const [boxTwo, setBoxTwo] = useState({
    title: '',
    array: [],
    loading: false
  })

  const url = window.location.href

  useEffect(() => {
    // get the last part of the url
    const lastPart = url.substring(url.lastIndexOf('/') + 1)
    setPageTitle(lastPart)
    // if last part is not 'anything' then show the generate component
    if (lastPart !== 'anything') {
      setShow(true)
      // set the boxOne and boxTwo titles
      setBoxOne({
        ...boxOne,
        title: pageInfo.find(page => page.title === lastPart).boxOneTitle
      })
      setBoxTwo({
        ...boxTwo,
        title: pageInfo.find(page => page.title === lastPart).boxTwoTitle
      })
    } else {
      setShow(false)
    }
  }, [url])

  useEffect(() => {
    console.log(projects)
  }, [projects])

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userID = user.uid
        setUserID(userID)
        console.log('User is logged in with ID:', userID)
        const projectsRef = ref(db, 'users/' + userID + '/projects')
        console.log('About to fetch projects for user:', userID)
        onValue(
          projectsRef,
          snapshot => {
            console.log('Fetched projects for user:', userID)
            const data = snapshot.val()
            setProjects(
              data
                ? Object.entries(data).map(([key, value]) => ({
                    key,
                    name: value[0]?.name,
                    webpageData: value.slice(1)
                  }))
                : []
            )
            setIsLoading(false)
            setProjectsLoaded(true)
            setSelectedWebsites([]) // Reset selected websites whenever projects change
          },
          error => {
            console.log('Error fetching projects:', error)
            setIsLoading(false)
          }
        )
      } else {
        console.log('User not logged in')
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSaveToProjects = async () => {
    console.log('Saving to project');
    if (db && selectedProject && userID) {
      console.log('Database, project, and user ID exist');
  
      // Check if there's a conversation
      if (data.length === 0) {
        console.log('No conversation to save');
        setOpenNoChatSnackbar(true);
        return;
      }
  
      try {
        // Get the last chat entry
        const lastChatEntry = data[data.length - 1];
  
        const projectRef = ref(db, 'users/' + userID + '/projects/' + selectedProject);
  
        // Fetch current data from the database.
        const snapshot = await get(projectRef);
        let currentData = snapshot.val();
  
        // Prepare new webpage data.
        const newWebpageData = {
          webpageData: lastChatEntry.chatgpt_response,
          webpageUrl: lastChatEntry.chatgpt_response
            .split(' ')
            .slice(0, 10)
            .join(' ')
        };
  
        // If there's no current data, initialize an object.
        if (!currentData) {
          currentData = [{
            name: 'Test' // This is a placeholder. Replace it with the actual project name.
          }];
        }
  
        // Add new webpage data
        currentData.push(newWebpageData);
  
        // Update the data in the database.
        await set(projectRef, currentData);
  
        // handleSnackbarOpen('Saved to project successfully');
      } catch (error) {
        console.log('Error saving to project:', error);
        // handleSnackbarOpen('Error saving to project');
      }
    }
  };
  

  const handleCreateProject = () => {
    if (newProjectName.trim().length > 0) {
      const auth = getAuth(app)
      const user = auth.currentUser
      if (user) {
        const userID = user.uid
        const projectsRef = ref(db, 'users/' + userID + '/projects')
        const newProjectRef = push(projectsRef)
        set(newProjectRef, [{ name: newProjectName }])
        setNewProjectName('')
        setOpenCreateSnackbar(true)
        setCreatingProject(false)
      } else {
        console.error('User not logged in')
      }
    } else {
      console.error('Project name cannot be empty')
    }
  }

  const handleNewProjectClick = () => {
    setCreatingProject(true)
  }

  const handleExitCreateProject = () => {
    setCreatingProject(false)
  }

  const handleProjectChange = event => {
    setSelectedProject(event.target.value)

    const selectedProjectData = projects.find(
      project => project.key === event.target.value
    )

    if (selectedProjectData) {
      const websiteData = selectedProjectData.webpageData
      setSelectedWebsites(websiteData.map(item => item.webpageUrl))
    } else {
      setSelectedWebsites([])
    }
  }

  const clearData = () => {
    setData([])
    setWaiting(false)
    document.getElementById('input').value = ''
    setBoxOne({ ...boxOne, array: [] })
    setBoxTwo({ ...boxTwo, array: [] })
  }

  const displayPage = () => {
    if (pageTitle === 'generate') {
      return <Generate boxOne={boxOne} boxTwo={boxTwo} />
    } else if (pageTitle === 'writer') {
      return <Generate boxOne={boxOne} boxTwo={boxTwo} />
    } else if (pageTitle === 'brainstorm') {
      return <Generate boxOne={boxOne} boxTwo={boxTwo} />
    } else if (pageTitle === 'search') {
      return <Generate boxOne={boxOne} boxTwo={boxTwo} />
    } else {
      return <></>
    }
  }

  // on enter key press
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      addData()
    }
  }

  const ButtonStyle = () => {
    if (waiting) {
      return (
        <Button
          disabled
          sx={{
            marginBottom: '1%',
            marginLeft: '20%',
            marginRight: '20%'
          }}
        >
          <CircularProgress size='sm' />
        </Button>
      )
    } else {
      return (
        <Button
          color='primary'
          onClick={addData}
          sx={{
            marginBottom: '1%',
            marginLeft: '20%',
            marginRight: '20%'
          }}
        >
          Send
        </Button>
      )
    }
  }

  const addData = async () => {
    // get value by id
    let value = document.getElementById('input').value
    document.getElementById('input').value = ''
    if (value === '') {
      return
    }
    setBoxOne({ ...boxOne, loading: true })
    setBoxTwo({ ...boxTwo, loading: true })

    setData([...data, { user_input: value, chatgpt_response: '' }])
    setWaiting(true)
    setTimeout(() => {
      var objDiv = document.getElementById('outputBox')
      objDiv.scrollTo(0, objDiv.scrollHeight, { behavior: 'smooth' })
    }, 0)
    let prompts = await GeneratePrompts(value, 'anything')
    // remove white space from the beginning of the string
    prompts = prompts.replace(/^\s+/g, '')
    // update data
    setData([...data, { user_input: value, chatgpt_response: prompts }])
    setWaiting(false)

    // get updates for boxOne and boxTwo
    let boxOnePrompt = await GeneratePrompts('BoxOne', pageTitle)
    boxOnePrompt = boxOnePrompt.replace(/^\s+/g, '')
    setBoxOne({
      ...boxOne,
      array: [...boxOne.array, boxOnePrompt],
      loading: false
    })
    let boxTwoPrompt = await GeneratePrompts('BoxTwo', pageTitle)
    boxTwoPrompt = boxTwoPrompt.replace(/^\s+/g, '')
    setBoxTwo({
      ...boxTwo,
      array: [...boxTwo.array, boxTwoPrompt],
      loading: false
    })

    // scroll to bottom
    setTimeout(() => {
      var objDiv = document.getElementById('outputBox')
      objDiv.scrollTo(0, objDiv.scrollHeight, { behavior: 'smooth' })
    }, 0)
  }

  const mapData = () => {
    if (data.length === 0) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Typography
            variant='outlined'
            sx={{
              marginBottom: '20%',
              marginTop: '20%'
            }}
          >
            No conversations yet. Start one by typing in the box below.
          </Typography>
        </div>
      )
    } else {
      return data.map((item, index) => {
        return (
          <>
            <Alert
              variant='outlined'
              key={index}
              sx={{
                marginBottom: '1%',
                marginTop: '1%',
                marginLeft: '20%'
              }}
            >
              {item.user_input}
            </Alert>
            {item.chatgpt_response === '' ? (
              <></>
            ) : (
              <>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Chip
                    color='primary'
                    variant='outlined'
                    startDecorator={<CampaignIcon fontSize='small' />}
                    onClick={() => alert('You clicked the  button!')}
                    sx={{
                      marginBottom: '0.5%'
                    }}
                  />
                  <div
                    style={{
                      marginRight: '20%'
                    }}
                  >
                    <Tooltip title='Previous'>
                      <ButtonJoy
                        color='primary'
                        variant='soft'
                        onClick={() => alert('You clicked the  button!')}
                        sx={{ borderRadius: 0 }}
                        size='small'
                      >
                        <KeyboardArrowLeftIcon />
                      </ButtonJoy>
                    </Tooltip>
                    <Tooltip title='Next'>
                      <ButtonJoy
                        color='primary'
                        variant='soft'
                        onClick={() => alert('You clicked the  button!')}
                        sx={{ borderRadius: 0 }}
                        size='small'
                      >
                        <KeyboardArrowRightIcon />
                      </ButtonJoy>
                    </Tooltip>
                  </div>
                </div>
                <Alert
                  // make the key unique
                  key={index + 999999}
                  sx={{
                    marginBottom: '1%',
                    marginRight: '20%',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {item.chatgpt_response}
                </Alert>

                <div>
                  <Typography variant='overline' sx={{ marginLeft: '1%' }}>
                    Did you like this response?
                  </Typography>
                  <Chip
                    color='success'
                    variant='outlined'
                    startDecorator={<ThumbUpAltOutlinedIcon fontSize='small' />}
                    onClick={() => alert('You clicked the  button!')}
                    sx={{
                      marginLeft: '1%',
                      marginRight: '1%'
                    }}
                  />
                  <Chip
                    color='danger'
                    variant='outlined'
                    startDecorator={
                      <ThumbDownAltOutlinedIcon fontSize='small' />
                    }
                    onClick={() => alert('You clicked the  button!')}
                  />
                </div>
              </>
            )}
          </>
        )
      })
    }
  }

  let BoxHeight = window.innerHeight * 0.7

  const handleChipClick = text => {
    console.log(text)
    // set value by id
    document.getElementById('input').value = text
    addData()
    text = ''
  }

  return (
    <div>
      <MenuBar />
      <div
        style={{
          marginLeft: '4%',
          marginRight: '2%'
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={show ? 8 : 12} sx={{ padding: '8px', marginTop: '1%' }}>
            <Tooltip title='Restart'>
              <IconButton onClick={clearData} variant='outlined'>
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            <Box
              sx={{
                paddingTop: '2%',
                maxHeight: BoxHeight,
                height: BoxHeight,
                overflow: 'scroll',
                overflowX: 'hidden',
                // hide scrollbar
                '&::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
              id='outputBox'
            >
              {mapData()}
            </Box>
            {data.length === 0 ? (
              <div
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '1%',
                    overflowY: 'hidden',
                    overflowX: 'scroll'
                  }}
                >
                  <Chip
                    variant='outlined'
                    startDecorator={<HttpIcon />}
                    onClick={() => {
                      handleChipClick('How to create a HTTP request in React?')
                    }}
                    sx={{ marginBottom: '1%' }}
                  >
                    How to create a HTTP request in React?
                  </Chip>
                  <Chip
                    variant='outlined'
                    startDecorator={<Sun />}
                    onClick={() => {
                      handleChipClick('Why is the sky light blue?')
                    }}
                    sx={{ marginBottom: '1%' }}
                  >
                    Why is the sky light blue?
                  </Chip>
                  <Chip
                    variant='outlined'
                    startDecorator={<SurfingOutlinedIcon />}
                    onClick={() => {
                      handleChipClick(
                        'Does the sun move around because of the earth?'
                      )
                    }}
                    sx={{ marginBottom: '1%' }}
                  >
                    Can I go surfing in the winter in California?
                  </Chip>
                </div>
              </div>
            ) : (
              <></>
            )}
            <Input
              startDecorator={
                <IconButton variant='outlined'>
                  <MicNoneIcon />
                </IconButton>
              }
              endDecorator={ButtonStyle()}
              id='input'
              placeholder='Type something...'
              onKeyPress={handleKeyPress}
            />
          </Grid>
          {show ? (
            <Grid
              item
              xs={4}
              sx={{
                padding: '8px',
                display: 'flex',
                flexDirection: 'column' 
              }}
            >
              <Box
                sx={{
                  border: '0.5px solid black',
                  borderRadius: '5px',
                  padding: '10px',
                  height: isExpanded ? 'auto' : '40%', 
                  flexGrow: isExpanded ? 1 : 0 
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant='overline' sx={{ textAlign: 'center' }}>
                    {selectedProject
                      ? projects.find(
                          project => project.key === selectedProject
                        )?.name
                      : 'Project Library'}
                  </Typography>
                  <Tooltip title='{hello}'>
                    <ErrorOutlineOutlinedIcon fontSize='small' />
                  </Tooltip>
                </div>
                <Divider sx={{ marginTop: '1%' }} />
                <Box
                  sx={{
                    maxHeight: '90%', 
                    overflow: 'auto',
                    width: '100%' 
                  }}
                >
                  {selectedProject ? (
                  <FormControl component='fieldset'>
                    <FormGroup>
                      {projects
                        .find(project => project.key === selectedProject)
                        ?.webpageData.map(website => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedWebsites.includes(
                                  website.webpageUrl
                                )}
                                onChange={event => {
                                  if (event.target.checked) {
                                    setSelectedWebsites([
                                      ...selectedWebsites,
                                      website.webpageUrl
                                    ])
                                  } else {
                                    setSelectedWebsites(
                                      selectedWebsites.filter(
                                        url => url !== website.webpageUrl
                                      )
                                    )
                                  }
                                }}
                                name={website.webpageUrl}
                              />
                            }
                            label={website.webpageUrl}
                            key={website.webpageUrl}
                          />
                        ))}
                    </FormGroup>
                  </FormControl>
                ) : (
                  <Typography variant='overline' sx={{ textAlign: 'center' }}>
                    Select a project below to add files to chat
                  </Typography>
                )}
                </Box>
              </Box>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={isExpanded}
                aria-label='show more'
              >
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
              {!isExpanded && displayPage()}
              <Box
                sx={{
                  marginTop: '5%',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                {!userID ? (
                  <Typography variant='overline' sx={{ textAlign: 'center' }}>
                    Login to view and save projects
                  </Typography>
                ) : isLoading || !projectsLoaded ? (
                  <Typography variant='overline' sx={{ textAlign: 'center' }}>
                    Loading Projects...
                  </Typography>
                ) : (
                  !creatingProject && (
                    <FormControl fullWidth sx={{ marginRight: '5%' }}>
                      <InputLabel id='project-select-label'>
                        Select Project
                      </InputLabel>
                      <Select
                        labelId='project-select-label'
                        label='Select Project'
                        id='project-select'
                        value={selectedProject}
                        onChange={handleProjectChange}
                      >
                        <MenuItem
                          value=''
                          onClick={handleNewProjectClick}
                          sx={{
                            color: '#137ebf'
                          }}
                        >
                          <AddIcon />
                          Create New Project
                        </MenuItem>
                        {projects.map(project => (
                          <MenuItem key={project.key} value={project.key}>
                            {project.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )
                )}

                {creatingProject && (
                  <React.Fragment>
                    <FormControl>
                      <Select value='' label='Project'>
                        <MenuItem value='' onClick={handleExitCreateProject}>
                          <ArrowBackIcon />
                          Back to Projects
                        </MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label='New Project Name'
                      value={newProjectName}
                      onChange={e => setNewProjectName(e.target.value)}
                      fullWidth
                    />

                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleCreateProject}
                    >
                      Save New Project
                    </Button>
                  </React.Fragment>
                )}

                {!isLoading &&
                  !creatingProject &&
                  userID &&
                  selectedProject !== '' && (
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={handleSaveToProjects}
                    >
                      Save to Project
                    </Button>
                  )}
              </Box>
            </Grid>
          ) : (
            <></>
          )}

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity='success'>
              Successfully saved data to project "{selectedProjectName}"
            </Alert>
          </Snackbar>

          <Snackbar
            open={openCreateSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenCreateSnackbar(false)}
          >
            <Alert onClose={() => setOpenCreateSnackbar(false)} severity='info'>
              Successfully created project {newProjectName}
            </Alert>
          </Snackbar>

          <Snackbar
            open={openNoChatSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenNoChatSnackbar(false)}
          >
            <Alert
              onClose={() => setOpenNoChatSnackbar(false)}
              severity='error'
            >
              You must have a chat generated in order to save it to a project
            </Alert>
          </Snackbar>
        </Grid>
      </div>
    </div>
  )
}
