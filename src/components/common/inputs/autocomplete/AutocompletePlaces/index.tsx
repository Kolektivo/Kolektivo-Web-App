'use client'

import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import { debounce } from '@mui/material/utils'
import { Grid2, Icon, InputAdornment } from '@mui/material'
import { type FocusEventHandler } from 'react'
import { GOOGLE_MAPS_API_KEY } from '@/config/constants'
import { type SyntheticEvent } from 'react'

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

interface StructuredFormatting {
  main_text: string
  secondary_text: string
}
interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
}

type AutocompletePlacesProps = {
  placeholder?: string
  label?: string
  error?: boolean
  helperText?: string
  value?: string
  name?: string
  onChange?: (value: string) => void
  onBlur?: FocusEventHandler
}

const AutocompletePlaces = ({
  placeholder,
  label,
  error = false,
  helperText,
  value = '',
  name,
  onChange,
  onBlur,
}: AutocompletePlacesProps) => {
  const [valueAutocomplete, setValue] = React.useState<PlaceType | null>(
    value !== ''
      ? {
          description: value,
          structured_formatting: { main_text: value, secondary_text: '' },
        }
      : null,
  )
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly PlaceType[]>([])
  const loaded = React.useRef(false)

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      )
    }

    loaded.current = true
  }

  const fetch = React.useMemo(
    () =>
      debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        ;(autocompleteService.current as any).getPlacePredictions(request, callback) // eslint-disable-line
      }, 400),
    [],
  )

  React.useEffect(() => {
    let active = true

    /* eslint-disable */
    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService()
    }
    /* eslint-enable */
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(valueAutocomplete ? [valueAutocomplete] : [])
      return undefined
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []

        if (valueAutocomplete) {
          newOptions = [valueAutocomplete]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [valueAutocomplete, inputValue, fetch])

  return (
    <Autocomplete
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      forcePopupIcon={false}
      value={valueAutocomplete}
      noOptionsText="No locations"
      onChange={(_: SyntheticEvent, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
        if (onChange) {
          onChange(newValue?.description ?? '')
        }
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => {
        params.InputProps.startAdornment = (
          <InputAdornment position="end">
            <Icon>search</Icon>
          </InputAdornment>
        )

        return (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            onBlur={onBlur}
            name={name}
            fullWidth
          />
        )
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props

        return (
          <li key={key} {...optionProps}>
            <Grid2 container sx={{ alignItems: 'center' }}>
              <Grid2 sx={{ display: 'flex', width: 44 }}>
                <Icon sx={{ color: 'primary.main' }}>location_on</Icon>
              </Grid2>
              <Grid2 sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                <Typography variant="body1">{option.structured_formatting.main_text}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid2>
            </Grid2>
          </li>
        )
      }}
    />
  )
}

export default AutocompletePlaces
