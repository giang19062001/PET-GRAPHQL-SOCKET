"use client";
import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMutation } from "@apollo/client";
import { CHECK_LOGIN } from "@/app/graphql/user";
import { toast } from "react-toastify";
import Link from "next/link";
import { Paper } from "@mui/material";
import Image from "next/image";
import background from "../../../../public/images/background.jpg";
import { useEffect } from "react";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.get("email"),
      password: data.get("password"),
    });
    if (result.error == -2) {
      toast.error("Wrong password");
    } else if (result.error == -1) {
      toast.error("Email not exist");
    }
  };


    return (
      <>
        <Image alt="" src={background} className="background"/>
        <Container component="main" maxWidth="md" sx={{ zIndex: 1 }}>
          <Paper sx={{ padding: 10, mt: 10 }} elevation={4}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                Login
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                    Login
                  </button>
                </div>
              </Box>
              <small className="mb-3">Or Sign up using</small>

              <button
                onClick={() => signIn("google")}
                aria-label="Sign in with Google"
                className="flex items-center bg-white border border-button-border-light rounded-md p-0.5 pr-3 "
              >
                <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <title>Sign in with Google</title>
                    <desc>Google G Logo</desc>
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      className="fill-google-logo-blue"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      className="fill-google-logo-green"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      className="fill-google-logo-yellow"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      className="fill-google-logo-red"
                    ></path>
                  </svg>
                </div>
                <span className="text-sm text-google-text-gray tracking-wider">
                  Sign in with Google
                </span>
              </button>

              <small className="mt-3">
                Not a member ?
                <Link href="/pages/register" className="text-blue-500">
                  {" "}
                  Sign up
                </Link>
              </small>
            </Box>
          </Paper>
        </Container>
      </>
    );
}
