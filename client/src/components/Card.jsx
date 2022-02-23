import React from 'react';
import * as Yup from 'yup';
import {Formik} from "formik";
import {Button, Container, Box, Typography, Divider, Grid, TextField} from "@mui/material";
import InputMask from 'react-input-mask'
import axios from "axios";


const Card = () => {

  const handleDate = (e, handleChange) => {
     let [month, year] = e.target.value.split('/');
    if (month > 12) {
      month = 12;
    }
    if (year < new Date().getFullYear()){
      year = new Date().getFullYear()
    }
    e.target.value = `${month}/${year}`
    return handleChange(e)
  }
const handleSubmit = async (values) => {
  const res = await axios.post('http://127.0.0.1:5000/card', {
    ...values,
    cardNumber: values.cardNumber.replace(/[^0-9]/g, ''),
    cvv: values.cvv.replace(/[^0-9]/g, ''),
    amount: values.amount.replace(/[^0-9]/g, ''),
  })
  console.log(res.data)
}


  return (
    <Container sx={{my: 6}} maxWidth={'xs'}>
      <div>
        <Formik
          initialValues={{
            cardNumber: '',
            expires: '',
            cvv: '',
            amount: ''
          }}
          validationSchema={Yup.object().shape({
            cardNumber: Yup.string().min(19).max(19).required('Введите номер карты (16 цифр)'),
            expires: Yup.string().required('Укажите срок действия карты'),
            cvv: Yup.string().min(3).max(3).required('Введите CVV'),
            amount: Yup.number().min(0.01).max(999999999.00).required('Введите сумму')
          })
          }
          onSubmit={(values, {setSubmitting}) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
            <form onSubmit={handleSubmit} id="insert_client">
              <Box mb={3}>
                <Typography color="textPrimary" variant="h3">
                  Транзакция
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body1"
                >
                  Все поля обязательны к заполнению
                </Typography>
              </Box>
              <Divider/>
              {/*<Grid container sx={{border:'1px solid',borderRadius: '5px', '> div::first-child':{px:2,py:0}}}>*/}
              <Grid container spacing={1}>
                <Grid item md={12} xs={12} xl={12}>
                  <InputMask
                    mask="9999 9999 9999 9999"
                    error={Boolean(touched.cardNumber && errors.cardNumber)}
                    helperText={touched.cardNumber && errors.cardNumber}
                    fullWidth
                    label={'Номер карты'}
                    margin="normal"
                    name={'cardNumber'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cardNumber}
                    required
                    variant="outlined"
                    autoComplete="off"
                  >
                    {(inputProps) => <TextField {...inputProps} />}
                  </InputMask>
                </Grid>
                <Grid item md={6} xs={6} xl={6}>
                  <InputMask
                    mask="99/2099"
                    error={Boolean(touched.expires && errors.expires)}
                    helperText={touched.expires && errors.expires}
                    onBlur={handleBlur}
                    onChange={(e) => handleDate(e, handleChange)}
                    fullWidth
                    label="Действует до"
                    name="expires"
                    margin="normal"
                    required
                    value={values.expires}
                    variant="outlined"
                  >
                    {(inputProps) => <TextField {...inputProps} />}
                  </InputMask>
                </Grid>
                <Grid item md={6} xs={6} xl={6}>
                  <InputMask
                    mask="999"
                    required
                    error={Boolean(touched.cvv && errors.cvv)}
                    helperText={touched.cvv && errors.cvv}
                    fullWidth
                    label={'CVV'}
                    margin="normal"
                    name={'cvv'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cvv}
                    variant="outlined"
                    autoComplete="off"
                  >
                    {(inputProps) => <TextField {...inputProps} />}
                  </InputMask>
                </Grid>
                <Grid item md={12} xs={12} xl={12}>
                  <TextField
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                    required
                    fullWidth
                    label={'Стоимость'}
                    margin="normal"
                    name={'amount'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount}
                    variant="outlined"
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
              <Divider/>
              <Grid sx={{mt: 1, display: 'flex', justifyContent: 'flex-end'}}>
                <Button type={"submit"} variant="contained">Отправить</Button>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Card;