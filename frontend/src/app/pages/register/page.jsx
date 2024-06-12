'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMutation } from '@apollo/client';
import { ADD_USERS } from '@/app/graphql/user';
import { toast } from 'react-toastify';
import Link from "next/link";
import { Paper } from '@mui/material';
import Image from "next/image";
import background from "../../../../public/images/background.jpg";


export default function Register() {

    const [addUser, { loading, error, data }] = useMutation(ADD_USERS, {
        onCompleted: (data) => {
            if(data.addUser.data.result == 1){
                toast.success('Registered successfully')
            }else{
                toast.error('Email duplicated')
            }
        },
        onError: (error) => {
            console.error('Error adding user:', error);
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        addUser({
            variables: {
                name: data.get('name'),
                email: data.get('email'),
                password: data.get('password'),
                providerUser: "credentials",
                image: ""
            }
        });
    };

    return (
        <>
                <Image alt='' src={background} className="background"/>

         <Container component="main" maxWidth="md">
            <Paper elevation={4} sx={{ padding:10, mt:10 }}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{fontWeight:"bold"}}>
                        Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                        </Grid>
                        <div className="flex justify-center my-3">
                            <button
                                type="submit"
                                className=" px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg w-48"
                            >
                                Register
                            </button>
                        </div>             
                    </Box>
                    <small className="mt-1 text-center">
                            Have a account ?
                            <Link href="/pages/login" className="text-blue-500" >
                                {" "}
                                Sign in
                            </Link>
                        </small>
                </Box>
            </Paper>

        </Container>
        </>

       
    );
}