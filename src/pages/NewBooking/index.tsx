import { Box } from '@mui/system';
import { ConfirmNewBooking, Layout } from '../../components';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { FC, useState } from 'react';
import moment from "moment";
import { useMutation } from 'react-query';
import { createNewBooking } from '../../api';


const defaultValues = {
    check_in_date: moment(),
    check_out_date: moment(),
    first_name: "",
    last_name: "",
    number_of_guests: "1",
    price_per_night: "0"
}

export const NewBooking: FC = () => { 

    const [inputs, setInputs] = useState(defaultValues);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mutation = useMutation(createNewBooking);

    const handleSubmit = () => {
        setIsModalOpen(false);
        mutation.mutate([{...inputs, price_per_night: parseInt(inputs.price_per_night), number_of_guests: parseInt(inputs.number_of_guests)}]);
    }

    return (
        <Layout>
            {/* New booking form */}
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <h2>▼ C R E A T E • N E W • B O O K I N G ▼</h2>
                </Grid>
                <Grid item>
                    <Box
                    component="form"
                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                    noValidate
                    autoComplete="off"
                    >
                        <div>
                            <FormControl required>
                                <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="First name"
                                onChange={(e)=> setInputs({...inputs, first_name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl required>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    defaultValue="Last name"
                                    onChange={(e)=> setInputs({...inputs, last_name: e.target.value })}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl required>
                            <DatePicker
                                label="Check-in date *"
                                value={inputs.check_in_date}
                                onChange={(newValue)=> setInputs({...inputs, check_in_date: moment(newValue)})}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                            <FormControl required>
                                <DatePicker
                                label="Check-out date *"
                                value={inputs.check_out_date}
                                onChange={(newValue)=> setInputs({...inputs, check_out_date: moment(newValue) })}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 200 }} required>
                                <InputLabel id="numberOfGuests">Number of guests</InputLabel>
                                <Select
                                labelId="numberOfGuests"
                                id="number-of-guests"
                                value={inputs.number_of_guests}
                                label="Number of guests"
                                onChange={(e)=> setInputs({...inputs, number_of_guests: e.target.value })}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl required>
                                <TextField
                                id="outlined-number"
                                label="Price per night"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=> setInputs({...inputs, price_per_night: e.target.value })}
                                />
                            </FormControl>
                        </div>

                        <Button sx={{ ml: "5em", my: "1em" }} variant="contained" color="success" onClick={()=> setIsModalOpen(true)}>Submit</Button>
                        <ConfirmNewBooking  handleAction={handleSubmit} isOpen={isModalOpen} closeModal={setIsModalOpen} formData={inputs}/>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    )
}

