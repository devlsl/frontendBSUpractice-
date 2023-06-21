import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { AuthData, AuthForm, Role } from 'data/types'
import { AuthProviderValue } from 'hoc/AuthProvider'
import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'

const initialAuthFormValue: AuthForm = {
  disabled: false,
  disabledSubmitBtn: true,
  values: {
    login: '',
    password: '',
    role: 'кладовщик'
  }
}

export const AuthPage = () => {
  const [authForm, setAuthForm] = useState<AuthForm>(initialAuthFormValue)

  useEffect(() => {
    if (!!authForm.values.login.length && !!authForm.values.password.length) {
      setAuthForm((prev) => ({ ...prev, disabledSubmitBtn: false }))
    } else {
      setAuthForm((prev) => ({ ...prev, disabledSubmitBtn: true }))
    }
  }, [authForm.values.login, authForm.values.password])

  const { signIn } = useAuth() as AuthProviderValue

  const [errorMessage, setErrorMessage] = useState('')

  const authFormSubmitHandle = async () => {
    try {
      await signIn(authForm.values)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const setNewValue = (key: keyof AuthData, value: Role | string) => {
    setAuthForm((prev) => ({
      ...prev,
      values: { ...prev.values, [key]: value }
    }))
  }

  return (
    <>
      <FormControl disabled={authForm.disabled}>
        <FormLabel>
          <Typography variant="h5">Авторизация</Typography>
        </FormLabel>
        <Stack direction="column" spacing={2} py={2} width="200px">
          <TextField
            disabled={authForm.disabled}
            error={!authForm.values.login.length}
            label="Логин"
            required
            variant="outlined"
            size="small"
            onChange={(event) => setNewValue('login', event.target.value)}
          />
          <TextField
            type="password"
            disabled={authForm.disabled}
            error={!authForm.values.password.length}
            label="Пароль"
            required
            variant="outlined"
            size="small"
            onChange={(event) => {
              setNewValue('password', event.target.value)
            }}
          />

          <RadioGroup
            defaultValue={'кладовщик' as Role}
            value={authForm.values.role}
            onChange={(_event, value) => {
              setNewValue('role', value)
            }}
          >
            <FormControlLabel
              value={'кладовщик' as Role}
              control={<Radio />}
              label="Кладовщик"
            />
            <FormControlLabel
              value={'сотрудник' as Role}
              control={<Radio />}
              label="Сотрудник"
            />
          </RadioGroup>
          <Button
            disabled={authForm.disabledSubmitBtn}
            variant="contained"
            onClick={authFormSubmitHandle}
          >
            Войти
          </Button>
          {!!errorMessage.length && (
            <Alert severity="error">{errorMessage}</Alert>
          )}
          {/* {!!successMessage.length && (
            <Alert severity="success">{successMessage}</Alert>
          )} */}
        </Stack>
      </FormControl>
    </>
  )
}
