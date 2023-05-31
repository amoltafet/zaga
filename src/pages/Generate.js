import { Box, Divider, Tooltip, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import React, { useEffect } from 'react'
import pageInfo from '../context'
import { useState } from 'react'
import LinearProgress from '@mui/joy/LinearProgress'
import { Chip } from '@mui/joy'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useMeasure } from 'react-use'

export default function Generate ({ boxOne, boxTwo }) {
  let BoxHeight = window.innerHeight / 3

  let [page, setPage] = useState([])
  const [chipDataBoxOne, setChipDataBoxOne] = useState([])
  const [containerRef, { height }] = useMeasure()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  let url = window.location.href
  const lastPart = url.substring(url.lastIndexOf('/') + 1)
  let pageIn = pageInfo.find(pageTemp => pageTemp.title === lastPart)

  useEffect(() => {
    setPage(pageIn)
  }, [])

  useEffect(() => {
    // - Atmospheric particles in the air \n- Presence of oxygen molecules in the atmosphere \n
    // every new line is a new item in the array
    if (chipDataBoxOne.length > 0) {
      setChipDataBoxOne([])
    }
    boxOne.array.forEach(item => {
      let temp = item.split('\n')
      temp.forEach(item => {
        // remove - from the start of the string
        item = item.replace(/-/g, '')
        setChipDataBoxOne(chipDataBoxOne => [...chipDataBoxOne, item])
      })
    })

    console.log(chipDataBoxOne)
  }, [boxOne, boxTwo])

  return (
    <Grid
      xs={4}
      sx={{ marginTop: '3%' }}
      ref={containerRef} // Set the ref here so we can measure this component
    >
      <Box
        sx={{
          border: '0.5px solid black',
          borderRadius: '5px',
          padding: '10px',
          maxHeight: BoxHeight,
          minHeight: BoxHeight
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label={page.boxOneTitle} />
            <Tab label={page.boxTwoTitle} />
          </Tabs>
          <Tooltip
            title={
              value === 0 ? page.boxOneDescription : page.boxTwoDescription
            }
          >
            <ErrorOutlineOutlinedIcon fontSize='small' />
          </Tooltip>
        </Box>
        {value === 0 && (
          <>
            <Divider sx={{ marginTop: '1%' }} />
            {boxOne.loading && <LinearProgress thickness={1} />}
            <div
              style={{
                maxHeight: height ? height - 70 : '80vh', 
                overflow: 'auto',
                overflowX: 'hidden'
              }}
            >
              {chipDataBoxOne.map(data => (
                <Chip
                  variant='outlined'
                  sx={{
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginLeft: '2%',
                    borderColor: 'gray',
                    color: 'gray'
                  }}
                >
                  {data}
                </Chip>
              ))}
            </div>
          </>
        )}

        {value === 1 && (
          <>
            <Divider sx={{ marginTop: '1%' }} />
            {boxTwo.loading && <LinearProgress thickness={1} />}
            <div
              style={{
                maxHeight: height ? height - 70 : '80vh',
                overflow: 'auto',
                overflowX: 'hidden'
              }}
            >
              {boxTwo.array.map((item, index) => (
                <React.Fragment key={index}>
                  <Typography
                    variant='body2'
                    sx={{
                      marginTop: '1%',
                      marginBottom: '1%',
                      marginLeft: '2%',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {item}
                  </Typography>
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </Box>
    </Grid>
  )
}
