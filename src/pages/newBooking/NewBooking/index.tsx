import { Box } from '@mui/system';
import { Layout } from '../../../components/layout';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { FC, useState } from 'react';
import moment from "moment";
import { Modal } from '../index';
import { useMutation } from 'react-query';
import { createNewBooking } from '../../../api';



const defaultValues = {
    check_in_date: moment(),
    check_out_date: moment(),
    first_name: "",
    last_name: "",
    number_of_guests: "1",
    price_per_night: "0"
}

const NewBooking: FC = () => { 

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
            <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
            // onSubmit={handleSubmit}
            >
                <div>
                    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="First name"
                    onChange={(e)=> setInputs({...inputs, first_name: e.target.value })}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Last name"
                        onChange={(e)=> setInputs({...inputs, last_name: e.target.value })}
                        />
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
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                        <TextField
                        id="outlined-number"
                        label="Price per night"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e)=> setInputs({...inputs, price_per_night: e.target.value })}
                        />
                </div>

                <Button variant="contained" color="success" onClick={()=> setIsModalOpen(true)}>Submit</Button>
                <Modal  handleAction={handleSubmit} isOpen={isModalOpen} closeModal={setIsModalOpen} formData={inputs}/>
            </Box>
        </Layout>
    )
}

export { NewBooking };

